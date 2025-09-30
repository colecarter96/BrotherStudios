export type Product = {
  slug: string;
  title: string;
  price: number;
  images: string[];
  description: string;
};

export const products: Product[] = [
  {
    slug: "2-man-sticker",
    title: "2 Man Stickers",
    price: 2.0,
    images: ["/2manblackstickimg.svg"],
    description: "High quality vinyl sticker of the two-man logo. Email colescarter@gmail.com if interested!",
  },
];

