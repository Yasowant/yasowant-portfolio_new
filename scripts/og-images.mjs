/**
 * Generates a branded 1200×630 social-share image for every blog post and for
 * every project that has no real screenshot, into public/og/.
 * scripts/prerender.mjs picks these up automatically for og:image.
 *
 * Usage (needs a Chromium — run once: `npm i -D playwright && npx playwright install chromium`):
 *   npm run og
 *
 * Optional env:
 *   CHROMIUM_PATH  – use an existing Chrome/Chromium binary
 *   OG_FONT_CSS    – @font-face CSS to use instead of Google Fonts (offline builds)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const ssrEntry = pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href;
const { blogPosts, projects } = await import(ssrEntry);

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  ({ chromium } = await import("playwright-core"));
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const mark = fs.readFileSync(path.join(root, "public", "favicon.svg"), "utf8");
const markUri = `data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`;

const fontCss =
  process.env.OG_FONT_CSS ||
  `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Space+Grotesk:wght@700&display=block');`;

const page = ({ kicker, title, meta, tags }) => `<!doctype html><html><head><meta charset="utf-8"><style>
${fontCss}
*{box-sizing:border-box}
body{margin:0;width:1200px;height:630px;background:#0b0f15;color:#e6edf3;font-family:'Space Grotesk',system-ui,sans-serif;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:48px 48px}
.g1{position:absolute;width:640px;height:640px;border-radius:50%;background:radial-gradient(circle,#388bfd4d,transparent 65%);right:-180px;top:-240px}
.g2{position:absolute;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,#3fb95033,transparent 65%);left:-200px;bottom:-300px}
.bar{position:absolute;left:0;right:0;bottom:0;height:6px;background:linear-gradient(90deg,#388bfd,#3fb950)}
.wrap{position:absolute;inset:72px 84px 70px;display:flex;flex-direction:column}
.top{display:flex;align-items:center;gap:16px}
.wm{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:30px;letter-spacing:-.5px}
.grad{background:linear-gradient(90deg,#388bfd,#3fb950);-webkit-background-clip:text;color:transparent}
.kicker{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:20px;color:#3fb950;border:1px solid #3fb95055;background:#3fb9501a;padding:8px 16px;border-radius:999px}
h1{font-size:${"${size}"}px;line-height:1.08;letter-spacing:-2px;margin:auto 0 22px;font-weight:700;max-width:1000px}
.meta{font-family:'JetBrains Mono',monospace;font-size:22px;color:#8b98a5;display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.tag{color:#9fb3c8;background:#ffffff0d;border:1px solid #ffffff1a;border-radius:8px;padding:4px 12px;font-size:19px}
</style></head><body><div class="grid"></div><div class="g1"></div><div class="g2"></div>
<div class="wrap"><div class="top"><img src="${markUri}" width="56" height="56"><span class="wm">Yasowant<span class="grad">.dev</span></span><span class="kicker">${esc(kicker)}</span></div>
<h1>${esc(title)}</h1>
<div class="meta"><span>${esc(meta)}</span>${tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div></div>
<div class="bar"></div></body></html>`;

const fit = (title) => (title.length > 70 ? 54 : title.length > 45 ? 62 : 72);

const jobs = [
  ...blogPosts.map((p) => ({
    out: path.join(root, "public", "og", "blog", `${p.slug}.png`),
    html: page({ kicker: `› blog · ${p.category}`, title: p.title, meta: `${p.readTime} · ${p.date}`, tags: p.tags.slice(0, 3) }).replace("${size}", fit(p.title)),
  })),
  ...projects
    .filter((p) => !p.image)
    .map((p) => ({
      out: path.join(root, "public", "og", "projects", `${p.slug}.png`),
      html: page({ kicker: `› case study`, title: `${p.shortName} — ${p.tagline}`, meta: p.demoLabel, tags: p.tech.slice(0, 3) }).replace("${size}", fit(`${p.shortName} — ${p.tagline}`)),
    })),
];

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const job of jobs) {
  fs.mkdirSync(path.dirname(job.out), { recursive: true });
  await tab.setContent(job.html, { waitUntil: "networkidle" });
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: job.out });
  console.log("  + " + path.relative(root, job.out));
}
await browser.close();
console.log(`\nGenerated ${jobs.length} share images.`);
