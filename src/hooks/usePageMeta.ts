import { useEffect } from "react";

/**
 * Client-side head management for routed pages.
 *
 * The crawler-facing copy of every route is written at build time by
 * scripts/prerender.mjs — this hook exists so that *in-app* navigation (where
 * no document is re-fetched) still leaves the tab title, meta description,
 * canonical and JSON-LD correct for the route the visitor is actually on.
 *
 * Everything it changes is reverted on unmount so routes cannot leak metadata
 * into each other.
 */

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: "website" | "article" | "profile";
  /** Schema.org objects injected as <script type="application/ld+json">. */
  jsonLd?: Record<string, unknown>[];
  /** Set for pages that should stay out of the index. */
  noindex?: boolean;
}

const LD_ATTR = "data-page-ld";

export function usePageMeta({
  title,
  description,
  canonical,
  image,
  type = "website",
  jsonLd,
  noindex = false,
}: PageMeta) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousTitle = document.title;
    document.title = title;

    // Remember what we overwrite so unmount can put it back verbatim.
    const restore: Array<() => void> = [];

    const setMeta = (attr: "name" | "property", key: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (el) {
        const previous = el.getAttribute("content");
        restore.push(() => {
          if (previous === null) el!.removeAttribute("content");
          else el!.setAttribute("content", previous);
        });
      } else {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        const created = el;
        restore.push(() => created.remove());
      }
      el.setAttribute("content", value);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:type", type);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (image) {
      setMeta("property", "og:image", image);
      setMeta("name", "twitter:image", image);
    }
    if (noindex) setMeta("name", "robots", "noindex, follow");

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) {
      const previousHref = canonicalEl.getAttribute("href");
      canonicalEl.setAttribute("href", canonical);
      restore.push(() => {
        if (previousHref) canonicalEl.setAttribute("href", previousHref);
      });
    }

    // Replace any JSON-LD this hook previously added, never the build-time blocks.
    document.querySelectorAll(`script[${LD_ATTR}]`).forEach((n) => n.remove());
    (jsonLd ?? []).forEach((obj) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(LD_ATTR, "");
      script.text = JSON.stringify(obj);
      document.head.appendChild(script);
    });

    return () => {
      document.title = previousTitle;
      restore.reverse().forEach((fn) => fn());
      document.querySelectorAll(`script[${LD_ATTR}]`).forEach((n) => n.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonical, image, type, noindex, JSON.stringify(jsonLd ?? [])]);
}

export const SITE_URL = "https://www.yasowantdev.info";
export const PERSON_ID = `${SITE_URL}/#person`;
