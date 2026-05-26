import { Redis } from "@upstash/redis";
import { products } from "@/app/shop/products";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

/** Separates variant `color` from size in `initialInventory` / Redis hash field names. */
export const INVENTORY_COLOR_SIZE_SEP = "|";

/** Field name within the inventory hash to track total units sold (size-agnostic). */
const EDITION_SOLD_FIELD = "_sold";
const COLOR_SOLD_PREFIX = "_sold|";

function invKey(slug: string) {
  return `inv:${slug}`;
}

export function isInventoryRedisConfigured(): boolean {
  return Boolean(redis);
}

export function getProductInventorySeed(slug: string): Partial<Record<string, number>> | undefined {
  const p = products.find((x) => x.slug === slug);
  return p?.initialInventory;
}

/** True when `initialInventory` uses `color|SIZE` keys (per colorway counts). */
export function inventoryUsesPerColorwayKeys(seed: Partial<Record<string, number>> | undefined): boolean {
  if (!seed) return false;
  return Object.keys(seed).some((k) => k.includes(INVENTORY_COLOR_SIZE_SEP));
}

/** Redis field / seed key for one color + size (must match variant `color` in `products.ts`). */
export function inventoryFieldForVariant(color: string, size: string): string {
  return `${String(color).trim()}${INVENTORY_COLOR_SIZE_SEP}${String(size).trim()}`;
}

function getProductEditionCap(slug: string): number | null {
  const p = products.find((x) => x.slug === slug);
  const raw = p?.inventoryEditionCap;
  return typeof raw === "number" && Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : null;
}

function isProductManualSoldOut(slug: string): boolean {
  const p = products.find((x) => x.slug === slug);
  return Boolean(p?.soldOut);
}

function getVariantCap(slug: string, color: string | undefined | null): number | null {
  if (!color) return null;
  const p = products.find((x) => x.slug === slug);
  const cap = p?.variants?.find((v) => (v.color || "").toLowerCase() === String(color).toLowerCase())?.inventoryCap;
  return typeof cap === "number" && Number.isFinite(cap) && cap > 0 ? Math.floor(cap) : null;
}

function soldFieldForColor(color: string): string {
  return `${COLOR_SOLD_PREFIX}${String(color).trim()}`;
}

/**
 * For PDP: narrow full Redis map to sizes for the selected swatch.
 * Legacy size-only seeds return `full` unchanged.
 */
export function sliceInventoryByColor(
  full: Record<string, number> | null,
  color: string | undefined,
  seed: Partial<Record<string, number>> | undefined
): Record<string, number> | null {
  if (!full || !seed || Object.keys(seed).length === 0) return null;
  if (!inventoryUsesPerColorwayKeys(seed)) {
    return full;
  }
  if (!color) return null;
  const sep = INVENTORY_COLOR_SIZE_SEP;
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(full)) {
    const i = k.indexOf(sep);
    if (i === -1) continue;
    const c = k.slice(0, i);
    const s = k.slice(i + sep.length);
    if (c === color) out[s] = v;
  }
  return Object.keys(out).length ? out : null;
}

function seedKeysForColorway(seed: Partial<Record<string, number>>, color: string): string[] {
  const sep = INVENTORY_COLOR_SIZE_SEP;
  const keys: string[] = [];
  for (const k of Object.keys(seed)) {
    const i = k.indexOf(sep);
    if (i === -1) continue;
    if (k.slice(0, i) === color) keys.push(k);
  }
  return keys;
}

/**
 * “x/y left” for one swatch when `initialInventory` uses `color|SIZE` keys.
 * `cap` defaults to the sum of positive seed counts for that colorway; pass `displayCap` to fix a larger edition denominator.
 */
export function getInventoryDisplayForColorway(
  seed: Partial<Record<string, number>>,
  byField: Record<string, number>,
  color: string,
  displayCap?: number | null
): { remaining: number; cap: number } | null {
  if (!seed || Object.keys(seed).length === 0 || !color) return null;
  if (!inventoryUsesPerColorwayKeys(seed)) return null;
  const keys = seedKeysForColorway(seed, color);
  if (keys.length === 0) return null;
  let remaining = 0;
  let capFromSeed = 0;
  for (const k of keys) {
    remaining += Math.max(0, Math.floor(Number(byField[k] ?? 0)));
    const v = seed[k];
    if (typeof v === "number" && Number.isFinite(v) && v > 0) capFromSeed += Math.floor(v);
  }
  const override =
    typeof displayCap === "number" && Number.isFinite(displayCap) && displayCap > 0
      ? Math.floor(displayCap)
      : null;
  const cap = override !== null ? override : capFromSeed;
  return { remaining, cap };
}

/** Shop grid: units left for this variant row; `null` when product has no tracked inventory. */
export function getShopListingSwatchRemaining(
  seed: Partial<Record<string, number>> | undefined,
  live: Record<string, number> | null | undefined,
  variantColor: string
): number | null {
  if (!seed || Object.keys(seed).length === 0) return null;
  const map = live ?? {};
  if (inventoryUsesPerColorwayKeys(seed)) {
    const d = getInventoryDisplayForColorway(seed, map, variantColor);
    if (!d) return null;
    return d.remaining;
  }
  let n = 0;
  for (const k of Object.keys(seed)) {
    n += Math.max(0, Math.floor(Number(map[k] ?? 0)));
  }
  return n;
}

/** Shop grid: gray tile when tracked inventory exists and this swatch (or shared size pool) has nothing left. */
export function isShopListingSwatchDepleted(
  seed: Partial<Record<string, number>> | undefined,
  live: Record<string, number> | null | undefined,
  variantColor: string
): boolean {
  const r = getShopListingSwatchRemaining(seed, live, variantColor);
  return r !== null && r <= 0;
}

export function slugFromStripePriceId(priceId: string): string {
  for (const p of products) {
    if (p.stripePriceId === priceId) return p.slug;
    for (const v of p.variants || []) {
      if (v.stripePriceId === priceId) return p.slug;
    }
  }
  return "";
}

/** Live counts from Redis, merged with catalog keys. Seeds from `initialInventory` when Redis key is empty. */
export async function getInventoryForSlug(slug: string): Promise<Record<string, number> | null> {
  const seed = getProductInventorySeed(slug);
  if (!seed || Object.keys(seed).length === 0) return null;

  if (!redis) {
    return Object.fromEntries(
      Object.entries(seed).map(([k, v]) => [k, typeof v === "number" && Number.isFinite(v) ? v : 0])
    );
  }

  const key = invKey(slug);
  let row = await redis.hgetall<Record<string, string>>(key);
  if (!row || Object.keys(row).length === 0) {
    const toSet: Record<string, number> = {};
    for (const [k, v] of Object.entries(seed)) {
      if (typeof v === "number" && Number.isFinite(v) && v >= 0) toSet[k] = v;
    }
    if (Object.keys(toSet).length > 0) {
      await redis.hset(key, toSet);
      row = Object.fromEntries(Object.entries(toSet).map(([k, v]) => [k, String(v)]));
    }
  }

  const rowSafe = row ?? {};
  const out: Record<string, number> = {};
  for (const k of Object.keys(seed)) {
    const raw = rowSafe[k];
    out[k] = raw !== undefined && raw !== "" ? Math.max(0, Number(raw)) : Math.max(0, Number(seed[k as keyof typeof seed] ?? 0));
  }
  return out;
}

/** Remaining units (sum of tracked fields) vs edition cap for “x/y left” UI. */
export async function getInventoryDisplayForSlug(slug: string): Promise<{ remaining: number; cap: number } | null> {
  const p = products.find((x) => x.slug === slug);
  if (!p) return null;

  // If an edition cap is defined, prefer size-agnostic tracking: remaining = cap - sold
  const capFromProduct = getProductEditionCap(slug);
  if (capFromProduct !== null) {
    if (!redis) {
      // Without Redis, we cannot know sold; show full cap remaining to avoid blocking purchases in dev
      return { remaining: capFromProduct, cap: capFromProduct };
    }
    const raw = await redis.hget<string>(invKey(slug), EDITION_SOLD_FIELD);
    const sold = raw ? Math.max(0, Math.floor(Number(raw))) : 0;
    const remaining = Math.max(0, capFromProduct - sold);
    return { remaining, cap: capFromProduct };
  }

  // Otherwise, fall back to size-based aggregation from seeds
  const seed = p.initialInventory;
  if (!seed || Object.keys(seed).length === 0) return null;

  const byField = await getInventoryForSlug(slug);
  if (!byField) return null;

  const keys = Object.keys(seed);
  let remaining = 0;
  for (const k of keys) {
    remaining += Math.max(0, Math.floor(Number(byField[k] ?? 0)));
  }

  let cap = 0;
  for (const k of keys) {
    const v = seed[k];
    if (typeof v === "number" && Number.isFinite(v) && v > 0) cap += Math.floor(v);
  }

  return { remaining, cap };
}

function resolveInventoryField(
  slug: string,
  size: string,
  color: string | undefined | null
): string | null {
  const seed = getProductInventorySeed(slug);
  if (!seed || !size) return null;
  if (inventoryUsesPerColorwayKeys(seed)) {
    if (!color) return null;
    const f = inventoryFieldForVariant(color, size);
    return f in seed ? f : null;
  }
  return size in seed ? size : null;
}

export async function getAvailableForSize(
  slug: string,
  size: string,
  color?: string | null
): Promise<number | null> {
  const map = await getInventoryForSlug(slug);
  if (!map) return null;
  const field = resolveInventoryField(slug, size, color ?? undefined);
  if (field === null) return null;
  return map[field] ?? 0;
}

export async function assertEnoughStock(
  slug: string,
  size: string | undefined,
  quantity: number,
  color?: string | null
): Promise<{ ok: true } | { ok: false; message: string }> {
  // Respect manual soldOut override
  if (isProductManualSoldOut(slug)) {
    return { ok: false, message: "Sold out." };
  }
  // Enforce edition cap first (size-agnostic), if defined
  const cap = getProductEditionCap(slug);
  if (cap !== null && redis) {
    const raw = await redis.hget<string>(invKey(slug), EDITION_SOLD_FIELD);
    const sold = raw ? Math.max(0, Math.floor(Number(raw))) : 0;
    const remaining = Math.max(0, cap - sold);
    if (remaining < quantity) {
      return { ok: false, message: remaining > 0 ? `Only ${remaining} left.` : "Sold out." };
    }
  }
  // Enforce per-color caps when defined
  if (redis) {
    const colorCap = getVariantCap(slug, color ?? undefined);
    // If any variant has a cap but color missing, ask user to pick a color
    const p = products.find((x) => x.slug === slug);
    const anyVariantHasCap = (p?.variants || []).some((v) => typeof v.inventoryCap === "number" && v.inventoryCap > 0);
    if (anyVariantHasCap && (!color || color === "")) {
      return { ok: false, message: "Select a color to continue." };
    }
    if (colorCap !== null) {
      const rawColor = await redis.hget<string>(invKey(slug), soldFieldForColor(color!));
      const soldColor = rawColor ? Math.max(0, Math.floor(Number(rawColor))) : 0;
      const remainingColor = Math.max(0, colorCap - soldColor);
      if (remainingColor < quantity) {
        return { ok: false, message: remainingColor > 0 ? `Only ${remainingColor} left in that color.` : "Selected color is sold out." };
      }
    }
  }

  const seed = getProductInventorySeed(slug);
  if (!seed || !redis) return { ok: true };

  const field =
    size !== undefined && size !== "" ? resolveInventoryField(slug, size, color ?? undefined) : null;
  if (field === null) {
    if (inventoryUsesPerColorwayKeys(seed) && size && (!color || color === "")) {
      return { ok: false, message: "Select a color to continue." };
    }
    return { ok: true };
  }

  const available = await getAvailableForSize(slug, size!, color);
  if (available === null) return { ok: true };
  if (available < quantity) {
    return { ok: false, message: `Only ${available} left in that size.` };
  }
  return { ok: true };
}

type CartLine = { p: string; s?: string; q: number; u?: string; c?: string };

export async function applyInventoryFromCheckoutSession(session: {
  id: string;
  metadata: Record<string, string> | null;
}): Promise<void> {
  if (!redis) return;

  const md = session.metadata || {};
  const slug = typeof md.slug === "string" && md.slug ? md.slug : "";
  const size = typeof md.size === "string" && md.size ? md.size : "";
  const color = typeof md.color === "string" && md.color ? md.color : "";
  const qty = Math.max(1, parseInt(md.q || "1", 10) || 1);

  if (slug && size) {
    const field = resolveInventoryField(slug, size, color || undefined);
    if (field) {
      await redis.hincrby(invKey(slug), field, -qty);
      await redis.hincrby(invKey(slug), EDITION_SOLD_FIELD, qty);
      if (color) {
        await redis.hincrby(invKey(slug), soldFieldForColor(color), qty);
      }
      return;
    }
  }

  // Size-agnostic single-item checkout: increment edition-wide sold
  if (slug && !md.cart) {
    await redis.hincrby(invKey(slug), EDITION_SOLD_FIELD, qty);
    if (color) {
      await redis.hincrby(invKey(slug), soldFieldForColor(color), qty);
    }
    return;
  }

  const cartRaw = md.cart;
  if (!cartRaw) return;

  let lines: CartLine[];
  try {
    lines = JSON.parse(cartRaw) as CartLine[];
  } catch {
    return;
  }
  if (!Array.isArray(lines)) return;

  for (const line of lines) {
    const lineSlug =
      (typeof line.u === "string" && line.u) || (typeof line.p === "string" ? slugFromStripePriceId(line.p) : "");
    const lineSize = typeof line.s === "string" ? line.s : "";
    const lineColor = typeof line.c === "string" ? line.c : "";
    const lineQty = typeof line.q === "number" && line.q > 0 ? line.q : 1;
    if (!lineSlug) continue;
    if (lineSize) {
      const field = resolveInventoryField(lineSlug, lineSize, lineColor || undefined);
      if (field) {
        await redis.hincrby(invKey(lineSlug), field, -lineQty);
      }
    }
    // Always increment edition-wide sold counter regardless of size tracking
    await redis.hincrby(invKey(lineSlug), EDITION_SOLD_FIELD, lineQty);
    if (lineColor) {
      await redis.hincrby(invKey(lineSlug), soldFieldForColor(lineColor), lineQty);
    }
  }
}

/** True when edition cap exists and all units are sold. */
export async function isEditionSoldOut(slug: string): Promise<boolean> {
  if (!redis) return false;
  const p = products.find((x) => x.slug === slug);
  if (!p) return false;
  // If per-color caps exist, sold-out when all capped variants are sold out
  const cappedVariants = (p.variants || []).filter((v) => typeof v.inventoryCap === "number" && v.inventoryCap > 0);
  if (cappedVariants.length > 0) {
    for (const v of cappedVariants) {
      const cap = Math.floor(v.inventoryCap as number);
      const raw = await redis.hget<string>(invKey(slug), soldFieldForColor(v.color));
      const sold = raw ? Math.max(0, Math.floor(Number(raw))) : 0;
      if (sold < cap) return false;
    }
    return true;
  }
  // Fallback to edition-wide cap if present
  const capTotal = getProductEditionCap(slug);
  if (capTotal === null) return false;
  const rawTotal = await redis.hget<string>(invKey(slug), EDITION_SOLD_FIELD);
  const soldTotal = rawTotal ? Math.max(0, Math.floor(Number(rawTotal))) : 0;
  return soldTotal >= capTotal;
}

/** True when a specific color variant has an inventoryCap and sold >= cap. */
export async function isColorwaySoldOut(slug: string, color: string): Promise<boolean> {
  if (!redis) return false;
  const cap = getVariantCap(slug, color);
  if (cap === null) return false;
  const raw = await redis.hget<string>(invKey(slug), soldFieldForColor(color));
  const sold = raw ? Math.max(0, Math.floor(Number(raw))) : 0;
  return sold >= cap;
}

/** Display helper for one color variant when per-color cap is present. */
export async function getColorwayDisplayByCap(
  slug: string,
  color: string
): Promise<{ remaining: number; cap: number } | null> {
  if (!redis) return null;
  const cap = getVariantCap(slug, color);
  if (cap === null) return null;
  const raw = await redis.hget<string>(invKey(slug), soldFieldForColor(color));
  const sold = raw ? Math.max(0, Math.floor(Number(raw))) : 0;
  const remaining = Math.max(0, cap - sold);
  return { remaining, cap };
}
