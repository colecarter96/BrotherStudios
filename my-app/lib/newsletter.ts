import { Redis } from "@upstash/redis";
import { getSubstackPublicationUrl } from "@/lib/substack";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const NEWSLETTER_REDIS_KEY = "newsletter:emails";

export function isValidNewsletterEmail(email: string): boolean {
  const e = email.trim().toLowerCase();
  if (!e || e.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

/** Adds a free subscriber via Substack’s public signup endpoint (list lives in Substack). */
export async function subscribeViaSubstack(email: string): Promise<{ ok: true } | { ok: false; message: string }> {
  const normalized = email.trim().toLowerCase();
  const base = getSubstackPublicationUrl();
  const url = `${base}/api/v1/free?nojs=true`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (compatible; TwoBrothersNewsletter/1.0)",
      },
      body: new URLSearchParams({
        email: normalized,
        source: "footer",
      }).toString(),
    });

    if (!res.ok) {
      return { ok: false, message: "Could not subscribe right now. Try again or use the blog subscribe link." };
    }

    return { ok: true };
  } catch {
    return { ok: false, message: "Could not subscribe right now. Try again later." };
  }
}

/** Optional backup list in Upstash (view in console → Data → `newsletter:emails`). */
export async function backupEmailInRedis(email: string): Promise<void> {
  if (!redis) return;
  await redis.sadd(NEWSLETTER_REDIS_KEY, email.trim().toLowerCase());
}

export async function subscribeNewsletter(
  email: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!isValidNewsletterEmail(email)) {
    return { ok: false, message: "Enter a valid email address." };
  }

  const result = await subscribeViaSubstack(email);
  if (!result.ok) return result;

  try {
    await backupEmailInRedis(email);
  } catch {
    // Substack succeeded; backup is best-effort only
  }

  return { ok: true };
}
