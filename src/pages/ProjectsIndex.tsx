import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projectsData";
import PageShell from "@/components/PageShell";
import ProjectThumb from "@/components/ProjectThumb";
import { usePageMeta, SITE_URL, PERSON_ID } from "@/hooks/usePageMeta";

const TITLE = "Projects & Case Studies | Yasowant Nayak";
const DESCRIPTION =
  "Production software built by Yasowant Nayak: an AI study planner, a multi-tenant survey SaaS, an emergency-response platform and a hotel booking system — built with React, TypeScript, Node.js, MongoDB and PostgreSQL.";
const CANONICAL = `${SITE_URL}/projects`;

const ProjectsIndex = () => {
  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    canonical: CANONICAL,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${CANONICAL}#collection`,
        name: TITLE,
        description: DESCRIPTION,
        url: CANONICAL,
        inLanguage: "en",
        about: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((project, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: project.shortName,
            url: `${SITE_URL}/projects/${project.slug}`,
          })),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: CANONICAL },
        ],
      },
    ],
  });

  return (
    <PageShell crumbs={[{ label: "Home", to: "/" }, { label: "Projects" }]}>
      <header className="max-w-3xl mb-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-5">
          <span className="gradient-text">Projects &amp; Case Studies</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Yasowant Nayak has designed, built and deployed four production
          applications: Esscentra Prep, an AI interview and exam preparation
          planner; Survesy, a multi-tenant survey SaaS; SmaartQR, an emergency
          response platform serving 50,000+ registered users; and GrandReserve,
          a hotel booking platform with Stripe checkout.
        </p>
      </header>

      <div className="grid gap-7 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="group glass-card rounded-2xl overflow-hidden flex flex-col"
          >
            <Link to={`/projects/${project.slug}`} className="block h-48 overflow-hidden">
              <ProjectThumb
                project={project}
                className="transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono">
                  {project.category}
                </span>
                <span className="text-xs text-muted-foreground">{project.status}</span>
              </div>

              <h2 className="text-xl font-bold mb-2">
                <Link
                  to={`/projects/${project.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {project.shortName}
                </Link>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {project.tagline}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-xs font-mono text-primary bg-primary/10 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  Case study <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
};

export default ProjectsIndex;
