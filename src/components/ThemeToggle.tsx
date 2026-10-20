import { Moon, Sun, Eye } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { getTheme, subscribeTheme, cycleThemeFrom, THEME_LABELS } from '@/lib/theme';

const ThemeToggle = () => {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => 'dark' as const);
  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Eye;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        cycleThemeFrom({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
      aria-label={`Theme: ${THEME_LABELS[theme]} (click to switch)`}
      title={`Theme: ${THEME_LABELS[theme]}`}
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
