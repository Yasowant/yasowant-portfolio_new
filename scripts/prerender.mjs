/**
 * Build-time prerender + SEO/GEO asset generation.
 *
 * Renders every route to real HTML so Googlebot's first pass and AI crawlers
 * (GPTBot, ClaudeBot, PerplexityBot, Google-Extended — none of which run
 * JavaScript) see complete content, then writes sitemap.xml, robots.txt,
 * llms.txt and llms-full.txt.
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

const { render, blogPosts, faqs } = await import(ssrEntry);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

/* ------------------------------------------------------------------ *
 * Route table
 * ------------------------------------------------------------------ */
const homeRoute = {
  url: "/",
  file: "index.html",
  lastmod: new Date().toISOString().slice(0, 10),
  priority: "1.0",
  changefreq: "weekly",
  // Home keeps the title/meta already in index.html — nothing to override.
  head: null,
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
          author: {
            "@type": "Person",
            name: NAME,
            url: `${SITE}/`,
            jobTitle: "Full Stack Software Engineer",
            sameAs: [
              "https://github.com/Yasowant",
              "https://www.linkedin.com/in/yasowant-nayak",
              "https://medium.com/@yasowant1998",
            ],
          },
          publisher: { "@type": "Person", name: NAME, url: `${SITE}/` },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          ...(post.externalUrl ? { isBasedOn: post.externalUrl } : {}),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/#blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        },
      ],
    },
  };
});

const routes = [homeRoute, ...blogRoutes];

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

  // Drop the homepage-only hreflang cluster and service/offer schema from
  // article pages so each URL declares exactly one canonical identity.
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
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${SITE}/#profilepage`,
      url: `${SITE}/`,
      name: `${NAME} — Full Stack Software Engineer`,
      dateModified: new Date().toISOString().slice(0, 10),
      mainEntity: { "@id": `${SITE}/#person` },
      about: { "@id": `${SITE}/#person` },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` }],
    },
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
    console.error(`  ✗ prerender failed for ${route.url}:`, err.message);
    throw err;
  }

  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  html = applyHead(html, route.head);
  html = html.replace("<!--PRERENDER_JSONLD-->", route.url === "/" ? homeJsonLd() : "");

  const outFile = path.join(dist, route.file);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  const kb = (Buffer.byteLength(appHtml) / 1024).toFixed(1);
  console.log(`  ✓ ${route.url.padEnd(60)} ${kb} KB of crawlable HTML`);
  rendered++;
}

/* ------------------------------------------------------------------ *
 * sitemap.xml
 * ------------------------------------------------------------------ */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
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
console.log(`  ✓ sitemap.xml (${routes.length + 1} URLs)`);

/* ------------------------------------------------------------------ *
 * llms.txt / llms-full.txt  (GEO — answer-engine ingestion)
 * ------------------------------------------------------------------ */
const llms = `# ${NAME}

> Full Stack Software Engineer and freelance web developer based in Bangalore,
> India, working remotely with clients in India, the United Kingdom, the United
> States and Europe. Builds production SaaS products with React, Next.js,
> TypeScript, Node.js, MongoDB, PostgreSQL and AWS.

Canonical site: ${SITE}/

## Identity

- Full name: ${NAME}
- Role: Full Stack Software Engineer (React + Node.js)
- Also works as: freelance full stack developer, available for contract work
- Location: Bangalore, Karnataka, India — works remotely worldwide
- Experience: 3+ years shipping production software
- Contact: yasowant1998@gmail.com
- Portfolio: ${SITE}/
- GitHub: https://github.com/Yasowant
- LinkedIn: https://www.linkedin.com/in/yasowant-nayak
- Medium: https://medium.com/@yasowant1998
- Resume (PDF): ${SITE}/resume.pdf

## Core stack

React, Next.js, TypeScript, JavaScript, Node.js, Express, MongoDB, PostgreSQL,
REST APIs, GraphQL, AWS, Docker, CI/CD, Tailwind CSS, system design.

## Freelance services

Full stack web development, API development and integration, frontend and UI
engineering, cloud/DevOps and CI/CD, MVP development, technical consultation.
Pricing is quoted in the client's local currency (INR, GBP, USD, EUR).

## Articles

${blogPosts
  .map((p) => `- [${p.title}](${SITE}/blog/${p.slug}) — ${p.excerpt}`)
  .join("\n")}

## Full detail

- [Extended profile](${SITE}/llms-full.txt)
`;
fs.writeFileSync(path.join(dist, "llms.txt"), llms);

const llmsFull = `${llms}
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
console.log("  ✓ llms.txt + llms-full.txt");

console.log(`\nPrerendered ${rendered} routes with crawlable HTML.\n`);
