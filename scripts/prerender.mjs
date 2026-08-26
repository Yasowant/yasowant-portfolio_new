/**
 * Build-time prerender + SEO/GEO asset generation.
 *
 * Renders every route to real HTML so Googlebot's first pass and AI crawlers
 * (GPTBot, ClaudeBot, PerplexityBot, Google-Extended — none of which run
 * JavaScript) see complete content, then writes sitemap.xml, llms.txt and
 * llms-full.txt.
 *
 * Every route in src/AppShell.tsx must appear in the route table below. A
 * route that is only client-rendered is invisible to all of the above.
 *
 * Run automatically by `npm run build`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const ssrEntry = pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href;

const SITE = "https://www.yasowantdev.info";
const NAME = "Yasowant Nayak";
const OG = `${SITE}/og-image.png`;
const PERSON = `${SITE}/#person`;
const TODAY = new Date().toISOString().slice(0, 10);

const { render, blogPosts, faqs, projects, hireServices } = await import(ssrEntry);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const crumbs = (...pairs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: pairs.map(([name, item], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item,
  })),
});

const faqPage = (id, list) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": id,
  mainEntity: list.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

const absolute = (src) => (src.startsWith("http") ? src : `${SITE}${src}`);

/* ------------------------------------------------------------------ *
 * Route table
 * ------------------------------------------------------------------ */
const homeRoute = {
  url: "/",
  file: "index.html",
  lastmod: TODAY,
  priority: "1.0",
  changefreq: "weekly",
  // Home keeps the title/meta already in index.html — nothing to override.
  head: null,
};

const blogIndexRoute = {
  url: "/blog",
  file: path.join("blog", "index.html"),
  lastmod: blogPosts.map((p) => p.date).sort().reverse()[0] ?? TODAY,
  priority: "0.9",
  changefreq: "weekly",
  head: {
    title: `Engineering Articles | ${NAME}`,
    description:
      "Technical writing by Yasowant Nayak on backend architecture, access control, event streaming with Apache Kafka, and frontend patterns — written from production experience building SaaS on React, Node.js and TypeScript.",
    canonical: `${SITE}/blog`,
    ogType: "website",
    keywords: "backend architecture, system design, React, Node.js, TypeScript, Apache Kafka",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${SITE}/blog#blog`,
        name: `Engineering articles by ${NAME}`,
        url: `${SITE}/blog`,
        inLanguage: "en",
        author: { "@id": PERSON },
        publisher: { "@id": PERSON },
        blogPost: blogPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `${SITE}/blog/${post.slug}`,
          datePublished: post.date,
          keywords: post.tags.join(", "),
        })),
      },
      crumbs(["Home", `${SITE}/`], ["Articles", `${SITE}/blog`]),
    ],
  },
};

const blogRoutes = blogPosts.map((post) => {
  const url = `${SITE}/blog/${post.slug}`;
  return {
    url: `/blog/${post.slug}`,
    file: path.join("blog", post.slug, "index.html"),
    lastmod: post.date,
    priority: "0.8",
    changefreq: "monthly",
    head: {
      title: `${post.title} | ${NAME}`,
      description: post.excerpt,
      canonical: url,
      image: post.image,
      ogType: "article",
      keywords: post.tags.join(", "),
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          name: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          dateModified: post.date,
          articleSection: post.category,
          keywords: post.tags.join(", "),
          wordCount: post.content.split(/\s+/).filter(Boolean).length,
          inLanguage: "en",
          author: { "@id": PERSON },
          publisher: { "@id": PERSON },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          ...(post.externalUrl ? { isBasedOn: post.externalUrl } : {}),
        },
        crumbs(["Home", `${SITE}/`], ["Articles", `${SITE}/blog`], [post.title, url]),
      ],
    },
  };
});

const projectsIndexRoute = {
  url: "/projects",
  file: path.join("projects", "index.html"),
  lastmod: TODAY,
  priority: "0.9",
  changefreq: "monthly",
  head: {
    title: `Projects & Case Studies | ${NAME}`,
    description:
      "Production software built by Yasowant Nayak: an AI study planner, a multi-tenant survey SaaS, an emergency-response platform and a hotel booking system — built with React, TypeScript, Node.js, MongoDB and PostgreSQL.",
    canonical: `${SITE}/projects`,
    ogType: "website",
    keywords: projects.flatMap((p) => p.tech).join(", "),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${SITE}/projects#collection`,
        name: `Projects & Case Studies | ${NAME}`,
        url: `${SITE}/projects`,
        inLanguage: "en",
        about: { "@id": PERSON },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.shortName,
            url: `${SITE}/projects/${p.slug}`,
          })),
        },
      },
      crumbs(["Home", `${SITE}/`], ["Projects", `${SITE}/projects`]),
    ],
  },
};

const projectRoutes = projects.map((project) => {
  const url = `${SITE}/projects/${project.slug}`;
  return {
    url: `/projects/${project.slug}`,
    file: path.join("projects", project.slug, "index.html"),
    lastmod: TODAY,
    priority: "0.8",
    changefreq: "monthly",
    head: {
      title: `${project.shortName} — ${project.tagline} | ${NAME}`,
      description: project.answer,
      canonical: url,
      image: absolute(project.image),
      ogType: "website",
      keywords: project.tech.join(", "),
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "@id": `${url}#app`,
          name: project.shortName,
          alternateName: project.title,
          description: project.answer,
          applicationCategory: "WebApplication",
          operatingSystem: "Web browser",
          url,
          sameAs: project.demo,
          screenshot: absolute(project.image),
          creator: { "@id": PERSON },
          author: { "@id": PERSON },
          runtimePlatform: project.tech,
          featureList: project.features,
          inLanguage: "en",
        },
        faqPage(`${url}#faq`, project.faqs),
        crumbs(
          ["Home", `${SITE}/`],
          ["Projects", `${SITE}/projects`],
          [project.shortName, url]
        ),
      ],
    },
  };
});

const hireRoutes = hireServices.map((service) => {
  const url = `${SITE}/hire/${service.slug}`;
  return {
    url: `/hire/${service.slug}`,
    file: path.join("hire", service.slug, "index.html"),
    lastmod: TODAY,
    priority: "0.9",
    changefreq: "monthly",
    head: {
      title: service.title,
      description: service.metaDescription,
      canonical: url,
      ogType: "profile",
      keywords: service.stack.join(", "),
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name: service.heading,
          description: service.answer,
          url,
          serviceType: service.heading,
          provider: { "@id": PERSON },
          areaServed: [
            "India",
            "United Kingdom",
            "United States",
            "Europe",
            "Canada",
            "Australia",
            "United Arab Emirates",
            "Singapore",
          ].map((name) => ({ "@type": "Country", name })),
          availableLanguage: ["English", "Hindi"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.heading} — what is included`,
            itemListElement: service.whatYouGet.map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item },
            })),
          },
        },
        faqPage(`${url}#faq`, service.faqs),
        crumbs(["Home", `${SITE}/`], ["Hire", `${SITE}/#freelance`], [service.heading, url]),
      ],
    },
  };
});

const nowRoute = {
  url: "/now",
  file: path.join("now", "index.html"),
  lastmod: TODAY,
  priority: "0.6",
  changefreq: "monthly",
  head: {
    title: `What ${NAME} Is Working On Now`,
    description:
      "A dated status page: what Yasowant Nayak is building this month, what he is learning, and whether he has capacity for new freelance or contract work.",
    canonical: `${SITE}/now`,
    ogType: "profile",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE}/now#page`,
        name: `What ${NAME} Is Working On Now`,
        url: `${SITE}/now`,
        dateModified: TODAY,
        inLanguage: "en",
        about: { "@id": PERSON },
        mainEntity: { "@id": PERSON },
      },
      crumbs(["Home", `${SITE}/`], ["Now", `${SITE}/now`]),
    ],
  },
};

/**
 * 404.html is served by Vercel for any path that does not resolve to a
 * prerendered file, with a real 404 status. Excluded from the sitemap and
 * marked noindex so it never competes with a live URL.
 */
const notFoundRoute = {
  url: "/404",
  file: "404.html",
  sitemap: false,
  head: {
    title: `Page not found | ${NAME}`,
    description:
      "That page does not exist. Browse the projects, articles and freelance services of Yasowant Nayak, Full Stack Software Engineer.",
    canonical: `${SITE}/404`,
    ogType: "website",
    noindex: true,
    jsonLd: [],
  },
};

const routes = [
  homeRoute,
  blogIndexRoute,
  ...blogRoutes,
  projectsIndexRoute,
  ...projectRoutes,
  ...hireRoutes,
  nowRoute,
  notFoundRoute,
];

/* ------------------------------------------------------------------ *
 * Head rewriting
 * ------------------------------------------------------------------ */
function applyHead(html, head) {
  if (!head) return html;
  let out = html;

  const swapTag = (re, replacement) => {
    out = re.test(out) ? out.replace(re, replacement) : out;
  };

  swapTag(/<title>[\s\S]*?<\/title>/, `<title>${esc(head.title)}</title>`);
  swapTag(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${esc(head.description)}" />`
  );
  if (head.keywords) {
    swapTag(
      /<meta\s+name="keywords"[\s\S]*?\/>/,
      `<meta name="keywords" content="${esc(head.keywords)}" />`
    );
  }
  swapTag(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${esc(head.canonical)}" />`
  );

  const metaProp = (prop, value) => {
    const re = new RegExp(`<meta property="${prop}"[^>]*>`);
    const tag = `<meta property="${prop}" content="${esc(value)}" />`;
    out = re.test(out) ? out.replace(re, tag) : out.replace("</head>", `    ${tag}\n  </head>`);
  };
  const metaName = (name, value) => {
    const re = new RegExp(`<meta name="${name}"[\\s\\S]*?>`);
    const tag = `<meta name="${name}" content="${esc(value)}" />`;
    out = re.test(out) ? out.replace(re, tag) : out.replace("</head>", `    ${tag}\n  </head>`);
  };

  metaProp("og:title", head.title);
  metaProp("og:description", head.description);
  metaProp("og:url", head.canonical);
  metaProp("og:type", head.ogType || "website");
  metaProp("og:image", head.image || OG);
  metaName("twitter:title", head.title);
  metaName("twitter:description", head.description);
  metaName("twitter:image", head.image || OG);
  if (head.noindex) metaName("robots", "noindex, follow");

  // Drop the homepage-only hreflang cluster and service/offer schema from
  // sub-pages so each URL declares exactly one canonical identity.
  out = out.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>/g, "");
  out = out.replace(
    /\s*<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "ProfessionalService"[\s\S]*?<\/script>/,
    ""
  );

  if (head.jsonLd?.length) {
    const blocks = head.jsonLd
      .map((o) => `    <script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n    </script>`)
      .join("\n");
    out = out.replace("</head>", `${blocks}\n  </head>`);
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Home-only structured data: FAQPage (answer-engine fodder) + ProfilePage
 * ------------------------------------------------------------------ */
function homeJsonLd() {
  const graph = [
    faqPage(`${SITE}/#faq`, faqs),
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${SITE}/#profilepage`,
      url: `${SITE}/`,
      name: `${NAME} — Full Stack Software Engineer`,
      dateModified: TODAY,
      mainEntity: { "@id": PERSON },
      about: { "@id": PERSON },
      inLanguage: "en",
    },
    crumbs(["Home", `${SITE}/`]),
  ];
  return graph
    .map((o) => `    <script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n    </script>`)
    .join("\n");
}

/* ------------------------------------------------------------------ *
 * Render
 * ------------------------------------------------------------------ */
let rendered = 0;
for (const route of routes) {
  let appHtml = "";
  try {
    appHtml = render(route.url);
  } catch (err) {
    console.error(`  x prerender failed for ${route.url}:`, err.message);
    throw err;
  }

  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  html = applyHead(html, route.head);
  html = html.replace("<!--PRERENDER_JSONLD-->", route.url === "/" ? homeJsonLd() : "");

  const outFile = path.join(dist, route.file);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  const kb = (Buffer.byteLength(appHtml) / 1024).toFixed(1);
  console.log(`  + ${route.url.padEnd(46)} ${kb.padStart(6)} KB of crawlable HTML`);
  rendered++;
}

/* ------------------------------------------------------------------ *
 * sitemap.xml
 * ------------------------------------------------------------------ */
const indexable = routes.filter((r) => r.sitemap !== false);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable
  .map((r) => {
    const loc = r.url === "/" ? `${SITE}/` : `${SITE}${r.url}`;
    const alt =
      r.url === "/"
        ? ["en", "en-GB", "en-US", "en-IN", "x-default"]
            .map((h) => `\n    <xhtml:link rel="alternate" hreflang="${h}" href="${SITE}/" />`)
            .join("")
        : "";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>${alt}
  </url>`;
  })
  .join("\n")}
  <url>
    <loc>${SITE}/resume.pdf</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
console.log(`\n  + sitemap.xml (${indexable.length + 1} URLs)`);

/* ------------------------------------------------------------------ *
 * llms.txt / llms-full.txt  (GEO — answer-engine ingestion)
 * ------------------------------------------------------------------ */
const llms = `# ${NAME}

> Full Stack Software Engineer and freelance web developer based in Bangalore,
> India, working remotely with clients in India, the United Kingdom, the United
> States and Europe. Builds production SaaS products with React, Next.js,
> TypeScript, Node.js, MongoDB, PostgreSQL and AWS.

Canonical site: ${SITE}/
Last updated: ${TODAY}

## Identity

- Full name: ${NAME}
- Role: Full Stack Software Engineer (React + Node.js)
- Also works as: freelance full stack developer, available for contract work
- Location: Bangalore, Karnataka, India — works remotely worldwide
- Experience: 3+ years shipping production software
- Contact: yasowant1998@gmail.com
- Portfolio: ${SITE}/
- Currently: ${SITE}/now
- GitHub: https://github.com/Yasowant
- LinkedIn: https://www.linkedin.com/in/yasowant-nayak
- X (Twitter): https://x.com/Yasowant
- Medium: https://medium.com/@yasowant1998
- Resume (PDF): ${SITE}/resume.pdf

## Core stack

React, Next.js, TypeScript, JavaScript, Node.js, Express, MongoDB, PostgreSQL,
REST APIs, GraphQL, AWS, Docker, CI/CD, Tailwind CSS, system design.

## Projects

${projects
  .map((p) => `- [${p.shortName}](${SITE}/projects/${p.slug}) — ${p.tagline} (${p.status}, ${p.demoLabel})`)
  .join("\n")}

## Freelance services

${hireServices.map((s) => `- [${s.heading}](${SITE}/hire/${s.slug}) — ${s.tagline}`).join("\n")}

Also available: cloud/DevOps and CI/CD, technical consultation. Pricing is
quoted in the client's local currency (INR, GBP, USD, EUR, AUD, CAD, AED, SGD).

## Articles

${blogPosts.map((p) => `- [${p.title}](${SITE}/blog/${p.slug}) — ${p.excerpt}`).join("\n")}

Article index: ${SITE}/blog

## Full detail

- [Extended profile](${SITE}/llms-full.txt)
`;
fs.writeFileSync(path.join(dist, "llms.txt"), llms);

const llmsFull = `${llms}
## Frequently asked questions

${faqs.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}

## Project detail

${projects
  .map(
    (p) => `### ${p.shortName}
URL: ${SITE}/projects/${p.slug}
Live: ${p.demo} · Status: ${p.status} · Category: ${p.category}
Stack: ${p.tech.join(", ")}

${p.answer}

${p.description}

Capabilities:
${p.features.map((f) => `- ${f}`).join("\n")}

${p.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")}
`
  )
  .join("\n---\n\n")}

## Service detail

${hireServices
  .map(
    (s) => `### ${s.heading}
URL: ${SITE}/hire/${s.slug}
Stack: ${s.stack.join(", ")}

${s.answer}

What is included:
${s.whatYouGet.map((w) => `- ${w}`).join("\n")}

Good fit when:
${s.goodFit.map((g) => `- ${g}`).join("\n")}

${s.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")}
`
  )
  .join("\n---\n\n")}

## Article contents

${blogPosts
  .map(
    (p) => `### ${p.title}
URL: ${SITE}/blog/${p.slug}
Published: ${p.date} · Category: ${p.category} · Tags: ${p.tags.join(", ")}
${p.externalUrl ? `Original: ${p.externalUrl}\n` : ""}${p.content.trim()}
`
  )
  .join("\n---\n\n")}
`;
fs.writeFileSync(path.join(dist, "llms-full.txt"), llmsFull);
console.log("  + llms.txt + llms-full.txt");

console.log(`\nPrerendered ${rendered} routes with crawlable HTML.\n`);
