export type SubstackPost = {
  slug: string;
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  contentHtml: string;
};

const REVALIDATE_SECONDS = 3600;

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

/** Strip tags and collapse whitespace for card excerpts */
export function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function extractTag(block: string, tag: string): string {
  const cdata = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, "i");
  const cdataMatch = block.match(cdata);
  if (cdataMatch) return cdataMatch[1].trim();

  const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const plainMatch = block.match(plain);
  if (!plainMatch) return "";
  return plainMatch[1].replace(/^<!\[CDATA\[|\]\]>$/g, "").trim();
}

export function slugFromSubstackLink(link: string): string {
  try {
    const path = new URL(link).pathname;
    const parts = path.split("/").filter(Boolean);
    const pIdx = parts.indexOf("p");
    if (pIdx !== -1 && parts[pIdx + 1]) return parts[pIdx + 1];
    return parts[parts.length - 1] || link;
  } catch {
    return link;
  }
}

export function parseSubstackRss(xml: string): SubstackPost[] {
  const items: SubstackPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = decodeEntities(extractTag(block, "title"));
    const link = extractTag(block, "link").trim();
    if (!title || !link) continue;

    const pubDate = extractTag(block, "pubDate");
    const contentHtml =
      extractTag(block, "content:encoded") || extractTag(block, "description");
    const excerptRaw = extractTag(block, "description") || contentHtml;
    const excerpt = stripHtml(excerptRaw).slice(0, 280);

    items.push({
      slug: slugFromSubstackLink(link),
      title,
      link,
      pubDate,
      excerpt,
      contentHtml,
    });
  }
  return items;
}

const DEFAULT_SUBSTACK_PUBLICATION = "https://twbrthrs.substack.com";
const DEFAULT_SUBSTACK_FEED = `${DEFAULT_SUBSTACK_PUBLICATION}/feed`;

export function getSubstackFeedUrl(): string {
  return process.env.SUBSTACK_FEED_URL?.trim() || DEFAULT_SUBSTACK_FEED;
}

export function getSubstackPublicationUrl(): string {
  const url = process.env.SUBSTACK_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  return DEFAULT_SUBSTACK_PUBLICATION;
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  const feedUrl = getSubstackFeedUrl();

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseSubstackRss(xml);
  } catch {
    return [];
  }
}

export async function getSubstackPostBySlug(slug: string): Promise<SubstackPost | null> {
  const posts = await getSubstackPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function formatPostDate(pubDate: string): string {
  if (!pubDate) return "";
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return pubDate;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Short dateline for newspaper index */
export function formatPostDateline(pubDate: string): string {
  if (!pubDate) return "";
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return pubDate;
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatEditionDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
