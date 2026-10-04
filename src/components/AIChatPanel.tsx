import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, User, ExternalLink } from "lucide-react";
import { knowledge, suggestedQuestions } from "@/data/aiKnowledge";
import { createRetriever } from "@/lib/rag";

type Source = { title: string; url?: string };
type Msg = { role: "user" | "assistant"; content: string; sources?: Source[]; offline?: boolean };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi! I'm Yasowant's AI assistant — a small RAG system running over this portfolio. Ask me about his experience, projects, AI work or availability.",
};

/** Renders **bold** and "- " bullet lines without pulling in a markdown lib. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => {
        const bullet = /^\s*[-*•]\s+/.test(line);
        const clean = line.replace(/^\s*[-*•]\s+/, "");
        const parts = clean.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
          p.startsWith("**") && p.endsWith("**") ? (
            <strong key={j} className="font-semibold text-foreground">
              {p.slice(2, -2)}
            </strong>
          ) : (
            <span key={j}>{p}</span>
          ),
        );
        if (!line.trim()) return <div key={i} className="h-2" />;
        return bullet ? (
          <div key={i} className="flex gap-2 pl-1">
            <span className="text-primary">•</span>
            <span>{parts}</span>
          </div>
        ) : (
          <p key={i}>{parts}</p>
        );
      })}
    </>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

const AIChatPanel = ({ open, onClose, initialPrompt }: Props) => {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const retriever = useMemo(() => createRetriever(knowledge), []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open && initialPrompt) ask(initialPrompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  /** Retrieval-only answer used when the LLM endpoint is unavailable. */
  const localAnswer = (q: string): Msg => {
    const hits = retriever.search(q, 2);
    if (!hits.length) {
      return {
        role: "assistant",
        offline: true,
        content:
          "I couldn't find that in the portfolio. Try asking about his experience, projects, skills, AI work or how to contact him — or email yasowant1998@gmail.com.",
      };
    }
    return {
      role: "assistant",
      offline: true,
      content: hits.map((h) => `**${h.chunk.title}**\n${h.chunk.text}`).join("\n\n"),
      sources: hits.map((h) => ({ title: h.chunk.title, url: h.chunk.url })),
    };
  };

  const ask = async (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setInput("");
    const history = [...messages, { role: "user" as const, content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.filter((m) => m !== WELCOME).map(({ role, content }) => ({ role, content })),
        }),
      });
      const type = res.headers.get("content-type") || "";
      if (!res.ok || !res.body || !type.startsWith("text/plain")) throw new Error("unavailable");

      let sources: Source[] | undefined;
      try {
        sources = JSON.parse(decodeURIComponent(res.headers.get("x-sources") || "[]"));
      } catch {
        /* ignore */
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: text }]);
      }
      if (!text.trim()) throw new Error("empty");
      setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: text, sources }]);
    } catch {
      setMessages((m) => [...m.slice(0, -1), localAnswer(q)]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="AI assistant"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[56] bottom-24 right-3 left-3 sm:left-auto sm:right-4 md:right-16 sm:w-[400px] h-[min(560px,calc(100dvh-8rem))] flex flex-col rounded-3xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden"
          data-lenis-prevent
        >
          {/* Header */}
          <div className="relative px-5 py-4 border-b border-border bg-gradient-to-r from-primary/15 via-violet-500/10 to-fuchsia-500/15">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-white">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-green-500" />
              </div>
              <div>
                <p className="font-bold leading-tight">Ask Yasowant's AI</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> RAG over this portfolio
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    m.role === "user" ? "bg-secondary" : "bg-gradient-to-br from-primary to-fuchsia-500 text-white"
                  }`}
                >
                  {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>
                <div className={`max-w-[85%] ${m.role === "user" ? "items-end" : ""} flex flex-col gap-1.5`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed space-y-1 ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary/70 text-muted-foreground rounded-tl-sm"
                    }`}
                  >
                    {m.content ? (
                      m.role === "user" ? m.content : <RichText text={m.content} />
                    ) : (
                      <span className="inline-flex gap-1 py-1" aria-label="Thinking">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: `${d * 120}ms` }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                  {m.sources && m.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.sources.map((s) =>
                        s.url ? (
                          <a
                            key={s.title}
                            href={s.url}
                            onClick={onClose}
                            className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:text-primary hover:border-primary/50"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {s.title.replace(/^(Project|Freelance service|Work experience) — /, "").slice(0, 34)}
                          </a>
                        ) : null,
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => ask(q)}
                    className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects, AI work…"
              maxLength={500}
              className="flex-1 rounded-full bg-secondary/70 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-white disabled:opacity-40 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatPanel;
