import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Folder, Star, GitFork, Eye } from "lucide-react";

const projects = [
  {
    title: "Sanguine Infra Tech – Infrastructure Consultancy Website",
    description:
      "A corporate website for an infrastructure engineering consultancy showcasing services, sectors, projects, client portfolio, and tender-focused credentials. Designed to highlight techno-commercial expertise across civil, mechanical, and electrical engineering domains.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/yasowant/sanguine-infra-tech",
    demo: "https://sanguine-one.vercel.app",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop",
    stats: { stars: 65, forks: 18, views: 2900 },
    featured: true,
  },
  {
    title: "Survey Form Builder",
    description:
      "Dynamic form builder application that allows users to create custom surveys with various question types, conditional logic, and response analytics.",
    tech: ["React", "JavaScript", "Node.js", "MongoDB"],
    github: "https://github.com/yasowant/survey-builder",
    demo: "https://www.dealdox.io",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    stats: { stars: 38, forks: 8, views: 890 },
    featured: true,
  },
  {
    title: "QR Code Login System",
    description:
      "Innovative authentication system using QR codes for seamless cross-device login. Implements real-time WebSocket connections for instant verification.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    github: "https://github.com/AzarCodes/smaartqr",
    demo: "https://www.smaartqr.com",
    image:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&h=400&fit=crop",
    stats: { stars: 56, forks: 15, views: 1500 },
    featured: true,
  },
  {
    title: "GrandReserve – Hotel Booking Platform",
    description:
      "A modern hotel booking web application with real-time availability, secure authentication, room management, and seamless booking flow. Designed for performance, scalability, and great user experience.",
    tech: ["React", "Redux", "Node.js", "PostgreSQL", "Stripe", "Cloudinary"],
    github: "https://github.com/Yasowant/hotelbooking_FE",
    demo: "https://grandreserve-stays.vercel.app",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    stats: { stars: 120, forks: 34, views: 4100 },
    featured: true,
  },
];

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
      className="group relative rounded-2xl overflow-hidden bg-card border border-border"
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
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        />

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

        {/* Stats */}
        <motion.div
          className="flex gap-4 mb-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            {project.stats.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-4 h-4 text-primary" />
            {project.stats.forks}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-accent" />
            {project.stats.views}
          </span>
        </motion.div>

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

      {/* Bottom gradient line animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
        initial={{ width: "0%" }}
        animate={isHovered ? { width: "100%" } : { width: "0%" }}
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
            className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
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
            className="text-center mt-12"
          >
            <motion.a
              href="https://github.com/yasowant"
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
