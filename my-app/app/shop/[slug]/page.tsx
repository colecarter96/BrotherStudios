import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "../products";
import Footer from "@/app/components/Footer";
import ProductPurchase from "@/app/components/ProductPurchase";
import ImageCarousel from "@/app/components/ImageCarousel";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.title} | Shop`,
    description: product.description,
    openGraph: { images: product.images.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <section className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto p-6 pt-40 grid md:grid-cols-2 gap-8 min-h-[70dvh]">
        <div>
          {product.images.length > 1 ? (
            <ImageCarousel images={product.images} alt={product.title} />
          ) : (
            <div className="relative aspect-square overflow-hidden">
              <Image src={product.images[0]} alt={product.title} fill className="object-contain" />
            </div>
          )}
        </div>
        <div className="md:pt-10 lg:pt-16">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter">{product.title}</h1>
          <p className="mt-2 text-3xl md:text-4xl font-semibold tracking-tighter">${product.price.toFixed(2)}</p>
          <ProductPurchase
            slug={product.slug}
            stripePriceId={product.stripePriceId}
            enableSizes={product.slug === "dog-tee"}
            title={product.title}
          />
          <p className="mt-10 text-base md:text-lg font-semibold tracking-titter ">{product.description}</p>
          
        </div>
      </section>
      <Footer />
    </>
  );
}

