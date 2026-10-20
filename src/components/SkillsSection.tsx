import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Server, Monitor, Bot, Database, Cloud, CalendarClock, ArrowUpRight, Github } from "lucide-react";
import TechIcon from "@/components/TechIcon";
import type { TechIconName } from "@/lib/techIcons";
import { BOOKING_URL } from "@/lib/booking";
import { scrollToTarget } from "@/lib/smoothScroll";

type Skill = { name: string; icon?: TechIconName };

const backend: Skill[] = [
  { name: "Node.js", icon: "NodeJs" },
  { name: "Express.js", icon: "Express" },
  { name: "REST / SOAP" },
  { name: "GraphQL", icon: "GraphQL" },
  { name: "Socket.IO" },
  { name: "JWT + RBAC" },
  { name: "Microservices" },
  { name: "System Design" },
];
const frontend: Skill[] = [
  { name: "React.js", icon: "React" },
  { name: "Next.js", icon: "NextJs" },
  { name: "TypeScript", icon: "TypeScript" },
  { name: "JavaScript", icon: "JavaScript" },
  { name: "Redux", icon: "Redux" },
  { name: "Tailwind CSS", icon: "Tailwind" },
];
const ai: Skill[] = [
  { name: "LLM apps", icon: "OpenAI" },
  { name: "RAG pipelines" },
  { name: "LangChain.js", icon: "LangChain" },
  { name: "Embeddings" },
  { name: "Vector DBs" },
  { name: "AI agents" },
  { name: "Streaming UIs" },
];
const data: Skill[] = [
  { name: "MongoDB", icon: "MongoDB" },
  { name: "PostgreSQL", icon: "PostgreSQL" },
  { name: "MySQL", icon: "MySQL" },
  { name: "Redis", icon: "Redis" },
];
const devops: Skill[] = [
  { name: "AWS", icon: "AWS" },
  { name: "Docker", icon: "Docker" },
  { name: "GitHub Actions", icon: "GitHubActions" },
  { name: "CI/CD" },
];

const Chip = ({ skill }: { skill: Skill }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/50 px-3 py-1.5 text-[13px] font-medium text-foreground/90 transition-colors hover:border-primary/50">
    {skill.icon ? (
      <TechIcon name={skill.icon} className="h-3.5 w-3.5" />
    ) : (
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
    )}
    {skill.name}
  </span>
);

const Tile = ({
  className = "",
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`glass-card card-glow rounded-3xl p-6 overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const TileHead = ({ icon: Icon, title, badge }: { icon: typeof Server; title: string; badge?: string }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
      <Icon className="h-5 w-5 text-white" />
    </span>
    <h3 className="text-lg font-bold">{title}</h3>
    {badge && (
      <span className="ml-auto rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
        {badge}
      </span>
    )}
  </div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="eyebrow mb-4">› ls ~/skills</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Backend-first full stack — Node.js services and APIs, React frontends, and now
            LLM-powered features with RAG, embeddings and agents.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(150px,auto)]">
          {/* Backend — the hero tile */}
          <Tile className="lg:col-span-2 lg:row-span-2 flex flex-col">
            <TileHead icon={Server} title="Backend & APIs" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-md">
              Where I spend most of my time: designing APIs, multi-tenant data isolation,
              auth and the services behind them.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {backend.map((s) => <Chip key={s.name} skill={s} />)}
            </div>
            <pre className="mt-auto rounded-2xl border border-border/60 bg-background/70 p-4 font-mono text-[12px] leading-relaxed text-muted-foreground overflow-x-auto">
<span className="text-accent">router</span>.<span className="text-primary">get</span>(<span className="text-amber-400">"/api/:tenant/surveys"</span>,{"\n"}
{"  "}auth(<span className="text-amber-400">"jwt"</span>), can(<span className="text-amber-400">"survey:read"</span>),{"\n"}
{"  "}<span className="text-accent">async</span> (req, res) =&gt; res.json(<span className="text-accent">await</span> svc.list(req.tenant))){"\n"}
<span className="text-muted-foreground/70">// 15+ REST, SOAP &amp; GraphQL APIs shipped to production</span>
            </pre>
          </Tile>

          <Tile className="lg:col-span-2" delay={0.05}>
            <TileHead icon={Monitor} title="Frontend" />
            <div className="flex flex-wrap gap-2">
              {frontend.map((s) => <Chip key={s.name} skill={s} />)}
            </div>
          </Tile>

          <Tile className="lg:col-span-2" delay={0.1}>
            <TileHead icon={Bot} title="AI & LLM" badge="New" />
            <div className="flex flex-wrap gap-2">
              {ai.map((s) => <Chip key={s.name} skill={s} />)}
            </div>
          </Tile>

          <Tile delay={0.05}>
            <TileHead icon={Database} title="Databases" />
            <div className="flex flex-wrap gap-2">
              {data.map((s) => <Chip key={s.name} skill={s} />)}
            </div>
          </Tile>

          <Tile delay={0.1}>
            <TileHead icon={Cloud} title="DevOps & Cloud" />
            <div className="flex flex-wrap gap-2">
              {devops.map((s) => <Chip key={s.name} skill={s} />)}
            </div>
          </Tile>

          <Tile delay={0.15} className="flex flex-col justify-between">
            <span className="font-mono text-xs text-muted-foreground">› uptime</span>
            <div>
              <div className="text-5xl font-bold gradient-text leading-none font-display">3+</div>
              <p className="mt-2 text-sm text-muted-foreground">
                years shipping production SaaS for 8+ enterprise organisations
              </p>
            </div>
          </Tile>

          <Tile delay={0.2} className="flex flex-col justify-between bg-gradient-to-br from-primary/10 to-accent/10">
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              Open to work
            </span>
            <p className="text-sm text-muted-foreground my-3">
              Full-time roles and remote freelance projects.
            </p>
            <a
              href={BOOKING_URL || "#contact"}
              target={BOOKING_URL ? "_blank" : undefined}
              rel={BOOKING_URL ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (!BOOKING_URL) {
                  e.preventDefault();
                  scrollToTarget("#contact");
                }
              }}
              data-magnetic
              className="btn-shine inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
            >
              <CalendarClock className="h-4 w-4" /> Book a call
            </a>
          </Tile>

          {/* GitHub contributions */}
          <Tile className="md:col-span-2 lg:col-span-4" delay={0.1}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/90">
                <Github className="h-5 w-5 text-background" />
              </span>
              <h3 className="text-lg font-bold">Contribution activity</h3>
              <a
                href="https://github.com/Yasowant"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
              >
                github.com/Yasowant <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="overflow-x-auto" data-lenis-prevent>
              <img
                src="https://ghchart.rshah.org/3fb950/Yasowant"
                alt="Yasowant Nayak's GitHub contribution graph for the last year"
                loading="lazy"
                decoding="async"
                width={720}
                height={112}
                className="min-w-[640px] w-full h-auto opacity-90 dark:[filter:brightness(1.05)]"
                onError={(e) => {
                  const tile = e.currentTarget.closest(".glass-card") as HTMLElement | null;
                  if (tile) tile.style.display = "none";
                }}
              />
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
