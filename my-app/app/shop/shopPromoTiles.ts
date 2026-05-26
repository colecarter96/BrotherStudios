/**
 * Full-bleed promo tiles on `/shop` (desktop zig-zag rows + mobile every 3 products).
 * Add entries and set `href` when the image should link somewhere; omit `href` for static only.
 */
export type ShopPromoTile = {
  src: string;
  alt: string;
  /** Optional — wrap tile in a link */
  href?: string;
};

export const SHOP_PROMO_TILES: ShopPromoTile[] = [
  { src: "/drop1/visuals/blackFlagBack.jpg", alt: "Two Brothers", href: "/shop/flag-tee"  },
  { src: "/drop1/visuals/whiteHorseBack.jpg", alt: "Two Brothers", href: "/shop/stable-slub-tee" },
  { src: "/SS26/visuals/climbingTeeBackWhite.jpeg", alt: "Two Brothers", href: "/shop/expedition-tee" },
  
];
