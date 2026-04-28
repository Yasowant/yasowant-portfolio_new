import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { TypeAnimation } from "react-type-animation";
import { useTilt } from "@/hooks/useTilt";

const HeroSection = () => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Glow animations */}
        <motion.div
          animate={{ x: [0, 200, -200, 0], y: [0, -100, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full top-0 left-0"
        />

        <motion.div
          animate={{ x: [0, -200, 200, 0], y: [0, 100, -100, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full bottom-0 right-0"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
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
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-spin-slow opacity-75 p-1">
                <div className="w-full h-full rounded-full bg-background" />
              </div>

              <img
                src={profilePhoto}
                alt="Yasowant Nayak"
                className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full object-cover hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="text-center lg:text-left max-w-xl">
            {/* 👋 Waving */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-mono text-lg mb-4 flex items-center gap-2 justify-center lg:justify-start"
            >
              Hi I'm
              <motion.span
                animate={{ rotate: [0, 20, -10, 20, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block origin-bottom-right"
              >
                👋
              </motion.span>
            </motion.p>

            {/* ✨ Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              <motion.span
                className="gradient-text inline-block"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Yasowant Nayak
              </motion.span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground font-mono mb-6"
            >
              Software Developer | Full Stack Engineer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg mb-6 leading-relaxed"
            >
              Passionate about building scalable web applications and clean
              backend systems. I transform complex problems into elegant,
              performant solutions.
            </motion.p>

            {/* ⌨️ Typing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg font-mono text-primary mb-8"
            >
              {"> "} I work with{" "}
              <span className="text-accent font-semibold">
                <TypeAnimation
                  sequence={[
                    "React ⚛️",
                    1500,
                    "Node.js 🚀",
                    1500,
                    "MongoDB 🍃",
                    1500,
                    "Three.js 🔥",
                    1500,
                  ]}
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
            >
              <a
                href="#projects"
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Contact Me
              </a>

              <a
                href="/resume.pdf"
                download="Yasowant_Nayak_Resume.pdf"
                className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-semibold flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex justify-center lg:justify-start gap-4"
            >
              {[
                { icon: Github, href: "https://github.com/yasowant" },
                { icon: Linkedin, href: "https://linkedin.com/in/yasowant" },
                { icon: Mail, href: "mailto:yasowant@email.com" },
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
