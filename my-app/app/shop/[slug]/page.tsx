import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "../products";
import Footer from "@/app/components/Footer";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};
  return {
    title: `${product.title} | Shop`,
    description: product.description,
    openGraph: { images: product.images.slice(0, 1) },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return (
    <>
      <section className="max-w-5xl mx-auto p-6 pt-40 grid md:grid-cols-2 gap-8 min-h-[70dvh]">
        <div className="relative aspect-square overflow-hidden">
          <Image src={product.images[0]} alt={product.title} fill className="object-contain" />
        </div>
        <div>
          <h1 className="md:mt-10 text-3xl md:text-4xl font-semibold tracking-titter">{product.title}</h1>
          <p className="mt-2 text-3xl md:text-4xl font-semibold tracking-titter">${product.price.toFixed(2)}</p>
          <p className="mt-10 text-3xl md:text-4xl font-semibold tracking-titter ">{product.description}</p>
        </div>
      </section>
      <Footer />
    </>
  );
}

