/**
 * Article body in Markdown. Rendered by src/lib/markdown.ts both in the
 * browser and during the build-time prerender, so the full text ships in the
 * HTML that search engines and AI answer engines read.
 */
export const content = `
Pagination is one of those features that looks finished after twenty minutes and turns out to be load-bearing. It sits directly on top of your database's worst query patterns, it decides how fast your list screens feel, and on public pages it determines whether search engines can reach page 40 of your catalogue at all.

This guide covers the decision that matters most — where the pagination actually happens — then the two backend strategies, with working React and Node code for each, and the mistakes that show up once the dataset gets big.

## Why it matters more than it looks

**Performance.** Rendering 10,000 rows means transferring them, parsing them, and building 10,000 DOM nodes. On a mid-range Android phone that is a frozen tab.

**Database load.** An unbounded query is a query whose cost grows with your success. The endpoint that was fine at launch is the one that takes the site down at 100,000 records.

**Usability.** Nobody scans a list of 10,000 things. Pagination is a navigation aid before it is an optimisation.

**SEO.** For public catalogues, paginated URLs are how crawlers discover deep content. Get this wrong and most of your inventory is invisible.

## The first decision: frontend or backend?

This is the fork everything else follows from.

**Frontend pagination** fetches the whole dataset once and slices it in the browser. Page changes are instant, there is no extra network round trip, and sorting or filtering across the full set is trivial. It is the right answer when the data is genuinely small and bounded — a settings table, a user's own orders, a list of 200 countries.

**Backend pagination** asks the server for one page at a time. It is the right answer for anything that grows: the initial response stays small regardless of table size, and the database does the work it is designed for.

The failure mode is choosing frontend pagination for something that grows. It works beautifully in development with 50 seeded rows and collapses in production at 50,000. If the dataset is user-generated, assume it grows.

## Frontend pagination in React

The whole thing rests on two pieces of arithmetic: which slice to show, and how many pages exist.

\`\`\`javascript
const start = (currentPage - 1) * pageSize;
const end = start + pageSize;
const visible = items.slice(start, end);

const totalPages = Math.ceil(items.length / pageSize);
\`\`\`

**Math.ceil** rather than **Math.round** or **Math.floor** is not a detail — 101 items at 10 per page is 11 pages, not 10. Rounding down silently hides the last item, and it is the single most common pagination bug.

A reusable hook:

\`\`\`javascript
import { useMemo, useState, useEffect } from "react";

export function usePagination(items, pageSize = 10) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  // Filtering can shrink the list beneath the current page.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const visible = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return { page, setPage, totalPages, visible };
}
\`\`\`

That **useEffect** is the second most common bug. A user on page 9 types into the search box, the result set drops to 12 items, and without the clamp they are staring at an empty page with no obvious way back.

### Rendering the page buttons

Listing every page breaks the moment there are 200 of them. Show a window around the current page with ellipses:

\`\`\`javascript
function getPageRange(current, total, span = 1) {
  const pages = new Set([1, total]);
  for (let i = current - span; i <= current + span; i++) {
    if (i > 1 && i < total) pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const withGaps = [];

  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) withGaps.push("...");
    withGaps.push(p);
  });

  return withGaps;
}
\`\`\`

And the markup, with the accessibility bits that are usually skipped:

\`\`\`jsx
<nav aria-label="Pagination">
  <button onClick={() => setPage(page - 1)} disabled={page === 1}>
    Previous
  </button>

  {getPageRange(page, totalPages).map((p, i) =>
    p === "..." ? (
      <span key={"gap" + i} aria-hidden="true">...</span>
    ) : (
      <button
        key={p}
        onClick={() => setPage(p)}
        aria-current={p === page ? "page" : undefined}
      >
        {p}
      </button>
    )
  )}

  <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
    Next
  </button>
</nav>
\`\`\`

**aria-current="page"** is what tells a screen reader which page you are on. Disabling the edge buttons is what stops a user paging into an empty state.

## Backend pagination: offset and limit

The straightforward server-side approach skips a number of rows and takes the next batch.

\`\`\`sql
SELECT id, title, created_at
FROM posts
ORDER BY created_at DESC, id DESC
LIMIT 20 OFFSET 40;
\`\`\`

\`\`\`javascript
router.get("/posts", async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Post.find().sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit).lean(),
    Post.countDocuments(),
  ]);

  res.json({
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
});
\`\`\`

Three things in that snippet are doing real work. The **limit** is capped, because otherwise **?limit=1000000** is a free denial-of-service. The parsed values are validated, because **?page=-5** produces a negative skip and a database error. And the sort includes **_id** as a tiebreaker — without it, rows sharing a **createdAt** can shuffle between requests and a record appears on two pages or none.

### Where offset falls apart

**OFFSET 40** is cheap. **OFFSET 500000** is not, because the database must still walk and discard those 500,000 rows before returning anything. Deep pages get progressively slower, and the very last page is the slowest request on your site.

The second problem is drift. Between loading page 1 and clicking page 2, someone inserts a record at the top. Everything shifts down by one, and the item that was last on page 1 is now first on page 2 — the user sees it twice. On a fast-moving feed this is constant.

## Cursor pagination

Cursor — or keyset — pagination fixes both by asking "what comes after this specific record?" instead of "skip this many rows".

\`\`\`sql
SELECT id, title, created_at
FROM posts
WHERE (created_at, id) < ('2026-02-10 09:00:00', 8412)
ORDER BY created_at DESC, id DESC
LIMIT 20;
\`\`\`

\`\`\`javascript
router.get("/feed", async (req, res) => {
  const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);

  const filter = {};
  if (req.query.cursor) {
    const [createdAt, id] = Buffer.from(req.query.cursor, "base64")
      .toString()
      .split("|");
    filter.$or = [
      { createdAt: { $lt: new Date(createdAt) } },
      { createdAt: new Date(createdAt), _id: { $lt: id } },
    ];
  }

  // Fetch one extra to detect whether another page exists.
  const rows = await Post.find(filter)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit + 1)
    .lean();

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  const last = items[items.length - 1];

  res.json({
    items,
    hasMore,
    nextCursor: hasMore
      ? Buffer.from(last.createdAt.toISOString() + "|" + last._id).toString("base64")
      : null,
  });
});
\`\`\`

With the right index this is O(limit) at any depth — page 50,000 costs exactly what page 1 costs. Encoding the cursor as an opaque base64 string is deliberate: it signals to clients that the format is not a contract you intend to keep.

The trade-off is that you lose numbered pages. There is no "jump to page 40" and no total count unless you query for it separately. That is why cursor pagination is what you find behind infinite-scroll feeds and public APIs, while offset survives in admin tables where "page 12 of 47" is genuinely useful.

## Choosing between them

| | Frontend | Offset | Cursor |
|---|---|---|---|
| Good up to | ~1,000 rows | ~100,000 rows | Unbounded |
| Jump to page N | Yes | Yes | No |
| Total count | Free | One extra query | Usually omitted |
| Stable while data changes | No | No | Yes |
| Deep-page cost | n/a | Grows linearly | Flat |
| Typical use | Settings, small lists | Admin tables, search results | Feeds, public APIs |

## Pagination and SEO

For public paginated content, a few rules keep your catalogue reachable.

Give every page a real, crawlable URL — **/blog?page=2**, not a JavaScript-only state change. Self-canonicalise: page 2 should canonical to page 2, not to page 1, or you are telling Google that pages 2 onward do not exist. Keep **rel="prev"** and **rel="next"** as ordinary anchors that a crawler can follow. And do not **noindex** deep pages, because a noindexed page eventually stops being crawled, and everything reachable only through it goes with it.

## Mistakes worth avoiding

**Math.round instead of Math.ceil.** Silently loses the last page.

**Not clamping the page after a filter.** Empty screen, no way back.

**Sorting without a unique tiebreaker.** Duplicate and missing rows across pages.

**Trusting client-supplied limits.** Always cap.

**Counting on every request.** **COUNT(*)** on a large table is expensive. Cache it, approximate it, or drop the total.

**Paginating after fetching.** Loading everything and slicing on the server is frontend pagination with extra steps and none of the benefits.

## Closing thought

Pick by growth, not by convenience. Bounded and small, paginate in the browser. Growing but navigable, use offset with a capped limit and a stable sort. Large or fast-moving, use a cursor and stop pretending page numbers are meaningful. Most performance problems attributed to "the database being slow" are an offset query walking half a million rows to throw them away.
`;
