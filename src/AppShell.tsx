import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Preloader from "@/components/Preloader";
import { useScrollPause } from "@/hooks/useScrollPause";
import Index from "./pages/Index";
import BlogPostPage from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Everything inside the router. Kept router-agnostic so the same tree can be
 * rendered by BrowserRouter in the browser and StaticRouter at build time
 * (see src/entry-server.tsx) for prerendering.
 */
const AppShell = ({ prerender = false }: { prerender?: boolean }) => {
  useScrollPause();

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {!prerender && (
        <>
          <Toaster />
          <Sonner />
          <Preloader />
        </>
      )}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default AppShell;
