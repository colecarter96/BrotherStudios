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
    description: "2x2in Vinyl Sticker. Stick it wherever you want...",
    stripePriceId: "price_1SFmIeP6lKVtJIIMWxLCJ91R",
  },
  // Dog Tee (second in list)
  {
    slug: "dog-tee",
    title: "Dog Tee",
    price: 20,
    images: ["/dogTeeFront.png", "/dogTeeBack.png"],
    description: "Premium cotton tee with our dog graphic.",
    stripePriceId: "price_1SQXfCP6lKVtJIIMGcbd7Pf6",
  },
  {
    slug: "plus-hoodie",
    title: "Plus Hoodie",
    price: 78,
    images: ["/2manblackstickimg.svg"],
    description: "Placeholder hoodie. Product details coming soon.",
  },
  {
    slug: "dickies-double-knee",
    title: "Dickies Double Knee",
    price: 68,
    images: ["https://510skateboarding.com/cdn/shop/files/dickies-double-knee-black_600x.jpg?v=1685579969"],
    description: "Placeholder pants. Product details coming soon.",
  },
  {
    slug: "la-apparel-hoodie",
    title: "LA Apparel Hoodie",
    price: 64,
    images: ["https://losangelesapparel.net/cdn/shop/files/Hf_09BlackFlat.jpg?v=1745000864&width=3000"],
    description: "Placeholder hoodie. Product details coming soon.",
  },
  {
    slug: "la-apparel-tee",
    title: "LA Apparel Tee",
    price: 32,
    images: ["https://skysportswear.com/cdn/shop/files/VintageBlack_Front.png?v=1755915444&width=1445"],
    description: "Placeholder tee. Product details coming soon.",
  },
];

