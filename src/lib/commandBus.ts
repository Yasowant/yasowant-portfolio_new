/** Tiny event bus so any component can open the ⌘K command palette or cycle the theme. */
export const COMMAND_OPEN_EVENT = "command:open";

export function openCommandPalette() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COMMAND_OPEN_EVENT));
}


export const isMac = () =>
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
