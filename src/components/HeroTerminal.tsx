import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "@/data/projectsData";
import { blogPosts } from "@/data/blogData";
import { openAIChat } from "@/lib/aiChatBus";
import { cycleThemeFrom } from "@/lib/theme";
import { scrollToTarget } from "@/lib/smoothScroll";
import { BOOKING_URL, EMAIL } from "@/lib/booking";

type Line = { kind: "in" | "out"; node: ReactNode };

const Prompt = () => (
  <span className="select-none">
    <span className="text-accent">yasowant</span>
    <span className="text-muted-foreground">@</span>
    <span className="text-primary">dev</span>
    <span className="text-muted-foreground"> ~ </span>
    <span className="text-accent">›</span>{" "}
  </span>
);

const A = ({ onClick, children }: { onClick: () => void; children: ReactNode }) => (
  <button type="button" onClick={onClick} className="text-primary underline-offset-4 hover:underline">
    {children}
  </button>
);

const COMMANDS = ["help", "whoami", "skills", "projects", "open", "experience", "blog", "contact", "resume", "socials", "ai", "theme", "ls", "cat", "date", "clear", "hire"];

const HeroTerminal = () => {
  const navigate = useNavigate();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const help = (
    <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-0.5">
      {[
        ["whoami", "who I am"],
        ["skills", "my stack"],
        ["projects", "things I've shipped"],
        ["open <n>", "open project n"],
        ["experience", "where I've worked"],
        ["blog", "latest articles"],
        ["ai <question>", "ask my AI assistant"],
        ["contact", "get in touch"],
        ["resume", "download my CV"],
        ["theme", "switch theme"],
        ["clear", "clear the screen"],
      ].map(([c, d]) => (
        <div key={c} className="contents">
          <span className="text-primary">{c}</span>
          <span className="text-muted-foreground">{d}</span>
        </div>
      ))}
    </div>
  );

  const whoami = (
    <span>
      Yasowant Nayak — Full Stack Software Engineer (MERN), Bangalore. 3+ years shipping
      production SaaS with React, Node.js and MongoDB, now building AI features with LLMs &amp; RAG.
    </span>
  );

  const exec = (raw: string): ReactNode | "clear" | null => {
    const input = raw.trim();
    if (!input) return null;
    const [cmd, ...rest] = input.split(/\s+/);
    const arg = rest.join(" ");
    switch (cmd.toLowerCase()) {
      case "help":
      case "?":
        return help;
      case "whoami":
      case "about":
      case "cat":
        if (cmd === "cat" && arg && !/about/i.test(arg)) return <span>cat: {arg}: No such file. Try <span className="text-primary">cat about.md</span></span>;
        return whoami;
      case "ls":
        return <span className="text-primary">about.md&nbsp;&nbsp;skills/&nbsp;&nbsp;projects/&nbsp;&nbsp;blog/&nbsp;&nbsp;resume.pdf</span>;
      case "skills":
      case "stack":
        return (
          <div className="space-y-0.5">
            <div><span className="text-accent">backend </span> Node.js · Express · REST/GraphQL · Socket.IO · JWT + RBAC</div>
            <div><span className="text-accent">frontend</span> React · Next.js · TypeScript · Redux · Tailwind</div>
            <div><span className="text-accent">data    </span> MongoDB · PostgreSQL · MySQL · Redis</div>
            <div><span className="text-accent">ai      </span> LLM apps · RAG · embeddings · vector DBs · agents</div>
            <div><span className="text-accent">devops  </span> AWS · Docker · GitHub Actions · CI/CD</div>
          </div>
        );
      case "projects":
        return (
          <div className="space-y-0.5">
            {projects.map((p, i) => (
              <div key={p.slug}>
                <span className="text-muted-foreground">[{i + 1}]</span>{" "}
                <A onClick={() => navigate(`/projects/${p.slug}`)}>{p.shortName}</A>{" "}
                <span className="text-muted-foreground">— {p.tagline}</span>
              </div>
            ))}
            <div className="text-muted-foreground">Type <span className="text-primary">open 1</span> to view one.</div>
          </div>
        );
      case "open": {
        const n = Number(arg);
        const p = Number.isInteger(n) && n >= 1 ? projects[n - 1] : projects.find((x) => x.slug.includes(arg.toLowerCase()) && arg);
        if (!p) return <span>open: no project “{arg}”. Run <span className="text-primary">projects</span> first.</span>;
        setTimeout(() => navigate(`/projects/${p.slug}`), 350);
        return <span>Opening {p.shortName}…</span>;
      }
      case "experience":
      case "work":
        return (
          <div className="space-y-0.5">
            <div><span className="text-accent">2023–2026</span> Software Developer · SPM Global Technologies — multi-tenant SaaS for 8+ enterprise orgs</div>
            <div><span className="text-accent">2022–2023</span> Full Stack Developer · JSpiders</div>
            <div className="text-muted-foreground"><A onClick={() => scrollToTarget("#experience")}>see full timeline ↓</A></div>
          </div>
        );
      case "blog":
        return (
          <div className="space-y-0.5">
            {blogPosts.slice(0, 4).map((b) => (
              <div key={b.slug}>• <A onClick={() => navigate(`/blog/${b.slug}`)}>{b.title}</A></div>
            ))}
          </div>
        );
      case "contact":
      case "email":
      case "hire":
      case "sudo":
        if (cmd === "sudo" && !/hire/i.test(arg)) return <span>Nice try 😄 — but <span className="text-primary">sudo hire-me</span> works.</span>;
        setTimeout(() => (BOOKING_URL ? window.open(BOOKING_URL, "_blank", "noopener") : scrollToTarget("#contact")), 500);
        return (
          <span>
            Permission granted ✓ — reach me at <a className="text-primary hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            {BOOKING_URL ? " · opening my calendar…" : " · jumping to the contact form…"}
          </span>
        );
      case "resume":
      case "cv": {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Yasowant_Nayak_Full_Stack_Engineer_Resume.pdf";
        a.click();
        return <span>Downloading resume.pdf…</span>;
      }
      case "socials":
        return (
          <span>
            <a className="text-primary hover:underline" href="https://github.com/Yasowant" target="_blank" rel="noopener noreferrer">github</a> ·{" "}
            <a className="text-primary hover:underline" href="https://www.linkedin.com/in/yasowant-nayak" target="_blank" rel="noopener noreferrer">linkedin</a> ·{" "}
            <a className="text-primary hover:underline" href="https://www.instagram.com/yasowant.dev/" target="_blank" rel="noopener noreferrer">instagram</a> ·{" "}
            <a className="text-primary hover:underline" href="https://x.com/yash2062" target="_blank" rel="noopener noreferrer">x</a>
          </span>
        );
      case "ai":
      case "ask":
        openAIChat(arg || undefined);
        return <span>Opening my AI assistant{arg ? ` with “${arg}”` : ""}…</span>;
      case "theme":
        cycleThemeFrom();
        return <span>Theme switched.</span>;
      case "date":
        return <span>{new Date().toString()}</span>;
      case "pwd":
        return <span>/home/yasowant/portfolio</span>;
      case "clear":
      case "cls":
        return "clear";
      default:
        return (
          <span>
            command not found: {cmd}. Type <span className="text-primary">help</span>.
          </span>
        );
    }
  };

  const submit = (raw: string) => {
    const out = exec(raw);
    if (out === "clear") {
      setLines([]);
    } else {
      setLines((l) => [...l, { kind: "in", node: raw }, ...(out ? [{ kind: "out" as const, node: out }] : [])]);
    }
    if (raw.trim()) setHistory((h) => [...h, raw]);
    setHIndex(-1);
    setValue("");
  };

  // Boot sequence: type "whoami" once, then hand over to the visitor.
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLines([{ kind: "in", node: "whoami" }, { kind: "out", node: whoami }, { kind: "out", node: <span className="text-muted-foreground">Type <span className="text-primary">help</span> to explore.</span> }]);
      setBooted(true);
      return;
    }
    const word = "whoami";
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      i += 1;
      setValue(word.slice(0, i));
      if (i < word.length) t = setTimeout(step, 90);
      else
        t = setTimeout(() => {
          setLines([{ kind: "in", node: word }, { kind: "out", node: whoami }, { kind: "out", node: <span className="text-muted-foreground">Type <span className="text-primary">help</span> to explore — or try <span className="text-primary">projects</span>.</span> }]);
          setValue("");
          setBooted(true);
        }, 350);
    };
    t = setTimeout(step, 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden text-left shadow-2xl shadow-primary/10"
      onClick={() => booted && inputRef.current?.focus({ preventScroll: true })}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/60 bg-secondary/40">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">yasowant@dev — zsh</span>
        <span className="ml-auto hidden sm:inline font-mono text-[11px] text-muted-foreground">interactive · type help</span>
      </div>
      <div ref={bodyRef} data-lenis-prevent className="h-56 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed space-y-1.5">
        {lines.map((l, i) =>
          l.kind === "in" ? (
            <div key={i}><Prompt />{l.node}</div>
          ) : (
            <div key={i} className="text-foreground/85">{l.node}</div>
          ),
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (booted) submit(value);
          }}
          className="flex items-center"
        >
          <Prompt />
          <input
            ref={inputRef}
            value={value}
            readOnly={!booted}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && history.length) {
                e.preventDefault();
                const n = hIndex < 0 ? history.length - 1 : Math.max(0, hIndex - 1);
                setHIndex(n);
                setValue(history[n]);
              } else if (e.key === "ArrowDown" && hIndex >= 0) {
                e.preventDefault();
                const n = hIndex + 1;
                if (n >= history.length) { setHIndex(-1); setValue(""); } else { setHIndex(n); setValue(history[n]); }
              } else if (e.key === "Tab") {
                const match = COMMANDS.find((c) => c.startsWith(value.trim().toLowerCase()) && value.trim());
                if (match) { e.preventDefault(); setValue(match + " "); }
              }
            }}
            aria-label="Terminal input — type help"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            className="flex-1 min-w-0 bg-transparent outline-none border-0 p-0 text-foreground caret-accent focus-visible:outline-none"
          />
        </form>
      </div>
    </div>
  );
};

export default HeroTerminal;
