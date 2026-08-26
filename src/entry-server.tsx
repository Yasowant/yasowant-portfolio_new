import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppShell from "./AppShell";
import { blogPosts } from "./data/blogData";
import { faqs } from "./data/faqData";

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

export { blogPosts, faqs };
