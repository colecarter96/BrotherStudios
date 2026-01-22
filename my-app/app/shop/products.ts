export type Product = {
  slug: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  stripePriceId?: string;
  details?: ProductDetails;
};

export type ProductDetails = {
  fabric?: string;
  color?: string | string[];
  care?: string;
  gsm?: number | string;
};

export const products: Product[] = [
  {
    slug: "2-man-sticker",
    title: "TWO MAN STICKER",
    price: 2.0,
    images: ["/2manblackstickimg.svg"],
    description: "2in X 2in Vinyl Sticker depicting the Two Man Sticker.\n Ideal for water bottles, laptop shells, skateboards, surfboards, or your friends forehead.",
    stripePriceId: "price_1SFmIeP6lKVtJIIMWxLCJ91R",
  },
  // Dog Tee (second in list)
  {
    slug: "dog-tee",
    title: "DOG TEE",
    price: 32,
    images: ["/dogTeeFront.png", "/dogTeeBack.png"],
    description: "The Dog Tee features our \'B\' chest logo and dog back logo with the \'Two Brothers\' spell out. \n Printed on our contrast stitch cotton blank, shrinks slightly in the wash.",
    stripePriceId: "price_1SmLaoP6lKVtJIIMFIItxoSN",
    details: {
      fabric: "100% cotton",
      color: ["Black", "White"],
      care: "Machine wash, tumble dry low",
      gsm: 240,
    },
  },
  // {
  //   slug: "plus-hoodie",
  //   title: "TWO STAMP HOODIE",
  //   price: 55,
  //   images: ["/printHoodie.png"],
  //   description: "This hoodie features a plus stamp on the hood, a \'TWO\' stamp on the left chest, and a sword stamp on the right forearm. All stamped on a Champion Reverse Weave Gray Blank. Email to order!",
  //   details: {
  //     fabric: "82% cotton / 18% polyester",
  //     color: "Heather Gray",
  //     care: "Wash inside out, hang dry recommended",
  //     gsm: "Heavyweight",
  //   },
  // },
  
];

