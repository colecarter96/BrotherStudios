import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import VariantLink from "../components/VariantLink";
import ShopCollectionLinks from "../components/ShopCollectionLinks";
import {
  productsNormalized,
  type ProductNormalized,
  type ImageSpec,
  type NormalizedVariant,
} from "./products";
import { SHOP_PROMO_TILES } from "./shopPromoTiles";
import {
  filterProductsByCollection,
  isDropTeaserMode,
  parseShopCollectionParam,
} from "@/lib/shopCollection";
import { getInventoryForSlug, isShopListingSwatchDepleted } from "@/lib/inventory";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ collection?: string }>;
};

async function getSoldOutSlugs(): Promise<Set<string>> {
  const manualSoldOutSlugs = productsNormalized
    .filter((p: ProductNormalized) => p.soldOut)
    .map((p: ProductNormalized) => p.slug);
  const oneOfOneSlugs = productsNormalized.filter((p: ProductNormalized) => p.oneOfOne).map((p: ProductNormalized) => p.slug);
  const sold = new Set<string>(manualSoldOutSlugs);
  if (oneOfOneSlugs.length === 0) return sold;
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) return sold;
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
    for (const slug of oneOfOneSlugs) {
      const result = await stripe.paymentIntents.search({
        query: `status:'succeeded' AND metadata['slug']:'${slug}'`,
        limit: 1,
      });
      if ((result?.data?.length || 0) > 0) {
        sold.add(slug);
      }
    }
    return sold;
  } catch {
    return sold;
  }
}

type ProductTile = { p: ProductNormalized; v: NormalizedVariant; vi: number };

type MobileEntry = { k: "p"; tile: ProductTile } | { k: "promo"; slot: number };

function buildMobileSequence(tiles: ProductTile[]): MobileEntry[] {
  if (!SHOP_PROMO_TILES.length) {
    return tiles.map((t) => ({ k: "p" as const, tile: t }));
  }
  const out: MobileEntry[] = [];
  let promoCount = 0;
  for (let idx = 0; idx < tiles.length; idx++) {
    out.push({ k: "p", tile: tiles[idx]! });
    if ((idx + 1) % 2 === 0) {
      out.push({ k: "promo", slot: promoCount % Math.max(1, SHOP_PROMO_TILES.length) });
      promoCount += 1;
    }
  }
  return out;
}

/** Promo / accent tiles — mobile only (desktop shop is a plain product grid). */
function ShopPromoBlock({ slot }: { slot: number }) {
  if (!SHOP_PROMO_TILES.length) return null;
  const tile = SHOP_PROMO_TILES[slot % SHOP_PROMO_TILES.length];
  const inner = (
    <div className="relative mx-auto aspect-square w-[85%] overflow-hidden">
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        className="object-cover"
        sizes="(max-width:768px) 92vw, 100vw"
      />
    </div>
  );
  if (tile.href?.trim()) {
    return (
      <Link href={tile.href} className="group block border-2 border-transparent px-2 py-10">
        {inner}
      </Link>
    );
  }
  return <div className="block border-2 border-transparent px-2 py-10">{inner}</div>;
}

function ProductShopCard({
  tile,
  soldOut,
  invBySlug,
}: {
  tile: ProductTile;
  soldOut: Set<string>;
  invBySlug: Map<string, Record<string, number> | null>;
}) {
  const { p, v } = tile;
  const imgAt = (idx: number): string | undefined => {
    const it: ImageSpec | undefined = v.images?.[idx];
    return typeof it === "string" ? it : it?.src;
  };
  const baseImg = imgAt(1) || imgAt(0);
  const altA = imgAt(0);
  const altB = imgAt(1);
  const hoverImg = (altA && altA !== baseImg && altA) || (altB && altB !== baseImg && altB) || undefined;
  const hasHover = Boolean(hoverImg);
  const productSoldOut = soldOut.has(p.slug);
  const live = invBySlug.get(p.slug);
  const inventoryDepleted = isShopListingSwatchDepleted(p.initialInventory, live ?? undefined, v.color);
  const grayVisual = productSoldOut || inventoryDepleted;
  return (
    <VariantLink
      href={p.listingHref ?? `/shop/${p.slug}`}
      slug={p.slug}
      color={v.color}
      className={`group block border-2 border-transparent px-2 py-10 md:py-0 ${grayVisual ? "opacity-60" : ""}`}
    >
      <div className={`relative w-full aspect-square overflow-hidden ${grayVisual ? "grayscale" : ""}`}>
        <div className="absolute -inset-[2px]">
          <Image
            src={baseImg || altA || ""}
            alt={p.title}
            fill
            className={`object-cover transition-none duration-500 ${hasHover ? "md:group-hover:opacity-0" : ""}`}
          />
        </div>
        {hasHover && (
          <div className="absolute -inset-[2px]">
            <Image
              src={hoverImg as string}
              alt={`${p.title} alternate`}
              fill
              className="hidden md:block object-cover opacity-0 md:group-hover:opacity-100 transition-none duration-500"
            />
          </div>
        )}
      </div>
      <h2 className={`font-semibold text-base md:text-lg mt-2 ${grayVisual ? "text-black/60" : ""}`}>{p.title}</h2>
      <p className={`font-medium text-base md:text-lg -mt-2 ${grayVisual ? "text-black/60" : ""}`}>${p.price.toFixed(2)}</p>
    </VariantLink>
  );
}

export default async function Shop({ searchParams }: PageProps) {
  const soldOut = await getSoldOutSlugs();
  const teaser = isDropTeaserMode();
  const sp = await searchParams;
  const requested = parseShopCollectionParam(sp.collection);
  const activeCollection = teaser ? "archive" : requested;
  const visibleProducts = filterProductsByCollection(productsNormalized, activeCollection);

  const uniqueSlugs = [...new Set(visibleProducts.map((p) => p.slug))];
  const invEntries = await Promise.all(
    uniqueSlugs.map(async (slug) => [slug, await getInventoryForSlug(slug)] as const)
  );
  const invBySlug = new Map<string, Record<string, number> | null>(invEntries);

  const tiles: ProductTile[] = visibleProducts.flatMap((p) => p.variants.map((v, vi) => ({ p, v, vi })));
  const mobileSeq = buildMobileSequence(tiles);

  return (
    <>
      <div className="px-4 md:px-8 pt-32 md:pt-40">
        <ShopCollectionLinks active={activeCollection} teaserMode={teaser} />
        <div className="md:hidden min-h-[80dvh] mb-20">
          {mobileSeq.map((entry, mi) =>
            entry.k === "promo" ? (
              <ShopPromoBlock key={`m-promo-${mi}`} slot={entry.slot} />
            ) : (
              <ProductShopCard
                key={`${entry.tile.p.slug}__${entry.tile.vi}-m-${mi}`}
                tile={entry.tile}
                soldOut={soldOut}
                invBySlug={invBySlug}
              />
            )
          )}
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:mx-[5%] gap-0 justify-items-stretch items-start min-h-[80dvh] mb-20">
          {tiles.map((tile) => (
            <ProductShopCard key={`${tile.p.slug}__${tile.vi}`} tile={tile} soldOut={soldOut} invBySlug={invBySlug} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
