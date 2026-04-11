"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageCarousel from "@/app/components/ImageCarousel";
import ProductPurchase from "@/app/components/ProductPurchase";
import ProductDetails from "@/app/components/ProductDetails";
import type { Product, ColorVariant } from "../products";
import { useSearchParams } from "next/navigation";

type Props = {
  product: Product;
  soldOut?: boolean;
};

export default function VariantView({ product, soldOut }: Props) {
  const variants: ColorVariant[] | undefined = product.variants;
  const hasVariants = Array.isArray(variants) && variants.length > 0;
  const [selectedColor, setSelectedColor] = useState<string>(hasVariants ? variants![0].color : "");
  const searchParams = useSearchParams();

  // Preselect from sessionStorage when navigating from the shop listing
  useEffect(() => {
    if (!hasVariants) return;
    try {
      const key = `prefColor:${product.slug}`;
      const stored = typeof window !== "undefined" ? window.sessionStorage.getItem(key) : null;
      if (stored) {
        const match = variants!.find((v) => v.color.toLowerCase() === stored.toLowerCase());
        if (match) setSelectedColor(match.color);
        if (typeof window !== "undefined") window.sessionStorage.removeItem(key);
      }
    } catch {
      // ignore
    }
  }, [hasVariants, product.slug, variants]);

  const currentVariant = useMemo(
    () => (hasVariants ? variants!.find((v) => v.color === selectedColor) ?? variants![0] : undefined),
    [hasVariants, variants, selectedColor]
  );

  // Preselect color from query param ?color=...
  useEffect(() => {
    if (!hasVariants) return;
    const q = searchParams?.get("color");
    if (!q) return;
    const match = variants!.find((v) => v.color.toLowerCase() === q.toLowerCase());
    if (match && match.color !== selectedColor) {
      setSelectedColor(match.color);
    }
  }, [hasVariants, searchParams, variants, selectedColor]);
  type Img = string | { src: string; aspect?: "5:7" | "auto" };
  const rawImages: Img[] = hasVariants ? ((currentVariant?.images as Img[]) || []) : (product.images as Img[]);
  const images = rawImages.map((im) => (typeof im === "string" ? { src: im, aspect: "auto" as const } : { src: im.src, aspect: im.aspect ?? "auto" }));
  const displayImages = [...images].reverse();
  const priceId: string | undefined = hasVariants ? (currentVariant?.stripePriceId || product.stripePriceId) : product.stripePriceId;
  const colorPriceIds: Record<string, string | undefined> | undefined = hasVariants
    ? Object.fromEntries(variants!.map((v) => [v.color, v.stripePriceId || product.stripePriceId]))
    : undefined;
  const enableSizes = product.sizeType === "standard";

  return (
    <>
      {/* Left: images */}
      <div className="pt-22 md:pt-0 md:mt-0">
        {/* Mobile carousel */}
        <div className="md:hidden -mx-3">
          {displayImages.length > 1 ? (
            <ImageCarousel images={displayImages} alt={product.title} />
          ) : (
            <>
              {displayImages[0]?.aspect === "5:7" ? (
                <div className="relative w-full aspect-5/7 overflow-hidden rounded-none md:rounded-lg">
                  <div className="absolute -inset-[3px]">
                    <Image src={displayImages[0].src} alt={product.title} fill className="object-cover" priority />
                  </div>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <Image
                    src={
                      displayImages[0]?.src ||
                      (typeof product.images[0] === "string"
                        ? (product.images[0] as string)
                        : (product.images[0] as any)?.src)
                    }
                    alt={product.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto", transform: "scale(1.03)", transformOrigin: "center" }}
                    className="block"
                    priority
                  />
                </div>
              )}
            </>
          )}
        </div>
        {/* Desktop stack */}
        <div className="hidden md:block">
          <div className="space-y-0 pr-0">
            {(displayImages.length ? displayImages : images).map((im, i) => (
              <div key={i} className="relative w-full h-[92vh] overflow-hidden">
                <Image
                  src={im.src}
                  alt={`${product.title} ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain bg-white"
                  style={im.aspect === "auto" ? { transform: "scale(1.03)", transformOrigin: "center" } : undefined}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: details + purchase */}
      <div className="md:sticky md:top-28 md:self-start md:pt-0 lg:top-48">
        <h1 className="text-lg md:text-xl font-semibold tracking-tighter">{product.title}</h1>
        <p className="text-lg md:text-xl font-semibold tracking-tighter">${product.price.toFixed(2)}</p>

        <ProductPurchase
          slug={product.slug}
          stripePriceId={priceId}
          enableSizes={enableSizes}
          title={product.title}
          image={(images[0]?.src || (typeof product.images[0] === "string" ? (product.images[0] as string) : (product.images[0] as any)?.src))}
          soldOut={soldOut}
          colorOptions={
            hasVariants
              ? variants!.map((v) => ({ value: v.color, label: v.label || v.color }))
              : undefined
          }
          color={hasVariants ? selectedColor : undefined}
          onColorChange={hasVariants ? setSelectedColor : undefined}
          colorPriceIds={colorPriceIds}
        />

        {/* Details dropdown (above description) */}
        <section className="mt-8">
          <details className="group border-t border-black/10 pt-4">
            <summary className="flex items-center justify-between cursor-pointer text-base md:text-base font-semibold tracking-titter">
              DETAILS
              <span className="ml-2 text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="mt-3 text-sm">
              <ProductDetails details={product.details} />
            </div>
          </details>
        </section>
        <p className="my-10 text-sm md:text-base font-semibold tracking-titter whitespace-pre-line">{product.description}</p>
        {/* Shipping dropdown */}
        <section className="mt-8">
          <details className="group border-t border-black/10 pt-4">
            <summary className="flex items-center justify-between cursor-pointer text-base md:text-base font-semibold tracking-titter">
              SHIPPING
              <span className="ml-2 text-lg transition-transform group-open:rotate-45">+</span>
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
    </>
  );
}

