import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Preloader from "@/components/Preloader";
import { useScrollPause } from "@/hooks/useScrollPause";
import Index from "./pages/Index";
import BlogIndex from "./pages/BlogIndex";
import BlogPostPage from "./pages/BlogPost";
import ProjectsIndex from "./pages/ProjectsIndex";
import ProjectDetail from "./pages/ProjectDetail";
import HireDetail from "./pages/HireDetail";
import Now from "./pages/Now";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Everything inside the router. Kept router-agnostic so the same tree can be
 * rendered by BrowserRouter in the browser and StaticRouter at build time
 * (see src/entry-server.tsx) for prerendering.
 *
 * Every path listed here must also appear in the route table in
 * scripts/prerender.mjs — a route that only renders client-side is invisible
 * to Googlebot's first pass and to every AI crawler.
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

        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        <Route path="/projects" element={<ProjectsIndex />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />

        <Route path="/hire/:slug" element={<HireDetail />} />

        <Route path="/now" element={<Now />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default AppShell;
