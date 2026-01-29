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
};

export type ProductDetails = {
  fabric?: string;
  color?: string | string[];
  care?: string;
  gsm?: number | string;
};

export const products: Product[] = [
  {
    slug: "champion-reverse",
    title: "\"TWO\" CHAMPION REVERSE",
    price: 65,
    images: ["/championFront.jpeg", "/championBack.jpg", "/championVisual.jpg"],
    description: "The \`TWO\` Champion Reverse Weave features custom stamps on the chest, hood, and forarm. \n Designed to look better the more you wear it. 1 of 1.",
    stripePriceId: "price_1SuoYmP6lKVtJIIMmc1vIDcw",
    details: {
      fabric: "82% cotton/18% polyester",
      color: ["Gray", "Black"],
      care: "Machine wash, tumble dry low",
      gsm: 400,
    },
  },
  {
    slug: "sex-panthers-tee",
    title: "SEX PANTHERS",
    price: 40,
    images: ["/sexPanthersFront.jpg", "/sexPanthersBack.jpg", "/sexPVisual1.jpg", "/sexPVisual2.jpg" ],
    description: "The Sex Panthers Tee features our premium vintage cotton blank with a full front and back print depicting two panthers and implicated relevant locations and dates. \n Fits large, size down if between sizes.",
    stripePriceId: "price_1Su4ptP6lKVtJIIMfQtnu739",
    details: {
      fabric: "100% cotton",
      color: ["Black", "Cream", "Pink"],
      care: "Machine wash, tumble dry low",
      gsm: 250,
    },
  },
  
  {
    slug: "dickies-pants",
    title: "TWO Dickies",
    price: 45,
    images: ["/dickiesFront.jpeg", "/dickiesBack.jpeg", "/dickiesVisual3.jpeg", "/dickiesVisual2.jpeg"],
    description: "The \`TWO\` Dickies feature a creme \"Dickies\" patch and or TWO print above the back right pocket \n This pair is a size 34x34, please contact us separate if you want a different size and we will do our best to make one for you!",
    stripePriceId: "price_1Stc7yP6lKVtJIIMMlAy828q",
    oneOfOne: true,
    waistOptions: ["34"],
    inseamOptions: ["34"],
    details: {  
      fabric: "65% Poly/35% Cotton",
      color: ["Black", "White"],
      care: "Machine wash, tumble dry low",
      gsm: 200,
    },
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
  {
    slug: "2-man-sticker",
    title: "TWO MAN STICKER",
    price: 2.0,
    images: ["/2manblackstickimg.svg"],
    description: "2in X 2in Vinyl Sticker depicting the Two Man Sticker.\n Ideal for water bottles, laptop shells, skateboards, surfboards, or your friends forehead.",
    stripePriceId: "price_1SFmIeP6lKVtJIIMWxLCJ91R",
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

