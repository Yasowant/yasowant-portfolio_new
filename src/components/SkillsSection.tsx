import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const skillCategories = [
  {
    title: 'AI & LLM',
    icon: '🤖',
    color: 'from-fuchsia-500 to-violet-400',
    skills: [
      { name: 'LLM Apps', icon: '🧠', level: 85 },
      { name: 'RAG Pipelines', icon: '📚', level: 84 },
      { name: 'LangChain.js', icon: '🦜', level: 80 },
      { name: 'Vector DBs', icon: '🧭', level: 80 },
      { name: 'Embeddings', icon: '🔎', level: 82 },
      { name: 'Prompt Engineering', icon: '✍️', level: 88 },
      { name: 'AI Agents', icon: '🛠️', level: 78 },
      { name: 'Streaming AI UIs', icon: '⚡', level: 86 },
    ],
  },
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'from-blue-500 to-cyan-400',
    skills: [
      { name: 'React.js', icon: '⚛️', level: 92 },
      { name: 'Next.js', icon: '▲', level: 85 },
      { name: 'TypeScript', icon: '📘', level: 88 },
      { name: 'JavaScript', icon: '⚡', level: 92 },
      { name: 'Redux', icon: '🔄', level: 85 },
      { name: 'Tailwind CSS', icon: '🎨', level: 90 },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: 'from-green-500 to-emerald-400',
    skills: [
      { name: 'Node.js', icon: '🟢', level: 90 },
      { name: 'Express.js', icon: '🚀', level: 88 },
      { name: 'REST / SOAP', icon: '🔗', level: 92 },
      { name: 'GraphQL', icon: '◈', level: 82 },
      { name: 'Socket.IO', icon: '🔌', level: 80 },
      { name: 'JWT + RBAC', icon: '🔐', level: 88 },
    ],
  },
  {
    title: 'Database',
    icon: '🗃️',
    color: 'from-purple-500 to-pink-400',
    skills: [
      { name: 'PostgreSQL', icon: '🐘', level: 85 },
      { name: 'MongoDB', icon: '🍃', level: 88 },
      { name: 'MySQL', icon: '🐬', level: 84 },
      { name: 'Redis', icon: '🔴', level: 78 },
    ],
  },
  {
    title: 'DevOps & System Design',
    icon: '🛠️',
    color: 'from-orange-500 to-yellow-400',
    skills: [
      { name: 'AWS', icon: '☁️', level: 82 },
      { name: 'Docker', icon: '🐳', level: 82 },
      { name: 'GitHub Actions', icon: '⚙️', level: 85 },
      { name: 'CI/CD', icon: '🔁', level: 86 },
      { name: 'System Design', icon: '🏗️', level: 85 },
      { name: 'Microservices', icon: '🧩', level: 80 },
    ],
  },
];

const SkillCard = ({ skill, index, isInView }: { skill: { name: string; icon: string; level: number }; index: number; isInView: boolean }) => {
  // Hover effects are pure CSS (cheap, compositor-only). Framer Motion is only
  // used for the one-off entrance, so nothing re-renders on hover.
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative group w-[150px] sm:w-[160px]"
    >
      <div className="relative h-full p-4 rounded-2xl bg-card border border-border overflow-hidden transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:border-primary/50 group-hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.45)]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
            {skill.icon}
          </span>

          <span className="font-semibold text-foreground text-sm text-center leading-tight min-h-[2.5em] flex items-center">
            {skill.name}
          </span>

          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-secondary" />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#skill-gradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 176' }}
                animate={isInView ? { strokeDasharray: `${skill.level * 1.76} 176` } : {}}
                transition={{ duration: 1.1, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">
              {skill.level}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="section-padding bg-secondary/30 overflow-hidden">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            From React frontends to Node.js backends — and now LLM-powered features with RAG, embeddings and AI agents
          </p>

          {/* Category tabs with floating animation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {skillCategories.map((category, index) => (
              <motion.button
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === index
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-card border border-border hover:border-primary/50'
                }`}
              >
                <motion.span
                  animate={activeCategory === index ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {category.icon}
                </motion.span>
                {category.title}
                {category.title === 'AI & LLM' && (
                  <span className="ml-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    New
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Skills grid with 3D perspective */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, rotateX: -15 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 15 }}
            transition={{ duration: 0.5 }}
            className="perspective-1000"
          >
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} isInView={isInView} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
