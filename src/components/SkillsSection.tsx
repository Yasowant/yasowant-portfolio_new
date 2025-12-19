import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'from-blue-500 to-cyan-400',
    skills: [
      { name: 'HTML5', icon: '🌐', level: 95 },
      { name: 'CSS3', icon: '🎨', level: 90 },
      { name: 'JavaScript', icon: '⚡', level: 90 },
      { name: 'React', icon: '⚛️', level: 85 },
      { name: 'TypeScript', icon: '📘', level: 80 },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: 'from-green-500 to-emerald-400',
    skills: [
      { name: 'Node.js', icon: '🟢', level: 90 },
      { name: 'Express.js', icon: '🚀', level: 88 },
      { name: 'Python', icon: '🐍', level: 80 },
      { name: 'REST APIs', icon: '🔗', level: 92 },
      { name: 'JWT Auth', icon: '🔐', level: 85 },
    ],
  },
  {
    title: 'Database',
    icon: '🗃️',
    color: 'from-purple-500 to-pink-400',
    skills: [
      { name: 'MongoDB', icon: '🍃', level: 88 },
      { name: 'PostgreSQL', icon: '🐘', level: 82 },
      { name: 'MySQL', icon: '🐬', level: 80 },
      { name: 'Redis', icon: '🔴', level: 70 },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    color: 'from-orange-500 to-yellow-400',
    skills: [
      { name: 'Git & GitHub', icon: '🐙', level: 92 },
      { name: 'Docker', icon: '🐳', level: 75 },
      { name: 'VS Code', icon: '💻', level: 95 },
      { name: 'Postman', icon: '📮', level: 90 },
    ],
  },
];

const SkillCard = ({ skill, index, isInView }: { skill: { name: string; icon: string; level: number }; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.1, 
        rotateY: 10,
        z: 50,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <div className="relative p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={isHovered ? { scale: 1.5, rotate: 180 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Glowing ring on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={isHovered ? { 
            boxShadow: '0 0 30px hsl(var(--primary) / 0.5), inset 0 0 30px hsl(var(--primary) / 0.1)'
          } : { 
            boxShadow: '0 0 0px transparent'
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative z-10 flex flex-col items-center gap-3">
          {/* Animated icon */}
          <motion.span
            className="text-4xl"
            animate={isHovered ? { 
              scale: 1.3, 
              rotate: [0, -10, 10, -10, 0],
            } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {skill.icon}
          </motion.span>
          
          {/* Skill name */}
          <span className="font-semibold text-foreground text-sm text-center">
            {skill.name}
          </span>
          
          {/* Circular progress */}
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-secondary"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 176' }}
                animate={isInView ? { 
                  strokeDasharray: `${skill.level * 1.76} 176` 
                } : {}}
                transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
            >
              {skill.level}%
            </motion.span>
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
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Technologies I've mastered to build powerful, scalable applications
          </p>

          {/* Category tabs with floating animation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} isInView={isInView} />
              ))}
            </div>
          </motion.div>

          {/* All skills floating showcase */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16 relative"
          >
            <h3 className="text-xl font-bold text-center mb-8 text-muted-foreground">
              Full Technology Stack
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skillCategories.flatMap(cat => cat.skills).map((skill, index) => (
                <motion.div
                  key={`all-${skill.name}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    delay: 1 + index * 0.05,
                    type: 'spring',
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                  className="px-4 py-2 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{skill.icon}</span>
                  <span className="font-medium text-sm">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
