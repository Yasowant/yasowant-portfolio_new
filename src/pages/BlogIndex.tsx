import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { blogPosts, mediumProfileUrl } from "@/data/blogData";
import PageShell from "@/components/PageShell";
import { usePageMeta, SITE_URL, PERSON_ID } from "@/hooks/usePageMeta";

const TITLE = "Engineering Articles | Yasowant Nayak";
const DESCRIPTION =
  "Technical writing by Yasowant Nayak on backend architecture, access control, event streaming with Apache Kafka, and frontend patterns — written from production experience building SaaS on React, Node.js and TypeScript.";
const CANONICAL = `${SITE_URL}/blog`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const BlogIndex = () => {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    canonical: CANONICAL,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${CANONICAL}#blog`,
        name: "Engineering articles by Yasowant Nayak",
        description: DESCRIPTION,
        url: CANONICAL,
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        blogPost: sorted.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.date,
          keywords: post.tags.join(", "),
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Articles", item: CANONICAL },
        ],
      },
    ],
  });

  return (
    <PageShell crumbs={[{ label: "Home", to: "/" }, { label: "Articles" }]}>
      <header className="max-w-3xl mb-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-5">
          <span className="gradient-text">Engineering Articles</span>
        </h1>
        {/* Answer block: self-contained, entity named, no back-references. */}
        <p className="text-lg text-muted-foreground leading-relaxed">
          Yasowant Nayak writes about backend architecture and frontend
          engineering from production experience building multi-tenant SaaS on
          React, TypeScript and Node.js. Articles by Yasowant Nayak cover access
          control models, Apache Kafka and event streaming, and pagination
          strategies, and are also published on Medium and JavaScript in Plain
          English.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="group glass-card rounded-2xl overflow-hidden flex flex-col"
          >
            <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-44">
              <img
                src={post.image}
                alt={`${post.title} — article cover`}
                loading="lazy"
                decoding="async"
                width={600}
                height={340}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="p-6 flex flex-col flex-1">
              <span className="self-start px-3 py-1 mb-3 rounded-full bg-primary/10 text-primary text-xs font-mono">
                {post.category}
              </span>

              <h2 className="text-lg font-bold leading-snug mb-3">
                <Link
                  to={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
              >
                Read article <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-14 text-center">
        <a
          href={mediumProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border bg-background/60 font-semibold hover:border-primary/60 transition-colors"
        >
          More articles on Medium <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </PageShell>
  );
};

export default BlogIndex;
