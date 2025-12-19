import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Database, Server, Sparkles, Download } from 'lucide-react';

const highlights = [
  { icon: Code2, text: 'Clean Code Advocate' },
  { icon: Server, text: 'API Development' },
  { icon: Database, text: 'Database Design' },
  { icon: Sparkles, text: 'Performance Optimization' },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12 rounded-full" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                I'm a passionate <span className="text-primary font-semibold">Full Stack Developer</span> with 
                strong experience in building production-ready web applications. I specialize in creating 
                scalable backend systems, RESTful APIs, and intuitive user interfaces.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                My approach combines <span className="text-primary font-semibold">clean code principles</span> with 
                modern development practices to deliver high-performance solutions. I thrive on solving complex 
                problems and turning ideas into reality.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                projects, and continuously expanding my skill set.
              </p>
              <a
                href="/resume.pdf"
                download="Yasowant_Nayak_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {highlights.map(({ icon: Icon, text }, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all card-hover"
                >
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <p className="font-medium text-foreground">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
