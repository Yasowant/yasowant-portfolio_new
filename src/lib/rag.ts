/**
 * Minimal, dependency-free retrieval for the portfolio assistant.
 *
 * BM25 keyword scoring over a small in-memory knowledge base. Shared by the
 * browser (offline fallback) and the /api/chat edge function (context for the
 * LLM), so both always retrieve the same passages.
 */

export interface KnowledgeChunk {
  id: string;
  title: string;
  text: string;
  /** Optional link shown as a source under the answer. */
  url?: string;
}

const STOP = new Set(
  "a an the and or of to in on for with is are was were be been by at as it its this that from what which who whom how do does did can could you your i me my he his him she her they them their we our us about into than then so if not no yes any all".split(
    " ",
  ),
);

const SYNONYMS: Record<string, string> = {
  ai: "llm",
  gpt: "llm",
  openai: "llm",
  chatbot: "llm",
  genai: "llm",
  rag: "retrieval",
  vector: "embedding",
  embeddings: "embedding",
  job: "experience",
  work: "experience",
  worked: "experience",
  company: "experience",
  hire: "freelance",
  hiring: "freelance",
  rate: "price",
  rates: "price",
  cost: "price",
  charge: "price",
  pricing: "price",
  email: "contact",
  reach: "contact",
  insta: "instagram",
  ig: "instagram",
  reactjs: "react",
  node: "nodejs",
  "node.js": "nodejs",
  mongo: "mongodb",
  postgres: "postgresql",
  skill: "skills",
  stack: "skills",
  tech: "skills",
  technologies: "skills",
  projects: "project",
  built: "project",
  shipped: "project",
};

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9.+#\s]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^\.+|\.+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map((t) => SYNONYMS[t] ?? (t.endsWith("s") && t.length > 4 ? t.slice(0, -1) : t));
}

export interface Retriever {
  search: (query: string, k?: number) => { chunk: KnowledgeChunk; score: number }[];
}

export function createRetriever(chunks: KnowledgeChunk[]): Retriever {
  const k1 = 1.4;
  const b = 0.75;
  const docs = chunks.map((c) => {
    // Title terms count double — they describe what the chunk is about.
    const tokens = [...tokenize(c.title), ...tokenize(c.title), ...tokenize(c.text)];
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    return { chunk: c, tf, len: tokens.length };
  });
  const avgLen = docs.reduce((s, d) => s + d.len, 0) / Math.max(docs.length, 1);
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
  const N = docs.length;

  return {
    search(query, k = 4) {
      const q = [...new Set(tokenize(query))];
      if (!q.length) return [];
      return docs
        .map((d) => {
          let score = 0;
          for (const t of q) {
            const f = d.tf.get(t);
            if (!f) continue;
            const n = df.get(t) ?? 0;
            const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
            score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avgLen)));
          }
          return { chunk: d.chunk, score };
        })
        .filter((r) => r.score > 0)
        .sort((a, b2) => b2.score - a.score)
        .slice(0, k);
    },
  };
}
