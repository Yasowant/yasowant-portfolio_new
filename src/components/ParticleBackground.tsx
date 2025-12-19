import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface SkillIcon {
  id: number;
  icon: string;
  left: number;
  delay: number;
  duration: number;
}

const skillIcons = [
  // Frontend
  '⚛️', // React
  '🌐', // HTML
  '🎨', // CSS
  '📜', // JavaScript
  // Backend
  '🟢', // Node.js
  '🐍', // Python
  '⚡', // Express
  // Database
  '🍃', // MongoDB
  '🐘', // PostgreSQL
  // Tools
  '🐙', // Git
  '🐳', // Docker
  '🔑', // JWT
];

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [skillIconElements, setSkillIconElements] = useState<SkillIcon[]>([]);

  useEffect(() => {
    const particleCount = 30;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 15 + Math.random() * 10,
        size: 2 + Math.random() * 4,
      });
    }
    
    setParticles(newParticles);

    // Generate floating skill icons
    const iconCount = 15;
    const newIcons: SkillIcon[] = [];
    
    for (let i = 0; i < iconCount; i++) {
      newIcons.push({
        id: i,
        icon: skillIcons[i % skillIcons.length],
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 20 + Math.random() * 15,
      });
    }
    
    setSkillIconElements(newIcons);
  }, []);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
      
      {/* Floating skill icons */}
      {skillIconElements.map((skillIcon) => (
        <motion.div
          key={`skill-${skillIcon.id}`}
          className="absolute text-2xl md:text-3xl opacity-20 pointer-events-none select-none"
          initial={{ y: '100vh', rotate: 0 }}
          animate={{ 
            y: '-10vh',
            rotate: 360,
          }}
          transition={{
            duration: skillIcon.duration,
            delay: skillIcon.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            left: `${skillIcon.left}%`,
          }}
        >
          {skillIcon.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default ParticleBackground;
