import {
  isShopIssueParam,
  normalizeIssueCollectionQuery,
  type ShopProductSegment,
} from "./shopIssues";

export type { ShopIssueParam, ShopProductSegment } from "./shopIssues";
export {
  SHOP_ISSUE_CATALOG,
  SHOP_FEATURED_ISSUE_PARAM,
  getShopIssueLabel,
  shopCollectionHref,
  getFeaturedIssueShopHref,
  getFeaturedIssueLabel,
} from "./shopIssues";

export type ShopCollectionFilter = ShopProductSegment | "all";

type SegmentableProduct = { shopCollection?: ShopProductSegment };

/** Home teaser on → shop is archive-only in nav + grid. */
export function isDropTeaserMode(): boolean {
  const v = process.env.NEXT_PUBLIC_DROP_TEASER;
  return v === "1" || v === "true";
}

export function parseShopCollectionParam(raw: string | string[] | undefined): ShopCollectionFilter {
  const s = Array.isArray(raw) ? raw[0] : raw;
  if (!s?.trim()) return "all";
  const lower = s.trim().toLowerCase();
  if (lower === "archive") return "archive";
  const normalized = normalizeIssueCollectionQuery(lower);
  if (normalized && isShopIssueParam(normalized)) return normalized;
  return "all";
}

export function getProductShopSegment(product: SegmentableProduct): ShopProductSegment {
  return product.shopCollection ?? "archive";
}

export function filterProductsByCollection<T extends SegmentableProduct>(list: T[], filter: ShopCollectionFilter): T[] {
  if (filter === "all") return list;
  return list.filter((p) => getProductShopSegment(p) === filter);
}
