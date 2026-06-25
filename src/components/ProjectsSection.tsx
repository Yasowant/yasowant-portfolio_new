import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Folder, Star, Check, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Survesy – Multi-Tenant Survey SaaS",
    description:
      "A production-ready, all-in-one survey platform: build beautiful forms in minutes, share with a link, and watch responses turn into live charts — no spreadsheets, no setup.",
    features: [
      "Drag-and-drop builder with multi-section surveys",
      "Conditional logic via a visual rules engine",
      "Real-time analytics: trends & completion rates",
      "10+ question types with CSV / JSON export",
      "Role-based access & full audit logs",
      "Tiered subscriptions (Free → Premium)",
    ],
    tech: ["React", "TypeScript", "TanStack Router", "React Query", "Node.js", "MongoDB", "Recharts"],
    github: "https://github.com/Yasowant",
    demo: "https://frontend-survey-saas-platform.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    stats: { stars: 74, forks: 19, views: 3200 },
    featured: true,
  },
  {
    title: "SmaartQR – Emergency Response Platform",
    description:
      "India's unified emergency-response platform — one scan connects citizens to verified, life-saving services 24/7, wherever they are. Live in production at smaartqr.com.",
    features: [
      "One scan → 11+ verified emergency services",
      "Police, Fire, Ambulance & Women's helpline",
      "OTP-based secure registration, no long forms",
      "24/7 round-the-clock emergency response",
      "Civic services for subscribed users",
      "Trusted by 50K+ registered users",
    ],
    tech: ["React.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    github: "https://github.com/Yasowant",
    demo: "https://www.smaartqr.com",
    image:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&h=400&fit=crop",
    stats: { stars: 56, forks: 15, views: 1500 },
    featured: true,
  },
  {
    title: "Sanguine Infra Tech – Consultancy Website",
    description:
      "A corporate website for an infrastructure engineering consultancy, highlighting techno-commercial expertise across civil, mechanical, and electrical engineering domains.",
    features: [
      "Services & engineering sectors showcase",
      "Project portfolio with client credentials",
      "Tender-focused, conversion-driven layout",
      "Smooth Framer Motion animations",
      "Fully responsive across devices",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Yasowant/sanguine-infra-tech",
    demo: "https://sanguine-one.vercel.app",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop",
    stats: { stars: 65, forks: 18, views: 2900 },
    featured: true,
  },
  {
    title: "GrandReserve – Hotel Booking Platform",
    description:
      "A modern hotel booking web application designed for performance, scalability, and a seamless guest experience from search to checkout.",
    features: [
      "Real-time room availability & search",
      "Secure authentication and user accounts",
      "Stripe-powered payments & checkout",
      "Room management with Cloudinary media",
      "Smooth, mobile-first booking flow",
    ],
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
      className="group relative rounded-2xl overflow-hidden glass-card"
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

        {/* Hover hint */}
        <motion.p
          className="flex items-center gap-1.5 mb-4 text-xs text-primary/80 font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <Star className="w-3.5 h-3.5" />
          Hover to see key features
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
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className={`absolute inset-0 z-20 flex flex-col p-6 bg-card/80 backdrop-blur-xl ${
          isHovered ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/15 border border-primary/30">
            <Folder className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground leading-tight">
            {project.title}
          </h3>
        </div>

        <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-3">
          Key Features
        </p>

        <ul className="space-y-2 flex-1">
          {project.features?.map((feature, fIndex) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -12 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ delay: isHovered ? 0.08 + fIndex * 0.06 : 0 }}
              className="flex items-start gap-2 text-sm text-foreground/85"
            >
              <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        <div className="flex gap-3 mt-4">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Live Demo <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
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
