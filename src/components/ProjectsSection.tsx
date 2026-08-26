import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Folder, Star, Check, ArrowUpRight, GitFork } from "lucide-react";
import { projects } from "@/data/projectsData";
import ProjectThumb from "@/components/ProjectThumb";

// Parse "owner/repo" from a GitHub URL. Returns null for profile-only links.
const parseRepo = (url: string): string | null => {
  const m = url.match(/github\.com\/([^/]+)\/([^/?#]+)/);
  return m ? `${m[1]}/${m[2]}` : null;
};

// Fetch live stars/forks for a repo (no-op when there's no repo path).
const useRepoStats = (githubUrl: string) => {
  const [stats, setStats] = useState<{ stars: number; forks: number } | null>(
    null
  );
  useEffect(() => {
    const repo = parseRepo(githubUrl);
    if (!repo) return;
    let active = true;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (active)
          setStats({
            stars: d.stargazers_count ?? 0,
            forks: d.forks_count ?? 0,
          });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [githubUrl]);
  return stats;
};


const ProjectCard = ({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const show = isHovered || revealed;
  const repoStats = useRepoStats(project.github);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setRevealed((v) => !v)}
      className="group relative rounded-2xl overflow-hidden glass-card cursor-pointer"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={
          isHovered
            ? {
                boxShadow:
                  "0 0 40px hsl(var(--primary) / 0.4), 0 0 80px hsl(var(--primary) / 0.2)",
              }
            : {}
        }
      />

      {/* Project image with overlay */}
      <div className="relative h-48 overflow-hidden">
        <motion.div
          className="w-full h-full"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectThumb project={project} />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

        {/* Floating folder icon */}
        <motion.div
          className="absolute top-4 left-4 p-3 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30"
          animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Folder className="w-6 h-6 text-primary" />
        </motion.div>

        {/* Links - appear on hover */}
        <motion.div
          className="absolute top-4 right-4 flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:text-primary hover:bg-background transition-colors"
            aria-label="View GitHub"
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
            aria-label="View Demo"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Featured badge */}
        {project.featured && (
          <motion.div
            className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold flex items-center gap-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
          >
            <Star className="w-3 h-3" />
            Featured
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>

        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Live GitHub stats (only for projects with a public repo) */}
        {repoStats && (
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5" title="GitHub stars">
              <Star className="w-4 h-4 text-primary" />
              {repoStats.stars}
            </span>
            <span className="flex items-center gap-1.5" title="GitHub forks">
              <GitFork className="w-4 h-4 text-primary" />
              {repoStats.forks}
            </span>
          </div>
        )}

        {/* Case study link — gives each project an indexable URL */}
        <Link
          to={`/projects/${project.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 mb-4 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
        >
          Read the case study <ArrowUpRight className="w-4 h-4" />
        </Link>

        {/* Hover hint */}
        <motion.p
          className="flex items-center gap-1.5 mb-4 text-xs text-primary/80 font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <Star className="w-3.5 h-3.5" />
          Hover or tap to see key features
        </motion.p>

        {/* Tech stack with staggered animation */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.4 + index * 0.1 + techIndex * 0.05,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
              className="px-3 py-1 text-sm font-mono text-primary bg-primary/10 rounded-full cursor-default transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Hover feature reveal overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className={`absolute inset-0 z-20 flex flex-col p-6 bg-card/90 backdrop-blur-xl overflow-y-auto ${
          show ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/15 border border-primary/30">
            <Folder className="w-5 h-5 text-primary" />
          </div>
          {/* Not a heading: the card above already emits the project's
              <h3>. Repeating it here gave every project two H3s. */}
          <p className="text-lg font-bold text-foreground leading-tight">
            {project.title}
          </p>
        </div>

        <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-3">
          Key Features
        </p>

        <ul className="space-y-2 flex-1">
          {project.features?.map((feature, fIndex) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -12 }}
              animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ delay: show ? 0.08 + fIndex * 0.06 : 0 }}
              className="flex items-start gap-2 text-sm text-foreground/85"
            >
              <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        <div className="flex gap-3 mt-3">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Live Demo <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-border bg-background/60 text-foreground text-sm font-semibold hover:border-primary/60 transition-colors"
          >
            <Github className="w-4 h-4" /> Code
          </a>
        </div>
      </motion.div>

      {/* Bottom gradient line animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-30"
        initial={{ width: "0%" }}
        animate={show ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="projects" className="section-padding overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="gradient-text">Featured Projects</span>
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <motion.p
            className="text-muted-foreground text-center max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            A selection of projects I've built with passion and precision
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border bg-background/60 font-semibold hover:border-primary/60 transition-colors"
            >
              All projects &amp; case studies
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <motion.a
              href="https://github.com/Yasowant"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 40px hsl(var(--primary) / 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold transition-all"
            >
              <Github className="w-5 h-5" />
              View All Projects on GitHub
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
