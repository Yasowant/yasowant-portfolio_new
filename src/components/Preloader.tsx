import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Full-screen intro preloader.
 * Draws the hexagon "Y" logo mark, then fades the whole overlay away to
 * reveal the portfolio underneath.
 */
const Preloader = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.svg
            width={110}
            height={110}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Loading"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <defs>
              <linearGradient id="preloader-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#388bfd" />
                <stop offset="100%" stopColor="#3fb950" />
              </linearGradient>
            </defs>

            {/* Hexagon frame — draws itself */}
            <motion.path
              d="M24 3 L42 13.5 L42 34.5 L24 45 L6 34.5 L6 13.5 Z"
              stroke="url(#preloader-grad)"
              strokeWidth="2"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />

            {/* Y monogram — draws after the frame */}
            <motion.path
              d="M16 16 L24 25 L32 16 M24 25 L24 34"
              stroke="url(#preloader-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease: "easeInOut" }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
