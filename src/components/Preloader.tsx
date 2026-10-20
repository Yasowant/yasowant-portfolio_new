import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Full-screen intro preloader.
 * Draws the "›y_" terminal logo mark with the Yasowant.dev wordmark, then fades the whole overlay away to
 * reveal the portfolio underneath.
 */
const SEEN_KEY = "preloader-seen";

const Preloader = () => {
  // Skip the intro entirely for anyone who has already seen it this session,
  // and for anyone who has asked for reduced motion. A returning visitor or a
  // recruiter with the tab open for four seconds should not wait on it.
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return true;
    } catch {
      /* storage unavailable */
    }
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  });

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => {
      setDone(true);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 900);
    return () => clearTimeout(timer);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.svg
              width={96}
              height={96}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Loading Yasowant.dev"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="drop-shadow-[0_10px_30px_hsl(var(--glow)/0.45)]"
            >
              <defs>
                <linearGradient id="preloader-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#388bfd" />
                  <stop offset="100%" stopColor="#3fb950" />
                </linearGradient>
              </defs>

              <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="#0d1117" />
              <motion.rect
                x="1.5" y="1.5" width="45" height="45" rx="12"
                stroke="url(#preloader-grad)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              {/* › prompt, then y, then the cursor */}
              <motion.path
                d="M11 16.5 L18 24 L11 31.5"
                stroke="url(#preloader-grad)"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              />
              <motion.path
                d="M22 18 L27.5 27 M33 18 L25.5 34"
                stroke="url(#preloader-grad)"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, delay: 0.45 }}
              />
              <rect x="34" y="31" width="6" height="3.4" rx="1.2" fill="#3fb950" className="logo-cursor" />
            </motion.svg>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="font-mono font-bold text-xl tracking-tight"
            >
              <span className="text-foreground">Yasowant</span>
              <span className="gradient-text">.dev</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
