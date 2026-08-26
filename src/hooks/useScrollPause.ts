import { useEffect } from "react";

/**
 * Adds `is-scrolling` to <html> while the user is actively scrolling and
 * removes it shortly after they stop.
 *
 * The page renders a lot of backdrop-filter surfaces. Anything animating
 * behind them invalidates their cached backdrop, forcing the compositor to
 * re-blur every one of them on every scroll frame. Freezing the decorative
 * animations for the duration of the scroll keeps that backdrop static.
 * See the `html.is-scrolling` rules in src/index.css.
 */
export function useScrollPause(idleMs = 140) {
  useEffect(() => {
    const root = document.documentElement;
    let idleTimer: number | undefined;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          root.classList.add("is-scrolling");
          ticking = false;
        });
      }
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => root.classList.remove("is-scrolling"), idleMs);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimer);
      root.classList.remove("is-scrolling");
    };
  }, [idleMs]);
}
