import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export interface Crumb {
  label: string;
  /** Omit on the final crumb — the current page is not a link. */
  to?: string;
}

/**
 * Chrome shared by every routed sub-page: navbar, a visible breadcrumb trail
 * that mirrors the BreadcrumbList structured data, and the footer.
 */
const PageShell = ({
  crumbs,
  children,
}: {
  crumbs: Crumb[];
  children: ReactNode;
}) => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-50" aria-hidden="true" />}
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

export default PageShell;
