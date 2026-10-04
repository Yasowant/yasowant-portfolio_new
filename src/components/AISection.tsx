import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FileText,
  Scissors,
  Binary,
  Database,
  Search,
  MessageSquareText,
  Brain,
  Zap,
  Bot,
  Sparkles,
  Workflow,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { openAIChat } from "@/lib/aiChatBus";

/** The RAG pipeline, left to right. Rendered as a flow with a travelling pulse. */
const pipeline = [
  { icon: FileText, label: "Ingest", sub: "PDFs, docs, DB rows" },
  { icon: Scissors, label: "Chunk", sub: "semantic splits" },
  { icon: Binary, label: "Embed", sub: "vector embeddings" },
  { icon: Database, label: "Store", sub: "pgvector / Pinecone" },
  { icon: Search, label: "Retrieve", sub: "hybrid top-k + rerank" },
  { icon: Brain, label: "Generate", sub: "grounded LLM answer" },
  { icon: MessageSquareText, label: "Stream", sub: "token-by-token UI" },
];

const capabilities = [
  {
    icon: Bot,
    title: "RAG chatbots on your data",
    text: "Assistants that answer from your docs, tickets or database — with sources cited and no hallucinated facts.",
  },
  {
    icon: Search,
    title: "Semantic & hybrid search",
    text: "Embeddings + keyword (BM25) search with reranking, so users find what they mean, not just what they typed.",
  },
  {
    icon: Workflow,
    title: "AI agents & tool calling",
    text: "LLMs that call your APIs — create records, query data, trigger workflows — behind proper auth and RBAC.",
  },
  {
    icon: Sparkles,
    title: "AI features inside SaaS",
    text: "Resume parsing, plan generation, summaries and smart defaults shipped into real products like Esscentra Prep.",
  },
  {
    icon: Zap,
    title: "Fast, streaming UX",
    text: "Server-sent streaming, optimistic UI and caching so AI features feel instant instead of spinning.",
  },
  {
    icon: ShieldCheck,
    title: "Production guardrails",
    text: "Prompt-injection defence, PII redaction, rate limits, cost tracking and evals before anything ships.",
  },
];

const stack = [
  "OpenAI",
  "Gemini",
  "LangChain.js",
  "Vercel AI SDK",
  "pgvector",
  "Pinecone",
  "MongoDB Atlas Vector",
  "Redis",
  "Node.js",
  "Edge Functions",
];

const AISection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ai" className="section-padding relative overflow-hidden">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/15 via-primary/15 to-violet-500/15 blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium mb-5">
            <Sparkles className="h-4 w-4 text-fuchsia-400" />
            AI Engineering
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">LLMs, RAG &amp; AI Agents</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            I build AI features the way I build everything else — typed, tested and fast.
            Retrieval-augmented generation keeps answers grounded in <em>your</em> data,
            and a clean Node.js backend keeps it secure and affordable.
          </p>
        </motion.div>

        {/* RAG pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative glass-card rounded-3xl p-5 md:p-8 mb-10"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <h3 className="font-bold text-lg">How a RAG request flows</h3>
            <span className="font-mono text-xs text-muted-foreground">query → context → grounded answer</span>
          </div>

          <div className="relative">
            {/* connector line + travelling pulse (desktop) */}
            <div className="hidden lg:block absolute left-[7%] right-[7%] top-7 h-px bg-gradient-to-r from-primary/40 via-fuchsia-400/50 to-accent/40" aria-hidden="true">
              <span className="rag-pulse absolute -top-[3px] h-[7px] w-16 rounded-full bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent" />
            </div>

            <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-2">
              {pipeline.map(({ icon: Icon, label, sub }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-card border border-border shadow-lg shadow-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <span className="mt-3 font-semibold text-sm">{label}</span>
                  <span className="text-xs text-muted-foreground">{sub}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>

        {/* Capabilities + code */}
        <div className="grid lg:grid-cols-5 gap-6 mb-10">
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {capabilities.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
                className="group relative rounded-2xl bg-card border border-border p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_12px_40px_-14px_hsl(var(--primary)/0.5)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-fuchsia-500/15">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Code card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 rounded-2xl border border-border bg-[#0d1117] text-[#c9d1d9] overflow-hidden shadow-2xl shadow-primary/10 flex flex-col"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-white/50">rag.ts</span>
            </div>
            <pre className="flex-1 overflow-x-auto p-4 text-[12.5px] leading-relaxed font-mono">
<code><span className="text-[#ff7b72]">export async function</span> <span className="text-[#d2a8ff]">answer</span>(q: <span className="text-[#79c0ff]">string</span>) {"{"}
{"  "}<span className="text-[#8b949e]">// 1. embed the question</span>
{"  "}<span className="text-[#ff7b72]">const</span> v = <span className="text-[#ff7b72]">await</span> <span className="text-[#d2a8ff]">embed</span>(q);

{"  "}<span className="text-[#8b949e]">// 2. hybrid retrieve + rerank</span>
{"  "}<span className="text-[#ff7b72]">const</span> docs = <span className="text-[#ff7b72]">await</span> db.<span className="text-[#d2a8ff]">search</span>({"{"} v, q, k: <span className="text-[#79c0ff]">8</span> {"}"});
{"  "}<span className="text-[#ff7b72]">const</span> ctx = <span className="text-[#d2a8ff]">rerank</span>(q, docs).<span className="text-[#d2a8ff]">slice</span>(<span className="text-[#79c0ff]">0</span>, <span className="text-[#79c0ff]">4</span>);

{"  "}<span className="text-[#8b949e]">// 3. grounded, streamed answer</span>
{"  "}<span className="text-[#ff7b72]">return</span> llm.<span className="text-[#d2a8ff]">stream</span>({"{"}
{"    "}system: <span className="text-[#a5d6ff]">"Answer only from context. Cite sources."</span>,
{"    "}context: ctx,
{"    "}question: q,
{"  "}{"}"});
{"}"}</code>
            </pre>
          </motion.div>
        </div>

        {/* Stack + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-mono text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openAIChat()}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 px-7 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition-transform hover:scale-[1.03]"
          >
            <Bot className="h-5 w-5" />
            Try it — ask my AI assistant about me
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AISection;
