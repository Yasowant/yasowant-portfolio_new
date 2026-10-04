import { useEffect } from "react";
import { setLenis } from "@/lib/smoothScroll";

/**
 * Buttery, momentum-style wheel scrolling via Lenis on pointer devices.
 * Touch devices keep native scrolling (already smooth and the fastest option),
 * and users who prefer reduced motion get native scrolling too.
 * Lenis is dynamically imported so it never blocks first paint.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let raf = 0;
    let destroyed = false;
    let lenis: import("lenis").default | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      lenis = new Lenis({
        lerp: 0.12, // snappy but smooth: lower = floatier, higher = faster
        wheelMultiplier: 1.1,
        smoothWheel: true,
        anchors: { offset: -72 }, // plain <a href="#id"> links glide too
      });
      setLenis(lenis);
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);
}
