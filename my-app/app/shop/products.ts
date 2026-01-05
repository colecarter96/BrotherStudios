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
    title: "TWO MAN STICKER",
    price: 2.0,
    images: ["/2manblackstickimg.svg"],
    description: "2x2in Vinyl Sticker. Stick it wherever you want...",
    stripePriceId: "price_1SFmIeP6lKVtJIIMWxLCJ91R",
  },
  // Dog Tee (second in list)
  {
    slug: "dog-tee",
    title: "DOG TEE",
    price: 32,
    images: ["/dogTeeFront.png", "/dogTeeBack.png"],
    description: "Premium cotton tee with our dog graphic.",
    stripePriceId: "price_1SmLaoP6lKVtJIIMFIItxoSN",
  },
  {
    slug: "plus-hoodie",
    title: "TWO STAMP HOODIE",
    price: 55,
    images: ["/printHoodie.png"],
    description: "This hoodie features a plus stamp on the hood, a \'TWO\' stamp on the left chest, and a sword stamp on the right forearm. All stamped on a Champion Reverse Weave Gray Blank. Email to order!",
  },
  
];

