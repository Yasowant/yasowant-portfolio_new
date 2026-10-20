import { Fragment } from "react";
import { Monitor, Server, Database, Plug, ArrowRight, ArrowDown } from "lucide-react";

/**
 * A layered architecture strip built from a project's real tech list —
 * Client → API → Data, with third-party services alongside. Nothing is
 * invented: a layer only appears when the project actually uses it.
 */
const LAYERS = [
  { key: "client", label: "Client", icon: Monitor, match: /react|vite|next|typescript|tailwind|redux|tanstack|recharts|query|vue|angular|html|css/i },
  { key: "api", label: "API layer", icon: Server, match: /node|express|rest|graphql|jwt|socket|nest|api/i },
  { key: "data", label: "Data", icon: Database, match: /mongo|postgres|mysql|redis|sql|prisma|mongoose|pgvector/i },
] as const;

const classify = (tech: string[]) => {
  const buckets: Record<string, string[]> = { client: [], api: [], data: [], services: [] };
  for (const t of tech) {
    const layer = LAYERS.find((l) => l.match.test(t));
    buckets[layer ? layer.key : "services"].push(t);
  }
  return buckets;
};

const ArchitectureDiagram = ({ tech }: { tech: string[] }) => {
  const b = classify(tech);
  const layers = LAYERS.filter((l) => b[l.key].length);

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-stretch gap-3">
        {layers.map((l, i) => (
          <Fragment key={l.key}>
            {i > 0 && (
              <div className="flex items-center justify-center text-primary/70">
                <ArrowRight className="hidden md:block w-5 h-5" />
                <ArrowDown className="md:hidden w-5 h-5" />
              </div>
            )}
            <div className="flex-1 rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-4">
              <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                <l.icon className="w-4 h-4" /> {l.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {b[l.key].map((t) => (
                  <span key={t} className="rounded-md bg-background/70 border border-border px-2 py-0.5 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      {b.services.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-border p-3">
          <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <Plug className="w-4 h-4" /> Integrations
          </span>
          {b.services.map((t) => (
            <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArchitectureDiagram;
