import type Lenis from "lenis";

/**
 * Shared handle to the page's Lenis instance (desktop only). Components call
 * scrollToTarget() instead of scrollIntoView so anchor jumps glide with the
 * same easing as wheel scrolling — and still work when Lenis is off.
 */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

const NAV_OFFSET = -72;

export function scrollToTarget(target: string | HTMLElement | number) {
  if (instance) {
    instance.scrollTo(target, { offset: typeof target === "number" ? 0 : NAV_OFFSET, duration: 1.1 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
