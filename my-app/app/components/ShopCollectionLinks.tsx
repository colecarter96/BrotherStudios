import Link from "next/link";
import type { ShopCollectionFilter } from "@/lib/shopCollection";
import {
  SHOP_FEATURED_ISSUE_PARAM,
  getFeaturedIssueLabel,
  shopCollectionHref,
} from "@/lib/shopCollection";

function linkClass(active: boolean) {
  return active
    ? "underline underline-offset-[5px] decoration-black transition hover:opacity-90"
    : "border-b-2 border-transparent transition hover:opacity-80";
}

type Props = {
  active: ShopCollectionFilter;
  teaserMode?: boolean;
};

/** Right-aligned collection links above the shop grid; hidden during drop teaser. */
export default function ShopCollectionLinks({ active, teaserMode }: Props) {
  if (teaserMode) return null;

  return (
    <nav
      className="mb-6 flex justify-end gap-x-5 gap-y-1 text-sm font-semibold tracking-tight md:text-base"
      aria-label="Shop collections"
    >
      <Link href={shopCollectionHref(SHOP_FEATURED_ISSUE_PARAM)} className={linkClass(active === SHOP_FEATURED_ISSUE_PARAM)}>
        {getFeaturedIssueLabel()}
      </Link>
      <Link href={shopCollectionHref("archive")} className={linkClass(active === "archive")}>
        ARCHIVE
      </Link>
      <Link href={shopCollectionHref("all")} className={linkClass(active === "all")}>
        ALL
      </Link>
    </nav>
  );
}
