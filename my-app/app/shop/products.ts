export type ShippingSpeed = "3-5" | "7-14";
export type SizeType = "standard" | "pants" | "none";

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
};

export type ProductDetails = {
  fabric?: string;
  color?: string | string[];
  care?: string;
  gsm?: number | string;
};

export const products: Product[] = [
  {
    slug: "climbing-tee-black",
    title: "CLIMBING SHIRT BLACK",
    price: 40,
    images: ["/SS26/climbingTeeBlackFront.webp", "/SS26/climbingTeeBlackBack.webp"],
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
    slug: "climbing-tee-white",
    title: "ClIMBING SHIRT WHITE",
    price: 40,
    images: ["/SS26/climbingTeeWhiteFront.webp", "/SS26/climbingTeeWhiteBack.webp"],
    // images: ["/championFront.jpeg", "/championBack.jpg", "/championVisual.jpg"],
    description: "This shirt is designed to allow freedom of movement, be durable and get better as you wear it. With contrast stitching and print, it will keep you styling on any expedition.\nFits true to size.",
    stripePriceId: "price_1T4pCDP6lKVtJIIM5NUrBiky",
    sizeType: "standard",
    shippingSpeed: "7-14",
    details: {
      fabric: "100% cotton",
      color: ["Gray", "Black"],
      care: "Machine wash, tumble dry low",
      gsm: 240,
    },
  },
  {
    slug: "champion-tee",
    title: "CHAMPION TEE",
    price: 45,
    images: ["/SS26/championTeeFront.webp", "/SS26/championTeeBack.webp"],
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
    slug: "soccer-tee",
    title: "SOCCER SHIRT",
    price: 50,
    images: ["/SS26/soccerShirtFront.webp", "/SS26/soccerShirtBack.webp"],
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
    slug: "sex-panthers-tee",
    title: "SEX PANTHERS",
    price: 45,
    images: ["/productPhotos/sexPanthersFront.webp", "/productPhotos/sexPanthersBack.webp", "/sexPVisual1.jpg", "/sexPVisual2.jpg" ],

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
    description: "2in X 2in Vinyl Sticker depicting the Two Man Sticker.\n Ideal for water bottles, laptop shells, skateboards, surfboards, or your friends forehead.",
    stripePriceId: "price_1SFmIeP6lKVtJIIMWxLCJ91R",
    sizeType: "none",
    shippingSpeed: "3-5",
  },
  // {
  //   slug: "dog-tee",
  //   title: "DOG TEE",
  //   price: 32,
  //   images: ["/SS26/soccerShirtBack.webp", "/dogTeeBack.png", "/dogTeeVisual.jpg"],
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
  //   price: 25,
  //   images: ["/twoTeeStudio.png", "/twoTeeBack.png", "/twoTeeVisual1.png", "/twoTeeVisual.png"],
  //   description: "The \'TWO\' Tee is a perfect boxy fit tee with our TWO stamp and a stitched seam going down the back. \n Printed on a shakwear blank.",
  //   stripePriceId: "price_1SwAWKP6lKVtJIIMVbo8zq0h",
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

