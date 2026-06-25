import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Github,
  Star,
  GitFork,
  Users,
  BookMarked,
  ExternalLink,
} from "lucide-react";

const GITHUB_USERNAME = "Yasowant";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
}

const langColor: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
  Shell: "#89e051",
  Vue: "#41b883",
};

const StatPill = ({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Star;
  value: string | number;
  label: string;
}) => (
  <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3">
    <div className="p-2.5 rounded-xl bg-primary/15 border border-primary/25">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <div className="text-2xl font-bold gradient-text leading-none">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  </div>
);

const GitHubSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [totalStars, setTotalStars] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
          ),
        ]);
        if (!uRes.ok || !rRes.ok) throw new Error("GitHub API error");
        const uData: GitHubUser = await uRes.json();
        const rData: GitHubRepo[] = await rRes.json();
        if (!active) return;

        const stars = rData.reduce(
          (sum, r) => sum + (r.stargazers_count || 0),
          0
        );
        const top = rData
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          )
          .slice(0, 6);

        setUser(uData);
        setRepos(top);
        setTotalStars(stars);
      } catch {
        if (active) setErrored(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="github"
      className="section-padding relative overflow-hidden"
    >
      {/* ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 flex items-center justify-center gap-3">
            <Github className="w-8 h-8 text-primary" />
            <span className="gradient-text">GitHub Activity</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Live, real-time data pulled straight from my GitHub profile — open
            source work, repositories, and contributions.
          </p>

          {/* Live stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <StatPill
              icon={BookMarked}
              value={loading ? "—" : user?.public_repos ?? "—"}
              label="Public Repos"
            />
            <StatPill
              icon={Star}
              value={loading ? "—" : totalStars}
              label="Total Stars"
            />
            <StatPill
              icon={Users}
              value={loading ? "—" : user?.followers ?? "—"}
              label="Followers"
            />
            <StatPill
              icon={Github}
              value={loading ? "—" : user?.following ?? "—"}
              label="Following"
            />
          </div>

          {/* Top repositories */}
          {!errored && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {(loading ? Array.from({ length: 6 }) : repos).map(
                (repo, index) => {
                  const r = repo as GitHubRepo | undefined;
                  return (
                    <motion.a
                      key={r?.id ?? index}
                      href={r?.html_url ?? `https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 24 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      whileHover={{ y: -6 }}
                      className="glass-card rounded-2xl p-5 block group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <BookMarked className="w-4 h-4 text-primary shrink-0" />
                          <span className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                            {r ? r.name : "loading…"}
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
                        {r?.description || "No description provided."}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {r?.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  langColor[r.language] || "#8b8b8b",
                              }}
                            />
                            {r.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" />
                          {r?.stargazers_count ?? 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" />
                          {r?.forks_count ?? 0}
                        </span>
                      </div>
                    </motion.a>
                  );
                }
              )}
            </div>
          )}

          {errored && (
            <p className="text-center text-muted-foreground">
              Couldn’t load live GitHub data right now — visit the profile
              directly below.
            </p>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-all glow-sm hover:glow"
            >
              <Github className="w-5 h-5" />
              View Full GitHub Profile
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
