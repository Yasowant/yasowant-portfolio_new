/**
 * IndexNow ping.
 *
 * Tells Bing (and therefore Copilot) and Yandex that URLs changed, usually
 * within minutes instead of waiting for a crawl. Google does not participate
 *
 * The key already exists: public/<key>.txt, where the filename (minus .txt) is
 * the key and the file's only content is that same key. The script finds it
 * automatically, so no environment variable is needed. Set INDEXNOW_KEY to
 * override it.
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

/**
 * The key file in public/ is the source of truth: its name is the key, and it
 * is what the IndexNow endpoint fetches to verify the submission. Reading it
 * here means the two can never drift apart.
 */
function findKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY;
  const pub = path.resolve(__dirname, "..", "public");
  const match = fs
    .readdirSync(pub)
    .find((f) => /^[0-9a-f]{8,128}\.txt$/i.test(f));
  if (!match) return null;
  const fromName = match.replace(/\.txt$/i, "");
  const fromBody = fs.readFileSync(path.join(pub, match), "utf8").trim();
  if (fromName !== fromBody) {
    console.error(
      `public/${match} does not contain its own filename as its content.\n` +
        `  filename says: ${fromName}\n` +
        `  contents say:  ${fromBody}\n` +
        "IndexNow verifies by fetching that file, so the two must match exactly."
    );
    process.exit(1);
  }
  return fromName;
}

const key = findKey();
if (!key) {
  console.error(
    "No IndexNow key found.\n" +
      "  1. node -e \"console.log(require('crypto').randomBytes(16).toString('hex'))\"\n" +
      "  2. save it as public/<key>.txt with the key as the file's only content\n" +
      "  3. npm run indexnow"
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
