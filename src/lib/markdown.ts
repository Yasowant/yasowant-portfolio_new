/**
 * Small, dependency-free Markdown → HTML renderer for blog content.
 *
 * Deliberately pure (no DOM access) so it runs identically in the browser and
 * during the build-time prerender pass, which is what puts article text in the
 * HTML that crawlers and AI answer engines read.
 *
 * Supports: ATX headings, paragraphs, fenced code blocks, inline code, bold,
 * italic, links, unordered and ordered lists, blockquotes, tables and rules.
 */

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Slug used for heading anchors, so long articles get linkable sections. */
export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Inline formatting. Runs on already-escaped text. */
const inline = (s: string): string =>
  s
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      (_m, text, href) =>
        `<a href="${href}"${
          href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""
        }>${text}</a>`
    );

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface RenderedMarkdown {
  html: string;
  headings: Heading[];
}

export function renderMarkdown(src: string): RenderedMarkdown {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  const headings: Heading[] = [];

  let i = 0;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(`<p>${inline(escapeHtml(paragraph.join(" ")))}</p>`);
    paragraph = [];
  };

  while (i < lines.length) {
    const line = lines[i];

    // --- fenced code block -------------------------------------------------
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      flushParagraph();
      const lang = fence[1] || "";
      const body: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) body.push(lines[i++]);
      i++; // closing fence
      out.push(
        `<pre><code${lang ? ` class="language-${lang}"` : ""}>${escapeHtml(
          body.join("\n")
        )}</code></pre>`
      );
      continue;
    }

    // --- heading -----------------------------------------------------------
    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      headings.push({ id, text, level });
      out.push(`<h${level} id="${id}">${inline(escapeHtml(text))}</h${level}>`);
      i++;
      continue;
    }

    // --- horizontal rule ---------------------------------------------------
    if (/^(-{3,}|\*{3,})\s*$/.test(line)) {
      flushParagraph();
      out.push("<hr />");
      i++;
      continue;
    }

    // --- table -------------------------------------------------------------
    if (/^\|.*\|\s*$/.test(line) && /^\|[\s:|-]+\|\s*$/.test(lines[i + 1] ?? "")) {
      flushParagraph();
      const cells = (row: string) =>
        row
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());
      const head = cells(line);
      i += 2;
      const body: string[][] = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) body.push(cells(lines[i++]));
      out.push(
        `<div class="table-scroll"><table><thead><tr>${head
          .map((c) => `<th>${inline(escapeHtml(c))}</th>`)
          .join("")}</tr></thead><tbody>${body
          .map(
            (row) =>
              `<tr>${row.map((c) => `<td>${inline(escapeHtml(c))}</td>`).join("")}</tr>`
          )
          .join("")}</tbody></table></div>`
      );
      continue;
    }

    // --- blockquote --------------------------------------------------------
    if (/^>\s?/.test(line)) {
      flushParagraph();
      const body: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) body.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<blockquote><p>${inline(escapeHtml(body.join(" ")))}</p></blockquote>`);
      continue;
    }

    // --- lists -------------------------------------------------------------
    const bullet = /^[-*]\s+(.*)$/;
    const numbered = /^\d+\.\s+(.*)$/;
    if (bullet.test(line) || numbered.test(line)) {
      flushParagraph();
      const ordered = numbered.test(line);
      const pattern = ordered ? numbered : bullet;
      const items: string[] = [];
      while (i < lines.length && pattern.test(lines[i])) {
        items.push(lines[i].match(pattern)![1]);
        i++;
        // allow a wrapped continuation line inside one item
        while (i < lines.length && /^\s{2,}\S/.test(lines[i])) {
          items[items.length - 1] += " " + lines[i].trim();
          i++;
        }
      }
      const tag = ordered ? "ol" : "ul";
      out.push(
        `<${tag}>${items.map((t) => `<li>${inline(escapeHtml(t))}</li>`).join("")}</${tag}>`
      );
      continue;
    }

    // --- blank line / paragraph text --------------------------------------
    if (!line.trim()) {
      flushParagraph();
      i++;
      continue;
    }

    paragraph.push(line.trim());
    i++;
  }

  flushParagraph();
  return { html: out.join("\n"), headings };
}
