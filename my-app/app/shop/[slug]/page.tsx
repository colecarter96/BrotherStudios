import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, type ColorVariant } from "../products";
import Footer from "@/app/components/Footer";
import ProductPurchase from "@/app/components/ProductPurchase";
import ImageCarousel from "@/app/components/ImageCarousel";
import ProductDetails from "@/app/components/ProductDetails";
import VariantView from "./VariantView";

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
  const ogImg = product.variants?.[0]?.images?.[0] ?? product.images?.[0];
  return {
    title: `${product.title} | Shop`,
    description: product.description,
    openGraph: { images: ogImg ? [ogImg] : [] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const soldOut = await isSoldOut(product.slug, product.oneOfOne);
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  if (hasVariants) {
    return (
      <>
        <section className="max-w-5xl lg:max-w-6xl xl:max-w-none xl:w-[80vw] mx-auto px-3 md:px-6 pt-8 md:pt-16 lg:pt-22 pb-20 grid md:grid-cols-[3fr_2fr] gap-8 lg:gap-12 min-h-[70dvh]">
          <VariantView product={product} soldOut={soldOut} />
        </section>
        <Footer />
      </>
    );
  }
  const variants: ColorVariant[] | undefined = product.variants;
  const images: string[] = (product.variants?.[0]?.images as string[] | undefined) ?? product.images;
  const displayImages: string[] = [...images].reverse();
  const colorPriceIds: Record<string, string | undefined> | undefined = Array.isArray(variants)
    ? variants.reduce((acc, v) => {
        acc[v.color] = v.stripePriceId || product.stripePriceId;
        return acc;
      }, {} as Record<string, string | undefined>)
    : undefined;

  return (
    <>
      <section className="max-w-5xl lg:max-w-6xl xl:max-w-none xl:w-[80vw] mx-auto px-3 md:px-6 pt-4 md:pt-28 lg:pt-32 pb-20 grid md:grid-cols-[3fr_2fr] gap-8 lg:gap-12 min-h-[70dvh]">
        <div className="pt-22 md:pt-0 md:mt-0">
          {/* Mobile: swipeable carousel with arrows */}
          <div className="md:hidden -mx-3">
            {displayImages.length > 1 ? (
              <ImageCarousel images={displayImages} alt={product.title} />
            ) : (
              <div className="relative w-full aspect-square overflow-hidden rounded-none md:rounded-lg">
                <div className="absolute -inset-[3px]">
                  <Image src={displayImages[0]} alt={product.title} fill className="object-cover" priority />
                </div>
              </div>
            )}
          </div>
          {/* Desktop: sticky vertical scrollable image stack */}
          <div className="hidden md:block">
            <div className="space-y-0 pr-0">
              {displayImages.map((src, i) => (
                <div key={i} className="overflow-hidden">
                  <Image
                    src={src}
                    alt={`${product.title} ${i + 1}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="block will-change-transform"
                    style={{ width: "100%", height: "auto", transform: "scale(1.035)", transformOrigin: "center" }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:sticky md:top-28 md:self-start md:pt-0 lg:top-48">
          <h1 className="text-xl md:text-xl font-semibold tracking-tighter mb-0">{product.title}</h1>
          <p className="text-lg md:text-lg font-semibold tracking-tighter mt-0">${product.price.toFixed(2)}</p>
          <ProductPurchase
            slug={product.slug}
            stripePriceId={product.stripePriceId}
            enableSizes={product.sizeType === "standard"}
            title={product.title}
            image={images[0]}
            waistOptions={product.waistOptions}
            inseamOptions={product.inseamOptions}
            soldOut={soldOut}
            colorOptions={Array.isArray(variants) && variants.length > 0 ? variants.map(v => ({ value: v.color, label: v.label })) : undefined}
            colorPriceIds={colorPriceIds}
          />
          {/* Details dropdown (above description) */}
          <section className="mt-8">
            <details className="group border-t border-black/10 pt-4">
              <summary className="flex items-center justify-between cursor-pointer text-base md:text-lg font-semibold tracking-tighter">
                DETAILS
                <span className="ml-2 text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="mt-3 text-sm md:text-base">
                <ProductDetails details={product.details} />
              </div>
            </details>
          </section>
          <p className="my-10 text-base md:text-lg font-semibold tracking-titter whitespace-pre-line">{product.description}</p>
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

