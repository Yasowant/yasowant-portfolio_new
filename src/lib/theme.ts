/**
 * Single theme store shared by every ThemeToggle instance and the ⌘K palette.
 * Switching uses the View Transitions API (where supported) to reveal the new
 * theme as a circle growing out of the element that was clicked.
 */
export type Theme = "light" | "dark" | "eye-protection";
export const THEME_ORDER: Theme[] = ["light", "dark", "eye-protection"];
export const THEME_LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  "eye-protection": "Eye Protection",
};

const listeners = new Set<() => void>();

const readInitial = (): Theme => {
  if (typeof document === "undefined") return "dark";
  try {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && THEME_ORDER.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  const root = document.documentElement;
  if (root.classList.contains("eye-protection")) return "eye-protection";
  if (root.classList.contains("dark")) return "dark";
  return "light";
};

let current: Theme = readInitial();

const applyClass = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.remove("dark", "eye-protection");
  if (theme === "dark") root.classList.add("dark");
  if (theme === "eye-protection") root.classList.add("eye-protection");
};

if (typeof document !== "undefined") applyClass(current);

export const getTheme = () => current;
export const subscribeTheme = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

const commit = (theme: Theme) => {
  current = theme;
  applyClass(theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* ignore */
  }
  listeners.forEach((fn) => fn());
};

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export function setTheme(next: Theme, origin?: { x: number; y: number }) {
  if (typeof document === "undefined" || next === current) return;
  const doc = document as DocWithVT;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduced) {
    commit(next);
    return;
  }
  const x = origin?.x ?? window.innerWidth - 60;
  const y = origin?.y ?? 32;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const t = doc.startViewTransition(() => commit(next));
  t.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 600, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
}

export function cycleThemeFrom(origin?: { x: number; y: number }) {
  setTheme(THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length], origin);
}
