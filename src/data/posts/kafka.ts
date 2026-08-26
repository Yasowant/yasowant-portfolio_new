/**
 * Article body in Markdown. Rendered by src/lib/markdown.ts both in the
 * browser and during the build-time prerender, so the full text ships in the
 * HTML that search engines and AI answer engines read.
 */
export const content = `
Most backend engineers meet Kafka the same way: a service needs to tell three other services that something happened, someone says "we should use Kafka", and the next thing you know there are topics, partitions, offsets, consumer groups and a broker cluster to reason about. The vocabulary arrives all at once and the mental model does not.

This article builds that model in the order it actually makes sense: the problem first, then what Kafka fundamentally *is*, then the pieces, then a real pipeline — and finally the cases where reaching for Kafka is the wrong call.

## The problem Kafka solves

Picture an e-commerce backend. An order is placed, and now several things must happen: charge the payment, reserve inventory, email a confirmation, update the analytics warehouse, notify the fulfilment partner.

The naive version has the order service call each one directly. It works until it does not. The order service now knows about five other services and fails when any of them is down. Adding a sixth consumer means changing and redeploying the order service. Nothing retries cleanly, because a partial failure halfway through leaves you unsure what already happened. And if the analytics team wants to reprocess last month to fix a bug, there is nothing to reprocess *from* — those calls are gone.

The fix is inversion: the order service stops calling anyone and simply records the fact that an order was placed. Whoever cares subscribes. That record is what Kafka stores.

## What Kafka actually is

Strip away the vocabulary and Kafka is one idea: **a distributed, durable, append-only log**.

Not a queue. Not a database. A log — a file you can only add to the end of, where every entry has a sequential position, and readers track their own position independently.

That single design decision explains almost everything else about Kafka:

- Writes are appends, which is the fastest thing a disk does, so throughput is enormous.
- Reading does not remove anything, so ten different consumers can read the same data without coordinating.
- Because messages persist after being read, a consumer can rewind and reprocess history — the thing a traditional queue cannot do.

## The core pieces

**Broker** — a Kafka server. A cluster is several brokers; data is spread across them.

**Topic** — a named log. **orders**, **payments**, **user-events**. Purely a logical grouping.

**Partition** — the real unit of storage and parallelism. A topic is split into partitions, each an independent ordered log living on a broker. A topic with six partitions can be consumed by six consumers in parallel.

**Offset** — a message's sequential position within its partition. Offset 0, 1, 2, and so on. Consumers commit the offset they have processed, and that commit is the only thing that determines where they resume.

**Producer** — writes messages to a topic.

**Consumer group** — a set of consumers that share the work of a topic. Kafka guarantees each partition is assigned to exactly one consumer in the group. Two groups reading the same topic each get every message, independently. This is how one **orders** topic feeds billing, email and analytics at once without them interfering.

## Ordering: the detail everyone gets wrong

Kafka guarantees ordering **within a partition**, never across a topic.

Which partition a message lands in is determined by its key. Same key, same partition, guaranteed order. No key, and the producer round-robins across partitions, so ordering is gone.

\`\`\`javascript
await producer.send({
  topic: "orders",
  messages: [
    { key: order.customerId, value: JSON.stringify(order) },
  ],
});
\`\`\`

Keying by customerId means every event for that customer is ordered relative to the others, while different customers spread across partitions and process in parallel. Choosing the key *is* the design decision — it is how you trade ordering guarantees against parallelism.

A practical warning: if one key is far more active than the rest, its partition becomes a hot spot and one consumer does most of the work. Keys should be high-cardinality and evenly distributed.

## Fault tolerance

Each partition is replicated across brokers. One replica is the leader and handles all reads and writes; the others are followers that copy from it. Replicas that are caught up form the in-sync replica set, and if the leader dies, one of them is promoted automatically.

What you control as a producer is how much durability you want to pay for:

\`\`\`javascript
const producer = kafka.producer({
  idempotent: true,        // no duplicates on internal retry
  maxInFlightRequests: 5,
});

await producer.send({
  topic: "orders",
  acks: -1,                // wait for all in-sync replicas
  messages: [{ key: order.customerId, value: JSON.stringify(order) }],
});
\`\`\`

**acks: 0** — fire and forget, fastest, can lose data. **acks: 1** — leader confirms; loses data if the leader dies before followers catch up. **acks: -1** — every in-sync replica confirms; slowest and safest. For anything financial, use -1.

## Retention is not deletion-on-read

A queue deletes a message once it is consumed. Kafka does not. It keeps messages for a configured retention period — seven days by default — regardless of who has read them.

This is what makes replay possible. Reset a consumer group's offsets to the start and it reprocesses everything. Ship a bug that computed the wrong totals for three days? Fix it, reset, replay. Onboard a new service that needs history? Point it at offset zero.

Retention can also be **compaction**, where Kafka keeps only the most recent message per key. That turns a topic into a durable changelog of current state — useful for things like a user-profile topic where you care about the latest value, not the history.

## Producing and consuming

\`\`\`javascript
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["broker-1:9092", "broker-2:9092"],
});

const consumer = kafka.consumer({ groupId: "email-service" });

await consumer.connect();
await consumer.subscribe({ topic: "orders", fromBeginning: false });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const order = JSON.parse(message.value.toString());

    try {
      await sendConfirmationEmail(order);
    } catch (err) {
      // Do not swallow this silently. Either retry with backoff,
      // or route to a dead-letter topic and move on.
      await producer.send({
        topic: "orders.dlq",
        messages: [{ key: message.key, value: message.value }],
      });
    }
  },
});
\`\`\`

Note the group id. Change it and you get a brand new consumer with its own offsets — which is exactly how you add a new downstream service, and also exactly how people accidentally reprocess a month of data in production.

## Delivery guarantees, honestly

Kafka gives you **at-least-once** delivery by default, and that is what you should design for. If your consumer commits its offset after processing and crashes in between, the message is delivered again on restart.

Exactly-once is achievable with transactions and idempotent producers, but only within Kafka. The moment your consumer writes to Postgres or calls Stripe, that guarantee stops at the boundary.

The practical answer is almost always to make consumers idempotent instead: give each event an id, record processed ids, and skip duplicates.

\`\`\`javascript
const seen = await db.processedEvents.findOne({ eventId: order.eventId });
if (seen) return;
await chargeCustomer(order);
await db.processedEvents.insertOne({ eventId: order.eventId });
\`\`\`

## A real pipeline

Back to the e-commerce example. The order service writes one message to **orders**, keyed by customer id, and is done — it does not know or care who reads it.

Three consumer groups subscribe. **payment-service** charges the card and emits to **payments**. **inventory-service** reserves stock and emits to **inventory-events**. **email-service** sends the confirmation. Later, an analytics connector streams **orders** into the warehouse, and the fulfilment partner's integration is added as a fourth group — neither requiring a single change to the order service.

That decoupling is the actual payoff. Not throughput. Throughput is the thing Kafka is famous for; independence is the thing that changes how you build.

## When not to use Kafka

Kafka is a serious operational commitment, and it is the wrong tool more often than its reputation suggests.

**You need per-message acknowledgement, priorities, or delayed delivery.** That is a task queue. Use RabbitMQ, SQS or BullMQ.

**You need request/response.** Kafka is one-directional. Use HTTP or gRPC.

**You have three services and modest volume.** A managed queue or even a database-backed outbox table will serve you for years with a fraction of the operational cost.

**You need to query the data.** Kafka is a log, not a database. You cannot ask it for "all orders over 500". Stream it into something that can answer that.

| | Kafka | RabbitMQ | SQS |
|---|---|---|---|
| Model | Durable log | Message broker | Managed queue |
| Replay | Yes | No | No |
| Ordering | Per partition | Per queue | FIFO queues only |
| Multiple independent readers | Native | Fan-out exchanges | One queue per consumer |
| Ops burden | High (or managed) | Medium | None |

## Things interviewers actually ask

*Does Kafka guarantee ordering?* Within a partition, yes. Across a topic, no.

*What happens when a consumer in a group dies?* A rebalance — its partitions are reassigned to the remaining consumers, which resume from the last committed offset.

*Why is Kafka fast?* Sequential disk writes, zero-copy transfer to the network, batching, and no per-message broker bookkeeping — consumers track their own offsets.

*How do you handle a poison message?* Bounded retries with backoff, then a dead-letter topic. Never an unbounded retry loop; it will halt the entire partition.

## Closing thought

Kafka is not complicated once you accept the premise: it is a log, and everything else is a consequence. Partitions exist so the log can scale. Consumer groups exist so the log can be read many ways at once. Offsets exist so readers own their own position. Retention exists so the past does not disappear.

Understand the log and the rest stops being vocabulary and starts being obvious.
`;
