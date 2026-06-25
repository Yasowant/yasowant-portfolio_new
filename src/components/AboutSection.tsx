import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Database, Server, Sparkles, Download } from 'lucide-react';

const highlights = [
  { icon: Code2, text: 'System Design & Scalability' },
  { icon: Server, text: 'REST / SOAP / GraphQL APIs' },
  { icon: Database, text: 'Multi-Tenant Architecture' },
  { icon: Sparkles, text: 'CI/CD & Performance' },
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
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full" />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                I'm a <span className="text-primary font-semibold">Full Stack Software Engineer</span> with
                3+ years building production SaaS on React and Node.js. I love turning complex problems into
                clean, scalable systems — and I've scaled a multi-tenant platform to{" "}
                <span className="text-primary font-semibold">8+ enterprise organizations</span> while cutting
                page loads 40% and release time 50%.
              </p>
              <a
                href="/resume.pdf"
                download="Yasowant_Nayak_Full_Stack_Engineer_Resume.pdf"
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
