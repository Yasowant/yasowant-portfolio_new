import { Moon, Sun, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Theme = 'light' | 'dark' | 'eye-protection';

const ORDER: Theme[] = ['light', 'dark', 'eye-protection'];

const LABELS: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  'eye-protection': 'Eye Protection',
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.remove('dark', 'eye-protection');
  if (theme === 'dark') root.classList.add('dark');
  if (theme === 'eye-protection') root.classList.add('eye-protection');
};

const getInitialTheme = (): Theme => {
  try {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored && ORDER.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  const root = document.documentElement;
  if (root.classList.contains('eye-protection')) return 'eye-protection';
  if (root.classList.contains('dark')) return 'dark';
  return 'light';
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const cycleTheme = () => {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
    setTheme(next);
  };

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Eye;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={cycleTheme}
      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
      aria-label={`Theme: ${LABELS[theme]} (click to switch)`}
      title={`Theme: ${LABELS[theme]}`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="block"
      >
        <Icon className="w-5 h-5 text-foreground" />
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;
