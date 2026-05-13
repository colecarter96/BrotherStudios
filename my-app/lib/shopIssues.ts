/**
 * Shop “issues” (drops) — one place to define URL query values and labels.
 *
 * - Add each issue to `SHOP_ISSUE_CATALOG` with a stable `param` (used in `?collection=`).
 * - Set `SHOP_FEATURED_ISSUE_PARAM` to whichever issue the SHOP menu + shop subnav should highlight.
 * - On each `Product`, set `shopCollection` to that same `param` for the current drop, or `"archive"`.
 *
 * Example bump to Issue 2:
 * 1. Add `{ param: "issue2", label: "TWOSDAY ISSUE 2" }` to the catalog.
 * 2. Set `SHOP_FEATURED_ISSUE_PARAM` to `"issue2"`.
 * 3. Tag new products `shopCollection: "issue2"`; move old drop lines to `shopCollection: "archive"` if needed.
 */

export const SHOP_ISSUE_CATALOG = [
  { param: "issue1", label: "TWOSDAY ISSUE 1" },
  // { param: "issue2", label: "TWOSDAY ISSUE 2" },
] as const;

/** Which catalog entry is the “live” issue in nav + default messaging (must exist in `SHOP_ISSUE_CATALOG`). */
export const SHOP_FEATURED_ISSUE_PARAM: (typeof SHOP_ISSUE_CATALOG)[number]["param"] = "issue1";

export type ShopIssueParam = (typeof SHOP_ISSUE_CATALOG)[number]["param"];

export type ShopProductSegment = ShopIssueParam | "archive";

const ISSUE_PARAMS_LOWER = new Set(SHOP_ISSUE_CATALOG.map((row) => row.param.toLowerCase()));

/** Normalize e.g. `issue-1`, `ISSUE1` → `issue1` when it matches a catalog param. */
export function normalizeIssueCollectionQuery(raw: string): string | null {
  const s = raw.trim().toLowerCase();
  const collapsed = s.replace(/^issue-(\d+)$/, "issue$1");
  if (ISSUE_PARAMS_LOWER.has(collapsed)) return collapsed;
  return null;
}

export function isShopIssueParam(value: string): value is ShopIssueParam {
  return ISSUE_PARAMS_LOWER.has(value.toLowerCase());
}

export function getShopIssueLabel(param: ShopIssueParam): string {
  const row = SHOP_ISSUE_CATALOG.find((r) => r.param === param);
  return row?.label ?? param;
}

export function shopCollectionHref(collection: ShopProductSegment | "all"): string {
  if (collection === "all") return "/shop";
  return `/shop?collection=${collection}`;
}

export function getFeaturedIssueShopHref(): string {
  return shopCollectionHref(SHOP_FEATURED_ISSUE_PARAM);
}

export function getFeaturedIssueLabel(): string {
  return getShopIssueLabel(SHOP_FEATURED_ISSUE_PARAM);
}
