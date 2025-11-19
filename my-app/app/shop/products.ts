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
    price: 25,
    images: ["/dogTeeFront.png", "/dogTeeBack.png"],
    description: "Premium cotton tee with our dog graphic.",
    stripePriceId: "price_1SQXfCP6lKVtJIIMGcbd7Pf6",
  },
  {
    slug: "plus-hoodie",
    title: "TBS Snap Plus Hoodie",
    price: 55,
    images: ["/plusHoodieBack.png", "/plusHoodieFront.png"],
    description: "Snap Closure with Blue plus on the back and TBS Oval Logo on the Front. Email or fill out contact form to order!",
  },
  
];

