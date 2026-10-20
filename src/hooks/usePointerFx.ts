import { useEffect } from "react";

/**
 * One global, passive pointer listener that powers two effects:
 *  - Spotlight: any `.glass-card` / `[data-spotlight]` gets --mx/--my so its
 *    ::after radial glow follows the cursor (see index.css).
 *  - Magnetic: any `[data-magnetic]` element drifts a few px toward the cursor.
 * Skipped entirely on touch devices and for reduced-motion users.
 */
export function usePointerFx() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia?.("(pointer: fine)").matches;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let magnet: HTMLElement | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const tick = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;
      if (!target || !(target instanceof Element)) return;

      const card = target.closest<HTMLElement>(".glass-card, [data-spotlight]");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const m = target.closest<HTMLElement>("[data-magnetic]");
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.32;
        m.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", release);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", release);
      if (frame) cancelAnimationFrame(frame);
      release();
    };
  }, []);
}
