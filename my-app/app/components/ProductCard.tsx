import Image from "next/image";

export type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
  hoverImage: string;
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const wrapperClass = ["group", className].filter(Boolean).join(" ");

  return (
    <div className={wrapperClass}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-black/10">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 25vw"
          priority={false}
        />
        <Image
          src={product.hoverImage}
          alt=""
          fill
          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 25vw"
          priority={false}
        />
      </div>
      <div className="mt-3">
        <h3 className="text-xs tracking-[0.2em] font-bold uppercase">{product.title}</h3>
        <p className="text-sm font-semibold mt-1">{product.price}</p>
      </div>
    </div>
  );
}

