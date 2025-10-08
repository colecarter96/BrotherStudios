export type Product = {
  slug: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  stripePriceId?: string;
};

export const products: Product[] = [
  {
    slug: "2-man-sticker",
    title: "Two Man Sticker",
    price: 2.0,
    images: ["/2manblackstickimg.svg"],
    description: "High quality vinyl sticker of the two-man logo. Stick it wherever you want...",
    stripePriceId: "price_1SFmIeP6lKVtJIIMWxLCJ91R",
  },
];

