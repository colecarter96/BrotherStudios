import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "../products";
import Footer from "@/app/components/Footer";
import ProductPurchase from "@/app/components/ProductPurchase";
import ImageCarousel from "@/app/components/ImageCarousel";
import ProductDetails from "@/app/components/ProductDetails";

export const dynamic = "force-dynamic";

async function isSoldOut(slug: string, oneOfOne?: boolean): Promise<boolean> {
  if (!oneOfOne) return false;
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) return false;
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
    const result = await stripe.paymentIntents.search({
      query: `status:'succeeded' AND metadata['slug']:'${slug}'`,
      limit: 1,
    });
    return (result?.data?.length || 0) > 0;
  } catch {
    return false;
  }
}

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
  const soldOut = await isSoldOut(product.slug, product.oneOfOne);

  return (
    <>
      <section className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto p-6 pt-40 grid md:grid-cols-2 gap-8 min-h-[70dvh]">
        <div>
          {/* Mobile: swipeable carousel with arrows */}
          <div className="md:hidden">
            {product.images.length > 1 ? (
              <ImageCarousel images={product.images} alt={product.title} />
            ) : (
              <div className="relative aspect-square overflow-hidden">
                <Image src={product.images[0]} alt={product.title} fill className="object-contain" />
              </div>
            )}
          </div>
          {/* Desktop: sticky vertical scrollable image stack */}
          <div className="hidden md:block">
            <div className="space-y-4 pr-2">
              {product.images.map((src, i) => (
                <div key={i} className="relative w-full aspect-square overflow-hidden">
                  <Image src={src} alt={`${product.title} ${i + 1}`} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:pt-10 lg:pt-16">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter">{product.title}</h1>
          <p className="mt-2 text-3xl md:text-4xl font-semibold tracking-tighter">${product.price.toFixed(2)}</p>
          <ProductPurchase
            slug={product.slug}
            stripePriceId={product.stripePriceId}
            enableSizes={product.slug === "dog-tee"}
            title={product.title}
            image={product.images[0]}
            waistOptions={product.waistOptions}
            inseamOptions={product.inseamOptions}
            soldOut={soldOut}
          />
          <p className="mt-10 text-base md:text-lg font-semibold tracking-titter whitespace-pre-line">{product.description}</p>
          <ProductDetails details={product.details} />
        </div>
      </section>
      <Footer />
    </>
  );
}

