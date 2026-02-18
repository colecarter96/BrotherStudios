import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
      <section className="max-w-5xl lg:max-w-6xl xl:max-w-none xl:w-[80vw] mx-auto px-3 md:px-6 pt-8 md:pt-16 lg:pt-22 pb-20 grid md:grid-cols-[3fr_2fr] gap-8 lg:gap-12 min-h-[70dvh]">
        <div className="pt-40 md:pt-0">
          {/* Mobile: swipeable carousel with arrows */}
          <div className="md:hidden -mx-3">
            {product.images.length > 1 ? (
              <ImageCarousel images={product.images} alt={product.title} />
            ) : (
              <div className="relative w-full aspect-square overflow-hidden rounded-none md:rounded-lg">
                <Image src={product.images[0]} alt={product.title} fill className="object-cover" priority />
              </div>
            )}
          </div>
          {/* Desktop: sticky vertical scrollable image stack */}
          <div className="hidden md:block">
            <div className="space-y-0 pr-0">
              {product.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${product.title} ${i + 1}`}
                  loading="lazy"
                  className="block w-full h-auto"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="md:sticky md:top-28 md:self-start md:pt-0 lg:top-48">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter">{product.title}</h1>
          <p className="mt-2 text-3xl md:text-4xl font-semibold tracking-tighter">${product.price.toFixed(2)}</p>
          <ProductPurchase
            slug={product.slug}
            stripePriceId={product.stripePriceId}
            enableSizes={product.sizeType === "standard"}
            title={product.title}
            image={product.images[0]}
            waistOptions={product.waistOptions}
            inseamOptions={product.inseamOptions}
            soldOut={soldOut}
          />
          <p className="my-10 text-base md:text-lg font-semibold tracking-titter whitespace-pre-line">{product.description}</p>
          <ProductDetails details={product.details} />
          {/* Shipping dropdown */}
          <section className="mt-8">
            <details className="group border-t border-black/10 pt-4">
              <summary className="flex items-center justify-between cursor-pointer text-base md:text-lg font-semibold tracking-tighter">
                SHIPPING
                <span className="ml-2 text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="mt-3 text-sm md:text-base">
                {product.shippingSpeed === "7-14" ? (
                  <p>
                    Domestic (USA): 1–3 business day handling plus a 7–14 day production window for this item.
                    USPS/UPS with tracking. Free shipping may be offered on select items or promotions.
                  </p>
                ) : (
                  <p>
                    Domestic (USA): 1–3 business day handling. USPS/UPS with tracking. Typical delivery window 3–5
                    business days after shipment. Free shipping may be offered on select items or promotions.
                  </p>
                )}
                <p className="mt-2">
                  International: limited pilot. Some items may ship free; others can incur higher costs depending
                  on weight and region. Duties/taxes are typically paid by the recipient unless stated otherwise.
                </p>
                <p className="mt-2">
                  Full details:{" "}
                  <Link href="/policies/shipping" className="underline underline-offset-4">
                    Shipping Policy
                  </Link>
                  <span className="mx-1">·</span>
                  <Link href="/policies/returns" className="underline underline-offset-4">
                    Returns
                  </Link>
                </p>
              </div>
            </details>
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
}

