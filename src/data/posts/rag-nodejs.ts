/**
 * Article body in Markdown. Rendered by src/lib/markdown.ts both in the
 * browser and during the build-time prerender.
 */
export const content = `
Every team that adds an LLM to their product hits the same wall within a week: the model is fluent, confident and wrong about *your* data. It has never seen your docs, your tickets or your database, so it fills the gaps with plausible fiction.

Retrieval-Augmented Generation (RAG) is the fix. Instead of hoping the model knows the answer, you **find the relevant facts first and hand them to the model with the question**. This article walks through a production-shaped RAG pipeline in Node.js and TypeScript — the same pattern behind the AI assistant on this portfolio.

## What RAG actually is

RAG is three steps:

1. **Retrieve** — search your own data for the passages most relevant to the question.
2. **Augment** — put those passages into the prompt as context.
3. **Generate** — ask the LLM to answer *only* from that context.

The model stops being a source of facts and becomes a reasoning and writing layer over facts you control. That gives you three things fine-tuning does not: answers stay current the moment your data changes, you can cite sources, and you can enforce permissions at retrieval time.

## The pipeline

There are two halves: an **offline ingestion** job and an **online query** path.

| Stage | Runs | What it does |
| --- | --- | --- |
| Ingest | offline | Load PDFs, Markdown, DB rows, tickets |
| Chunk | offline | Split into 300–800 token passages with overlap |
| Embed | offline | Turn each chunk into a vector |
| Store | offline | Save vector + text + metadata in a vector DB |
| Retrieve | per query | Embed the question, find nearest chunks |
| Generate | per query | Prompt the LLM with the chunks, stream the answer |

## Step 1: chunking

Chunk size is the single biggest quality lever. Too large and retrieval returns walls of loosely related text; too small and each chunk loses the context that makes it meaningful.

\`\`\`typescript
export function chunk(text: string, size = 800, overlap = 120): string[] {
  const words = text.split(/\\s+/);
  const out: string[] = [];
  for (let i = 0; i < words.length; i += size - overlap) {
    out.push(words.slice(i, i + size).join(" "));
  }
  return out;
}
\`\`\`

In production, split on structure first — headings, paragraphs, table rows — and only fall back to fixed windows inside long sections. Keep the document title and section heading attached to every chunk as metadata; it helps both retrieval and citations.

## Step 2: embeddings and storage

An embedding model maps text to a vector where similar meanings land close together. Postgres with **pgvector** is usually the right first choice: one database, real transactions, and SQL filters for tenant and permission checks.

\`\`\`sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE chunks (
  id         bigserial PRIMARY KEY,
  tenant_id  uuid NOT NULL,
  source     text NOT NULL,
  content    text NOT NULL,
  embedding  vector(1536) NOT NULL
);

CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);
\`\`\`

\`\`\`typescript
import OpenAI from "openai";
const openai = new OpenAI();

export async function embed(texts: string[]) {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });
  return res.data.map((d) => d.embedding);
}
\`\`\`

Batch your embedding calls — sending 100 chunks per request is dramatically cheaper and faster than 100 requests.

## Step 3: retrieval — go hybrid

Pure vector search is great at meaning and bad at exact terms: product codes, error messages, people's names. Keyword search (BM25) is the opposite. **Hybrid search** runs both and merges the results, typically with Reciprocal Rank Fusion:

\`\`\`typescript
function rrf(lists: string[][], k = 60) {
  const scores = new Map<string, number>();
  for (const list of lists) {
    list.forEach((id, rank) => {
      scores.set(id, (scores.get(id) ?? 0) + 1 / (k + rank + 1));
    });
  }
  return [...scores.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
}
\`\`\`

Always filter by \`tenant_id\` and the user's permissions **inside the query**, never after. In a multi-tenant SaaS, retrieval is where data leaks happen.

## Step 4: grounded generation

The system prompt does the heavy lifting. Tell the model exactly what it may use and what to do when the answer is missing:

\`\`\`typescript
const system = [
  "Answer ONLY from the context below.",
  "If the answer is not in the context, say you don't know.",
  "Cite sources as [1], [2].",
  "",
  "CONTEXT:",
  passages.map((p, i) => "[" + (i + 1) + "] " + p.content).join("\\n\\n"),
].join("\\n");

const stream = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  stream: true,
  temperature: 0.2,
  messages: [{ role: "system", content: system }, ...history],
});
\`\`\`

Stream the response to the browser. A RAG answer that appears token by token after 300ms feels instant; the same answer after a four-second spinner feels broken.

## Production checklist

- **Evaluate before you tune.** Keep 30–50 real questions with expected answers and score retrieval hit-rate and answer faithfulness on every change.
- **Rerank.** Retrieve 20, rerank to the best 4–6. Cheap, and usually the biggest accuracy win after chunking.
- **Defend against prompt injection.** Retrieved documents are untrusted input; never let them change system rules or trigger tools without checks.
- **Cache.** Cache embeddings of unchanged chunks and answers to frequent questions.
- **Track cost and latency per request.** Log tokens, retrieval time and model time from day one.

## When not to use RAG

If the knowledge is tiny and static — a few pages — just put it all in the prompt. If you need the model to adopt a style or format rather than know facts, that is prompting or fine-tuning territory. RAG shines when the data is large, changing, private, or permissioned.

## Takeaway

RAG is not a framework, it is a discipline: good chunks, hybrid retrieval with permission filters, a strict grounded prompt, streaming, and evals. Get those right and an LLM goes from a confident guesser to a genuinely useful interface over your own data.

Want to see a tiny version live? Open the **Ask AI** button on this site — it retrieves passages from this portfolio and answers only from them.
`;
