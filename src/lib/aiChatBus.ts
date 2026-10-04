/** Tiny event bus so any component can open the AI chat widget. */
export const AI_CHAT_OPEN_EVENT = "ai-chat:open";

export function openAIChat(prompt?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AI_CHAT_OPEN_EVENT, { detail: { prompt } }));
}
