import { lazy, Suspense, useEffect, useState } from "react";
import { Bot, X } from "lucide-react";
import { AI_CHAT_OPEN_EVENT } from "@/lib/aiChatBus";

// The panel (and the knowledge base it carries) is only downloaded when the
// visitor opens the chat, so it costs nothing on first page load.
const AIChatPanel = lazy(() => import("./AIChatPanel"));

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>();

  useEffect(() => {
    const onOpen = (e: Event) => {
      const prompt = (e as CustomEvent<{ prompt?: string }>).detail?.prompt;
      setInitialPrompt(prompt);
      setLoaded(true);
      setOpen(true);
    };
    window.addEventListener(AI_CHAT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(AI_CHAT_OPEN_EVENT, onOpen);
  }, []);

  return (
    <>
      {loaded && (
        <Suspense fallback={null}>
          <AIChatPanel open={open} onClose={() => setOpen(false)} initialPrompt={initialPrompt} />
        </Suspense>
      )}

      <button
        type="button"
        onClick={() => {
          setLoaded(true);
          setOpen((o) => !o);
        }}
        // Warm the chunk on intent so the panel opens instantly.
        onPointerEnter={() => import("./AIChatPanel")}
        aria-label={open ? "Close AI assistant" : "Ask my AI assistant"}
        className="group fixed bottom-5 right-4 md:right-16 z-[55] flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 pl-4 pr-4 text-white shadow-xl shadow-fuchsia-500/30 transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-fuchsia-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        {!open && <span className="hidden sm:inline text-sm font-semibold pr-1">Ask AI</span>}
      </button>
    </>
  );
};

export default AIChatWidget;
