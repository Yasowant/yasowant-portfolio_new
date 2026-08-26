import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppShell from "./AppShell";
import { blogPosts } from "./data/blogData";
import { faqs } from "./data/faqData";
import { projects } from "./data/projectsData";
import { hireServices } from "./data/servicesData";

/**
 * Build-time render. Produces the real HTML for a route so that search
 * engines and AI answer-engine crawlers (which do not execute JavaScript)
 * receive fully-populated markup instead of an empty <div id="root">.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppShell prerender />
    </StaticRouter>
  );
}

// Re-exported so scripts/prerender.mjs can build the route table, structured
// data, sitemap and llms.txt from exactly the same source the app renders.
export { blogPosts, faqs, projects, hireServices };
