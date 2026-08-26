/**
 * IndexNow ping.
 *
 * Tells Bing (and therefore Copilot) and Yandex that URLs changed, usually
 * within minutes instead of waiting for a crawl. Google does not participate
 *
 * Setup, once:
 *   1. Invent a key: 32 hex characters, e.g. `openssl rand -hex 16`.
 *   2. Save it as public/<key>.txt containing exactly that key as its content.
 *   3. Export it before running:  export INDEXNOW_KEY=<key>
 *
 * Usage:
 *   npm run indexnow            # every URL in dist/sitemap.xml
 *   npm run indexnow -- /blog   # just these paths
 *
 * Run it AFTER the deploy is live — the endpoint verifies the key file over
 * HTTP, and submitting a URL that 404s wastes the submission.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = "https://www.yasowantdev.info";
const HOST = new URL(SITE).host;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.error(
    "INDEXNOW_KEY is not set.\n" +
      "  1. openssl rand -hex 16\n" +
      "  2. save it as public/<key>.txt with the key as the file's only content\n" +
      "  3. export INDEXNOW_KEY=<key> && npm run indexnow"
  );
  process.exit(1);
}

const explicit = process.argv.slice(2).filter((a) => !a.startsWith("-"));

const fromSitemap = () => {
  const file = path.resolve(__dirname, "..", "dist", "sitemap.xml");
  if (!fs.existsSync(file)) {
    console.error("dist/sitemap.xml not found — run `npm run build` first.");
    process.exit(1);
  }
  return [...fs.readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
};

const urlList = explicit.length
  ? explicit.map((p) => (p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? p : `/${p}`}`))
  : fromSitemap();

if (!urlList.length) {
  console.error("Nothing to submit.");
  process.exit(1);
}

const body = {
  host: HOST,
  key,
  keyLocation: `${SITE}/${key}.txt`,
  urlList,
};

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

if (res.ok || res.status === 202) {
  console.log(`Submitted ${urlList.length} URLs to IndexNow (HTTP ${res.status}).`);
  urlList.forEach((u) => console.log(`  - ${u}`));
} else {
  console.error(`IndexNow rejected the submission: HTTP ${res.status}`);
  console.error(await res.text());
  console.error(
    `\nMost common cause: ${SITE}/${key}.txt is not reachable, or its contents do not match the key exactly.`
  );
  process.exit(1);
}
