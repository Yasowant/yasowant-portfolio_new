import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import ProjectThumb from "@/components/ProjectThumb";
import { usePageMeta, SITE_URL, PERSON_ID } from "@/hooks/usePageMeta";
import { blogPosts } from "@/data/blogData";
import { getProjectBySlug } from "@/data/projectsData";
import profilePhoto from "@/assets/profile-photo.jpg";

/**
 * /now — a dated status page.
 *
 * Two jobs: it gives retrieval systems a recently-modified URL to notice, and
 * it tells a prospective client whether Yasowant Nayak has capacity right now.
 *
 * >>> Update NOW_UPDATED and the three lists below roughly once a month. <<<
 * A stale /now page is worse than no /now page.
 */
const NOW_UPDATED = "2026-08-26";

interface NowItem {
  text: string;
  /** Renders the project's artwork and links to its case study. */
  projectSlug?: string;
}

const CURRENTLY: NowItem[] = [
  {
    text: "Leading full-stack development of a multi-tenant SaaS platform at SPM Global Technologies, serving 8+ enterprise organisations with strict per-tenant data isolation.",
  },
  {
    text: "Running Esscentra Prep in production at prep.esscentra.in — an AI interview and exam preparation planner built and deployed end-to-end.",
    projectSlug: "esscentra-prep",
  },
  {
    text: "Maintaining SmaartQR, an emergency-response platform with 50,000+ registered users.",
    projectSlug: "smaartqr",
  },
];

const AVAILABILITY: NowItem[] = [
  { text: "Open to remote freelance and contract work worldwide — India, the UK, the US, Europe, Canada, Australia, the UAE and Singapore." },
  { text: "Working hours are IST (UTC+5:30), overlapping with UK and European hours and with US mornings." },
  { text: "Enquiries go to yasowant1998@gmail.com and usually get a reply within a day." },
];

const LEARNING: NowItem[] = [
  { text: "Event-driven architecture with Apache Kafka — consumer groups, partitioning and rebalance behaviour under real load." },
  { text: "Access control models beyond RBAC: ABAC, PBAC and ReBAC for multi-tenant systems." },
  { text: "Answer-engine optimisation: structured data, extractable content and how retrieval systems actually pick sources." },
];

const NowCard = ({ item }: { item: NowItem }) => {
  const project = item.projectSlug ? getProjectBySlug(item.projectSlug) : undefined;

  if (!project) {
    return (
      <li className="p-5 rounded-xl bg-card border border-border text-foreground/85 leading-relaxed">
        {item.text}
      </li>
    );
  }

  return (
    <li className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="grid sm:grid-cols-[200px_1fr]">
        <Link
          to={`/projects/${project.slug}`}
          className="block h-36 sm:h-full min-h-[144px] overflow-hidden border-b sm:border-b-0 sm:border-r border-border"
          aria-label={`${project.shortName} case study`}
        >
          <ProjectThumb project={project} compact />
        </Link>
        <div className="p-5 flex flex-col gap-3">
          <p className="text-foreground/85 leading-relaxed">{item.text}</p>
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary hover:gap-2.5 transition-all"
          >
            {project.shortName} case study <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </li>
  );
};

const Now = () => {
  const canonical = `${SITE_URL}/now`;
  const latest = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))[0];
  const formatted = new Date(NOW_UPDATED).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  usePageMeta({
    title: "What Yasowant Nayak Is Working On Now",
    description:
      "A dated status page: what Yasowant Nayak is building this month, what he is learning, and whether he has capacity for new freelance or contract work.",
    canonical,
    type: "profile",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${canonical}#page`,
        name: "What Yasowant Nayak Is Working On Now",
        url: canonical,
        dateModified: NOW_UPDATED,
        inLanguage: "en",
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Now", item: canonical },
        ],
      },
    ],
  });

  const Section = ({ heading, items }: { heading: string; items: NowItem[] }) => (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-5">{heading}</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <NowCard key={item.text} item={item} />
        ))}
      </ul>
    </section>
  );

  return (
    <PageShell crumbs={[{ label: "Home", to: "/" }, { label: "Now" }]}>
      <article className="max-w-4xl">
        <header className="mb-14 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <p className="text-sm font-mono text-primary mb-3">
              Updated <time dateTime={NOW_UPDATED}>{formatted}</time>
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              <span className="gradient-text">What I'm working on now</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Yasowant Nayak is a Full Stack Software Engineer in Bangalore,
              India, currently leading development of a multi-tenant SaaS
              platform at SPM Global Technologies while running Esscentra Prep
              in production. Yasowant Nayak is available for remote freelance
              and contract work with clients in India, the UK, the US and
              Europe.
            </p>
          </div>

          <img
            src={profilePhoto}
            alt="Yasowant Nayak, Full Stack Software Engineer based in Bangalore, India"
            width={160}
            height={160}
            decoding="async"
            className="order-first sm:order-none w-28 h-28 sm:w-40 sm:h-40 rounded-2xl object-cover border border-border shadow-lg"
          />
        </header>

        <Section heading="Building" items={CURRENTLY} />
        <Section heading="Availability" items={AVAILABILITY} />
        <Section heading="Learning" items={LEARNING} />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-5">Latest article</h2>
          <Link
            to={`/blog/${latest.slug}`}
            className="group grid sm:grid-cols-[200px_1fr] rounded-xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors"
          >
            <span className="block h-36 sm:h-full min-h-[144px] overflow-hidden border-b sm:border-b-0 sm:border-r border-border">
              <img
                src={latest.image}
                alt={`${latest.title} — article cover`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </span>
            <span className="p-5 block">
              <span className="block font-semibold mb-2 group-hover:text-primary transition-colors">
                {latest.title}
              </span>
              <span className="block text-sm text-muted-foreground mb-3">
                {latest.excerpt}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read it <ArrowUpRight className="w-4 h-4" />
              </span>
            </span>
          </Link>
        </section>

        <p className="text-sm text-muted-foreground">
          Inspired by Derek Sivers'{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            /now page
          </a>{" "}
          convention.
        </p>
      </article>
    </PageShell>
  );
};

export default Now;
