import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projectsData";
import PageShell from "@/components/PageShell";
import { usePageMeta, SITE_URL, PERSON_ID } from "@/hooks/usePageMeta";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // Unknown slug: hand it to the catch-all so the response is a real 404.
  if (!project) return <Navigate to="/404" replace />;

  const canonical = `${SITE_URL}/projects/${project.slug}`;
  const title = `${project.shortName} — ${project.tagline} | Yasowant Nayak`;
  const image = project.image.startsWith("http")
    ? project.image
    : `${SITE_URL}${project.image}`;
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  usePageMeta({
    title,
    description: project.answer,
    canonical,
    image,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${canonical}#app`,
        name: project.shortName,
        alternateName: project.title,
        description: project.answer,
        applicationCategory: "WebApplication",
        operatingSystem: "Web browser",
        url: canonical,
        sameAs: project.demo,
        screenshot: image,
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        runtimePlatform: project.tech,
        inLanguage: "en",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: project.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
          { "@type": "ListItem", position: 3, name: project.shortName, item: canonical },
        ],
      },
    ],
  });

  return (
    <PageShell
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Projects", to: "/projects" },
        { label: project.shortName },
      ]}
    >
      <article>
        <header className="max-w-3xl mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-accent/15 text-accent-foreground text-xs font-medium">
              {project.status}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="gradient-text">{project.shortName}</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-6">{project.tagline}</p>

          {/* Answer block — the passage answer engines are meant to lift. */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.answer}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-4 h-4" />
              Visit {project.demoLabel}
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-background/60 font-semibold hover:border-primary/60 transition-colors"
            >
              <Github className="w-4 h-4" />
              View code
            </a>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-border mb-14"
        >
          <img
            src={project.image}
            alt={`${project.shortName} interface — ${project.tagline}`}
            width={1200}
            height={700}
            decoding="async"
            className="w-full object-cover max-h-[520px]"
          />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                What {project.shortName} does
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-5">Key capabilities</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 p-4 rounded-xl bg-card border border-border"
                  >
                    <Check className="w-4 h-4 mt-1 text-primary shrink-0" />
                    <span className="text-sm text-foreground/85">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-5">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {project.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="p-5 rounded-xl bg-card border border-border"
                  >
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-bold mb-4">Built with</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-mono text-primary bg-primary/10 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-bold mb-2">Need something similar?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Yasowant Nayak takes on remote freelance and contract work
                worldwide.
              </p>
              <Link
                to="/hire/mvp-development"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
              >
                See how a build works <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {related.length > 0 && (
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-bold mb-4">Other projects</h2>
                <ul className="space-y-3">
                  {related.map((other) => (
                    <li key={other.slug}>
                      <Link
                        to={`/projects/${other.slug}`}
                        className="group block"
                      >
                        <span className="font-medium text-sm group-hover:text-primary transition-colors">
                          {other.shortName}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {other.tagline}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </article>
    </PageShell>
  );
};

export default ProjectDetail;
