import type { Project } from "@/data/projectsData";

/**
 * Project artwork.
 *
 * When a real screenshot exists in public/projects/ it is used. When one does
 * not, this renders a generated on-brand card instead of a stock photo.
 *
 * That is a deliberate choice: a stranger's Unsplash photo standing in for your
 * own product reads as filler to a visitor and adds nothing for a crawler. A
 * generated card is honest, matches the site, costs no external request, and
 * still carries the project name and stack as real text in the HTML.
 *
 * To replace one: save a screenshot as public/projects/<slug>.png and set
 * `image: "/projects/<slug>.png"` in src/data/projectsData.ts.
 */
const ProjectThumb = ({
  project,
  className = "",
  sizes,
  priority = false,
  compact = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Narrow slots (~200px): fewer chips, smaller type, no status line. */
  compact?: boolean;
}) => {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.shortName} — ${project.tagline}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        width={1200}
        height={750}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${project.shortName} — ${project.tagline}. Screenshot coming soon.`}
      className={`relative w-full h-full flex flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-primary/20 via-card to-accent/15 ${className}`}
    >
      {/* Faint grid, drawn in CSS so it costs no request and scales cleanly. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span
        className={`relative px-4 text-center font-bold text-foreground text-balance ${
          compact ? "text-base" : "text-xl md:text-2xl"
        }`}
      >
        {project.shortName}
      </span>
      <div className="relative flex flex-wrap justify-center gap-1.5 px-4">
        {project.tech.slice(0, compact ? 2 : 4).map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-0.5 rounded-full bg-background/70 border border-border text-[11px] font-mono text-primary"
          >
            {tech}
          </span>
        ))}
      </div>
      {!compact && (
        <span className="relative text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          {project.status}
        </span>
      )}
    </div>
  );
};

export default ProjectThumb;
