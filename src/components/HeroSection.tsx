import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Sparkles, ArrowUpRight } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useTilt } from "@/hooks/useTilt";

const HeroSection = () => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated aurora */}
        <div className="aurora" />

        {/* Grid with radial fade */}
        <div className="grid-fade absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />

        {/* Drifting glow orbs */}
        <motion.div
          animate={reduceMotion ? undefined : { x: [0, 200, -200, 0], y: [0, -100, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full top-0 left-0"
        />

        <motion.div
          animate={reduceMotion ? undefined : { x: [0, -200, 200, 0], y: [0, 100, -100, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-green-500/20 blur-3xl rounded-full bottom-0 right-0"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
          {/* 🧠 3D Tilt Profile */}
          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative transition-transform duration-200 ease-out"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Soft glowing halo */}
              <div className="absolute -inset-6 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />

              {/* Rotating conic gradient ring */}
              <div className="conic-ring absolute inset-0 rounded-full opacity-80 p-[3px]">
                <div className="w-full h-full rounded-full bg-background" />
              </div>

              {/* Thin inner accent ring */}
              <div className="absolute inset-1.5 rounded-full border border-primary/20" />

              {/* Photo */}
              <img
                src={profilePhoto}
                alt="Yasowant Nayak — Full Stack Software Engineer"
                fetchPriority="high"
                className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] rounded-full object-cover shadow-2xl shadow-primary/20 transition-all duration-300"
              />

              {/* Orbiting tech badges */}
              {[
                { label: "React", icon: "⚛️", pos: "-top-3 -left-4", delay: "" },
                { label: "TypeScript", icon: "📘", pos: "-top-2 -right-5", delay: "animate-float-delayed" },
                { label: "Node.js", icon: "🟢", pos: "-bottom-3 -left-5", delay: "animate-float-delayed" },
                { label: "MongoDB", icon: "🍃", pos: "-bottom-2 -right-4", delay: "" },
              ].map((b) => (
                <div
                  key={b.label}
                  className={`absolute ${b.pos} ${b.delay || "animate-float"} glass-card rounded-full px-3 py-1.5 flex items-center gap-1.5 text-sm font-semibold shadow-lg`}
                >
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <div className="text-center lg:text-left max-w-lg">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass-card text-sm font-medium"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              Available for work
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
            >
              <span className="gradient-text text-glow">Yasowant Nayak</span>
            </motion.h1>

            {/* Role */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground font-medium mb-5"
            >
              Full Stack Software Engineer
            </motion.h2>

            {/* One-line tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed"
            >
              I build fast, scalable SaaS with React &amp; Node.js — scaled a
              multi-tenant platform to 8+ organizations, cutting page loads 40%
              and release time 50%.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
            >
              <a
                href="#projects"
                className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all"
              >
                View Projects
              </a>

              <a
                href="/resume.pdf"
                download="Yasowant_Nayak_Full_Stack_Engineer_Resume.pdf"
                className="px-7 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </motion.div>

            {/* Featured project highlight */}
            <motion.a
              href="https://prep.esscentra.in/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="group inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2 mb-8 rounded-full glass-card text-sm font-medium hover:border-primary/60 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <span className="text-muted-foreground">Latest build:</span>
              <span className="font-semibold text-foreground">Esscentra Prep</span>
              <span className="hidden sm:inline text-muted-foreground">
                — AI study &amp; interview-prep planner
              </span>
              <span className="inline-flex items-center gap-1 text-primary font-semibold">
                Live
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </motion.a>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center lg:justify-start gap-4"
            >
              {[
                { icon: Github, href: "https://github.com/Yasowant" },
                { icon: Linkedin, href: "https://linkedin.com/in/yasowant-nayak" },
                { icon: Mail, href: "mailto:yasowant1998@gmail.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
