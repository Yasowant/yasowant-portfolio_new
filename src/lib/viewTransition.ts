import { flushSync } from "react-dom";
import type { NavigateFunction } from "react-router-dom";
import { scrollToTopInstant } from "@/lib/smoothScroll";

type DocWithVT = Document & { startViewTransition?: (cb: () => void) => unknown };

/**
 * Navigate inside a View Transition so elements sharing a
 * `view-transition-name` (e.g. a project thumbnail) morph between pages.
 * Falls back to a normal navigation where unsupported.
 */
export function navigateWithTransition(navigate: NavigateFunction, to: string) {
  const doc = document as DocWithVT;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduced) {
    navigate(to);
    return;
  }
  doc.startViewTransition(() => {
    flushSync(() => navigate(to));
    scrollToTopInstant();
  });
}

export const projectVT = (slug: string) => ({ viewTransitionName: `project-${slug}` });
