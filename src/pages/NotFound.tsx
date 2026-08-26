import { Link, useLocation } from "react-router-dom";
import { Home, FolderGit2, FileText, Mail } from "lucide-react";
import PageShell from "@/components/PageShell";
import { usePageMeta, SITE_URL } from "@/hooks/usePageMeta";
import { projects } from "@/data/projectsData";
import { blogPosts } from "@/data/blogData";

/**
 * A 404 that is worth landing on: it keeps the visitor inside the site and
 * gives crawlers real internal links instead of a dead end. Marked noindex so
 * the soft-404 never competes with a real URL.
 */
const NotFound = () => {
  const location = useLocation();

  usePageMeta({
    title: "Page not found | Yasowant Nayak",
    description:
      "That page does not exist. Browse the projects, articles and freelance services of Yasowant Nayak, Full Stack Software Engineer.",
    canonical: `${SITE_URL}${location.pathname}`,
    noindex: true,
  });

  const destinations = [
    { icon: Home, label: "Homepage", detail: "Skills, experience and contact", to: "/" },
    { icon: FolderGit2, label: "Projects", detail: "Four production applications", to: "/projects" },
    { icon: FileText, label: "Articles", detail: "Backend and frontend engineering", to: "/blog" },
    { icon: Mail, label: "Get in touch", detail: "Freelance and contract enquiries", to: "/#contact" },
  ];

  return (
    <PageShell crumbs={[{ label: "Home", to: "/" }, { label: "Page not found" }]}>
      <div className="max-w-3xl">
        <p className="font-mono text-sm text-primary mb-3">404</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">That page doesn't exist</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-10">
          Nothing lives at{" "}
          <code className="px-2 py-0.5 rounded bg-card border border-border text-sm">
            {location.pathname}
          </code>
          . It may have moved, or the link may be wrong. Here is everything else.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {destinations.map(({ icon: Icon, label, detail, to }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <span className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                <Icon className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-semibold group-hover:text-primary transition-colors">
                  {label}
                </span>
                <span className="block text-sm text-muted-foreground">{detail}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-10">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Case studies
            </h2>
            <ul className="space-y-2.5">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {project.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Recent articles
            </h2>
            <ul className="space-y-2.5">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default NotFound;
