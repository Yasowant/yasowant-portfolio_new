import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > 500);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-primary via-accent to-primary"
      />

      {/* Back to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={false}
        animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.6 }}
        transition={{ duration: 0.25 }}
        style={{ pointerEvents: show ? "auto" : "none" }}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 glow-sm hover:glow"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </>
  );
};

export default ScrollProgress;
