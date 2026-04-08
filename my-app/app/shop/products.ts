export type ShippingSpeed = "3-5" | "7-14";
export type SizeType = "standard" | "pants" | "none";

export type ColorVariant = {
  color: string; // required color key, e.g., "black", "white"
  label?: string; // optional display label
  images: string[]; // images for this color
  stripePriceId?: string; // optional per-color Stripe price
};

export type Product = {
  slug: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  stripePriceId?: string;
  details?: ProductDetails;
  oneOfOne?: boolean;
  waistOptions?: string[];
  inseamOptions?: string[];
  sizeType?: SizeType;
  shippingSpeed?: ShippingSpeed;
  variants?: ColorVariant[]; // preferred: define color variants (even if only one)
};

export type ProductDetails = {
  fabric?: string;
  color?: string | string[];
  care?: string;
  gsm?: number | string;
};

// Legacy note:
// - images: kept for backward-compat read, but all readers should use variantsNormalized/productsNormalized.
// - Each product should define at least one color variant with its own images.
export const products: Product[] = [
  {
    slug: "expedition-tee",
    title: "EXPEDITION SHIRT",
    price: 40,
    images: ["/SS26/climbingTeeBlackFront.webp", "/SS26/climbingTeeBlackBack.webp", "/SS26/visuals/climbingTeeFrontBlack.png", "/SS26/visuals/climbingTeeBackBlack.jpeg"],
    variants: [
      {
        color: "black",
        label: "Black",
        images: ["/SS26/climbingTeeBlackFront.webp", "/SS26/climbingTeeBlackBack.webp", "/SS26/visuals/climbingTeeFrontBlack.png", "/SS26/visuals/climbingTeeBackBlack.jpeg"],
        stripePriceId: "price_1T4pDDP6lKVtJIIM8Zz4S6bg",
      },
      {
        color: "white",
        label: "White",
        images: ["/SS26/climbingTeeWhiteFront.webp", "/SS26/climbingTeeWhiteBack.webp", "/SS26/visuals/climbingTeeFrontWhite.jpeg", "/SS26/visuals/climbingTeeBackWhite.jpeg"],
        stripePriceId: "price_1T4pCDP6lKVtJIIM5NUrBiky",
      },
    ],
    // images: ["/championFront.jpeg", "/championBack.jpg", "/championVisual.jpg"],
    description: "This shirt is designed to allow freedom of movement, be durable and get better as you wear it. With contrast stitching and print, it will keep you styling on any expedition.\nFits true to size.",
    stripePriceId: "price_1T4pDDP6lKVtJIIM8Zz4S6bg",
    sizeType: "standard",
    shippingSpeed: "7-14",
    details: {
      fabric: "100% Cotton",
      color: ["Gray", "Black"],
      care: "Machine wash, tumble dry low",
      gsm: 240,
    },
  },
  
  {
    slug: "handsome-brother-tee",
    title: "HANDSOME BROTHER TEE",
    price: 36,
    // Kept for backward compatibility; primary/hover come from variants below
    images: ["/SS26/handsomeBrotherBlack.webp", "/SS26/handsomeBrotherWhite.webp"],
    description:
      "A tight fitting slightly stretchy T-Shirt with tighter sleeves and chest and a more relaxed midsection. Model is wearing size M. Size down 1 size.",
    // You can omit product-level stripePriceId when using per-variant price IDs
    sizeType: "standard",
    shippingSpeed: "7-14",
    variants: [
      {
        color: "#000000",
        label: "Black",
        stripePriceId: "price_1TEbRMP6lKVtJIIMYJ7WV2Is", // bogus placeholder
        images: ["/SS26/handsomeBrotherBlackBack.webp", "/SS26/handsomeBrotherBlack.webp", "/SS26/handsomeBlackVisual.png"],
      },
      {
        color: "#ffffff",
        label: "White",
        stripePriceId: "price_1TEbQoP6lKVtJIIMBcTfayyK", // bogus placeholder
        images: ["/SS26/handsomeBrotherWhiteBack.webp", "/SS26/handsomeBrotherWhite.webp", "/SS26/handsomeWhiteVisual.png"],
      },
    ],
    details: {
      fabric: "95% Cotton, 5% Spandex",
      color: ["Black", "White"],
      care: "Machine wash cold, tumble dry low",
      gsm: 180,
    },
  },
  
  
  {
    slug: "soccer-tee",
    title: "TBS CLUB SHIRT",
    price: 50,
    images: ["/SS26/soccerShirtFront.png", "/productPhotos/newBackImg.png", "/SS26/visuals/clubTeeFront.jpeg"], //"/SS26/soccerShirtBack.webp"
    variants: [
      {
        color: "Black",
        label: "Black",
        images: ["/productPhotos/newBackImg.png", "/SS26/soccerShirtFront.png", "/SS26/visuals/clubTeeFront.jpeg"],
      },
    ],
    // images: ["/championFront.jpeg", "/championBack.jpg", "/championVisual.jpg"],
    description: "Designed in the style of vintage football kits, we hope you feel the same loyalty to your favorite club as to us. Blanked out name because the brotherhood is more important than any one of us.\nFits large, size down if between sizes.",
    stripePriceId: "price_1T4pEOP6lKVtJIIMYT4Kq0bi",
    sizeType: "standard",
    shippingSpeed: "7-14",
    details: {
      fabric: "100% cotton",
      color: ["Gray", "Black"],
      care: "Machine wash, tumble dry low",
      gsm: 270,
    },
  },
  {
    slug: "champion-tee",
    title: "CHAMPIONSHIP TEE",
    price: 45,
    images: ["/SS26/championTeeBack.webp", "/SS26/championTeeFront.webp"],
    variants: [
      {
        color: "black",
        label: "Black",
        images: ["/SS26/championTeeBack.webp", "/SS26/championTeeFront.webp"],
      },
    ],
    // images: ["/championFront.jpeg", "/championBack.jpg", "/championVisual.jpg"],
    description: "The Championship Shirt exudes an aura of winning. 2 Time World Champs, do not forget it. \nFits large, size down if between sizes.",
    stripePriceId: "price_1T4pDmP6lKVtJIIMYXwHeimk",
    sizeType: "standard",
    shippingSpeed: "7-14",
    details: {
      fabric: "100% cotton",
      color: ["Black", "Cream", "Yellow"],
      care: "Machine wash, tumble dry low",
      gsm: 350,
    },
  },
  
  
  {
    slug: "sex-panthers-tee",
    title: "TWO X SEX PANTHERS SHIRT",
    price: 45,
    images: ["/productPhotos/sexPanthersBack.webp", "/productPhotos/sexPanthersFront.webp", "/sexPVisual1.jpg"],
    variants: [
      {
        color: "black",
        label: "Black",
        images: ["/productPhotos/sexPanthersBack.webp", "/productPhotos/sexPanthersFront.webp", "/sexPVisual1.jpg"],
      },
    ],

    // images: ["/sexPanthersFront.jpg", "/sexPanthersBack.jpg", "/sexPVisual1.jpg", "/sexPVisual2.jpg" ],
    description: "The Sex Panthers Tee features our premium vintage cotton blank with a full front and back print depicting two panthers and implicated relevant locations and dates. \n Fits large, size down if between sizes.",
    stripePriceId: "price_1T4pFzP6lKVtJIIMnSThatZr",
    sizeType: "standard",
    shippingSpeed: "7-14",
    details: {
      fabric: "100% cotton",
      color: ["Black", "Cream", "Pink"],
      care: "Machine wash, tumble dry low",
      gsm: 250,
    },
  },
  {
    slug: "2-man-sticker",
    title: "TWO MAN STICKER",
    price: 2.0,
    images: ["/stickerStudio.png"],
    variants: [
      {
        color: "default",
        label: "Default",
        images: ["/stickerStudio.png"],
      },
    ],
    description: "2in X 2in Vinyl Sticker depicting the Two Man Sticker.\n Ideal for water bottles, laptop shells, skateboards, surfboards, or your friends forehead.",
    stripePriceId: "price_1SFmIeP6lKVtJIIMWxLCJ91R",
    sizeType: "none",
    shippingSpeed: "3-5",
  },
  // {
  //   slug: "dog-tee",
  //   title: "DOG TEE",
  //   price: 32,
  //   images: ["/productPhotos/dogTeeFront.png", "/productPhotos/dogTeeBack.png", "/dogTeeVisual.jpg"],
  //   variants: [
  //     {
  //       color: "White",
  //       label: "White",
  //       images: ["/productPhotos/dogTeeFront.png", "/productPhotos/dogTeeBack.png", "/dogTeeVisual.jpg"],
  //     },
  //   ],
  //   description: "The Dog Tee features our \'B\' chest logo and dog back logo with the \'Two Brothers\' spell out. \n Printed on our contrast stitch cotton blank, shrinks slightly in the wash.",
  //   stripePriceId: "price_1SmLaoP6lKVtJIIMFIItxoSN",
  //   sizeType: "standard",
  //   shippingSpeed: "7-14",
  //   details: {
  //     fabric: "100% cotton",
  //     color: ["Black", "White"],
  //     care: "Machine wash, tumble dry low",
  //     gsm: 240,
  //   },
  // },
  
  // {
  //   slug: "dickies-pants",
  //   title: "TWO Dickies",
  //   price: 45,
  //   images: ["/dickiesStudioFront.png", "/dickiesBack.jpeg", "/dickiesVisual3.jpeg", "/dickiesVisual2.jpeg"],

  //   // images: ["/dickiesFront.jpeg", "/dickiesBack.jpeg", "/dickiesVisual3.jpeg", "/dickiesVisual2.jpeg"],
  //   description: "The \`TWO\` Dickies feature a creme \"Dickies\" patch and or TWO print above the back right pocket \n This pair is a size 34x34, please contact us separate if you want a different size and we will do our best to make one for you!",
  //   stripePriceId: "price_1Stc7yP6lKVtJIIMMlAy828q",
  //   oneOfOne: true,
  //   waistOptions: ["34"],
  //   inseamOptions: ["34"],
  //   sizeType: "pants",
  //   shippingSpeed: "3-5",
  //   details: {  
  //     fabric: "65% Poly/35% Cotton",
  //     color: ["Black", "White"],
  //     care: "Machine wash, tumble dry low",
  //     gsm: 200,
  //   },
  // },
  // {
  //   slug: "2-man-sticker",
  //   title: "TWO MAN STICKER",
  //   price: 2.0,
  //   images: ["/stickerStudio.png"],
  //   description: "2in X 2in Vinyl Sticker depicting the Two Man Sticker.\n Ideal for water bottles, laptop shells, skateboards, surfboards, or your friends forehead.",
  //   stripePriceId: "price_1SFmIeP6lKVtJIIMWxLCJ91R",
  //   sizeType: "none",
  //   shippingSpeed: "3-5",
  // },
  // {
  //   slug: "two-tee",
  //   title: "TWO TEE",
  //   price: 30,
  //   images: ["/twoTeeStudio.png", "/productPhotos/twoTeeBack.png", "/twoTeeVisual1.png", "/twoTeeVisual.png"],
  //   variants: [
  //     {
  //       color: "black",
  //       label: "Black",
  //       images: ["/twoTeeStudio.png", "/productPhotos/twoTeeBack.png", "/twoTeeVisual1.png", "/twoTeeVisual.png"],
  //     },
  //   ],
  //   description: "The \'TWO\' Tee is a perfect boxy fit tee with our TWO stamp and a stitched seam going down the back. \n Printed on a shakwear blank.",
  //   stripePriceId: "price_1T7Mb8P6lKVtJIIMC9djUa1Y",
  //   sizeType: "standard",
  //   shippingSpeed: "3-5",
  //   details: {
  //     fabric: "100% cotton",
  //     color: ["Black", "White"],
  //     care: "Machine wash, tumble dry low",
  //     gsm: 260,
  //   },
  // },
  // {
  //   slug: "brother-tee",
  //   title: "BROTHER TEE",
  //   price: 25,
  //   images: ["/brotherStudio.png", "/brotherBack.png", "/brotherVisual.png"],
  //   description: "The \'BROTHER\' Tee is a perfect boxy fit tee with our Brother stamp with a plus underneath. \n Printed on a shakwear blank.",
  //   stripePriceId: "price_1SwAJaP6lKVtJIIMoADhnfrK",
  //   sizeType: "standard",
  //   shippingSpeed: "3-5",
  //   details: {
  //     fabric: "100% cotton",
  //     color: ["Black", "White"],
  //     care: "Machine wash, tumble dry low",
  //     gsm: 260,
  //   },
  // },
  
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

export type NormalizedVariant = {
  color: string;
  label?: string;
  images: string[];
  stripePriceId?: string;
};
export type ProductNormalized = Omit<Product, "variants" | "images"> & {
  variants: NormalizedVariant[];
};

function toNormalizedVariantArray(p: Product): NormalizedVariant[] {
  if (Array.isArray(p.variants) && p.variants.length > 0) {
    return p.variants.map((v): NormalizedVariant => ({
      color: v.color || "default",
      label: v.label || undefined,
      images: v.images || p.images,
      stripePriceId: v.stripePriceId || p.stripePriceId,
    }));
  }
  const imgs = p.images as string[] | undefined;
  return [
    {
      color: "default",
      label: "Default",
      images: imgs && imgs.length ? imgs : [],
      stripePriceId: p.stripePriceId,
    },
  ];
}

export const productsNormalized: ProductNormalized[] = products.map((p) => ({
  ...p,
  variants: toNormalizedVariantArray(p),
}));

export function getPrimaryImage(p: Product | ProductNormalized): string | undefined {
  const variants = (p as ProductNormalized).variants ?? (p as Product).variants;
  if (variants && variants.length > 0 && variants[0].images?.length) return variants[0].images[0];
  if ("images" in p) {
    const imgs = (p as Product).images;
    return imgs?.[0];
  }
  return undefined;
}

export function getHoverImage(p: Product | ProductNormalized): string | undefined {
  const variants = (p as ProductNormalized).variants ?? (p as Product).variants;
  if (variants && variants.length > 1 && variants[1].images?.length) return variants[1].images[0];
  if (variants && variants.length > 0 && variants[0].images?.length > 1) return variants[0].images[1];
  if ("images" in p) {
    const imgs = (p as Product).images;
    return imgs?.[1];
  }
  return undefined;
}

