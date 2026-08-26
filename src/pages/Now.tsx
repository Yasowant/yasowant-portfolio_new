import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { usePageMeta, SITE_URL, PERSON_ID } from "@/hooks/usePageMeta";
import { blogPosts } from "@/data/blogData";

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

const CURRENTLY = [
  "Leading full-stack development of a multi-tenant SaaS platform at SPM Global Technologies, serving 8+ enterprise organisations with strict per-tenant data isolation.",
  "Running Esscentra Prep in production at prep.esscentra.in — an AI interview and exam preparation planner built and deployed end-to-end.",
  "Maintaining SmaartQR, an emergency-response platform with 50,000+ registered users.",
];

const AVAILABILITY = [
  "Open to remote freelance and contract work worldwide — India, the UK, the US, Europe, Canada, Australia, the UAE and Singapore.",
  "Working hours are IST (UTC+5:30), overlapping with UK and European hours and with US mornings.",
  "Enquiries go to yasowant1998@gmail.com and usually get a reply within a day.",
];

const LEARNING = [
  "Event-driven architecture with Apache Kafka — consumer groups, partitioning and rebalance behaviour under real load.",
  "Access control models beyond RBAC: ABAC, PBAC and ReBAC for multi-tenant systems.",
  "Answer-engine optimisation: structured data, extractable content and how retrieval systems actually pick sources.",
];

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

  const Section = ({ heading, items }: { heading: string; items: string[] }) => (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-5">{heading}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="p-5 rounded-xl bg-card border border-border text-foreground/85 leading-relaxed"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <PageShell crumbs={[{ label: "Home", to: "/" }, { label: "Now" }]}>
      <article className="max-w-3xl">
        <header className="mb-12">
          <p className="text-sm font-mono text-primary mb-3">
            Updated <time dateTime={NOW_UPDATED}>{formatted}</time>
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="gradient-text">What I'm working on now</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Yasowant Nayak is a Full Stack Software Engineer in Bangalore,
            India, currently leading development of a multi-tenant SaaS platform
            at SPM Global Technologies while running Esscentra Prep in
            production. Yasowant Nayak is available for remote freelance and
            contract work with clients in India, the UK, the US and Europe.
          </p>
        </header>

        <Section heading="Building" items={CURRENTLY} />
        <Section heading="Availability" items={AVAILABILITY} />
        <Section heading="Learning" items={LEARNING} />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-5">Latest article</h2>
          <Link
            to={`/blog/${latest.slug}`}
            className="group block p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              {latest.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">{latest.excerpt}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Read it <ArrowUpRight className="w-4 h-4" />
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
