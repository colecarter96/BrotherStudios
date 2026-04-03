"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageCarousel from "@/app/components/ImageCarousel";
import ProductPurchase from "@/app/components/ProductPurchase";
import ProductDetails from "@/app/components/ProductDetails";
import type { Product, ColorVariant } from "../products";

type Props = {
  product: Product;
  soldOut?: boolean;
};

export default function VariantView({ product, soldOut }: Props) {
  const variants: ColorVariant[] | undefined = product.variants;
  const hasVariants = Array.isArray(variants) && variants.length > 0;
  const [selectedColor, setSelectedColor] = useState<string>(hasVariants ? variants![0].color : "");

  const currentVariant = useMemo(
    () => (hasVariants ? variants!.find((v) => v.color === selectedColor) ?? variants![0] : undefined),
    [hasVariants, variants, selectedColor]
  );

  const images: string[] = hasVariants ? (currentVariant?.images || []) : product.images;
  const displayImages: string[] = [...images].reverse();
  const priceId: string | undefined = hasVariants ? (currentVariant?.stripePriceId || product.stripePriceId) : product.stripePriceId;
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
            <div className="relative w-full aspect-square overflow-hidden rounded-none md:rounded-lg">
              <div className="absolute -inset-[3px]">
                <Image src={displayImages[0] || product.images[0]} alt={product.title} fill className="object-cover" priority />
              </div>
            </div>
          )}
        </div>
        {/* Desktop stack */}
        <div className="hidden md:block">
          <div className="space-y-0 pr-0">
            {(displayImages.length ? displayImages : product.images).map((src, i) => (
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

      {/* Right: details + purchase */}
      <div className="md:sticky md:top-28 md:self-start md:pt-0 lg:top-48">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter">{product.title}</h1>
        <p className="text-xl md:text-2xl font-semibold tracking-tighter">${product.price.toFixed(2)}</p>

        <ProductPurchase
          slug={product.slug}
          stripePriceId={priceId}
          enableSizes={enableSizes}
          title={product.title}
          image={(images[0] || product.images[0])}
          soldOut={soldOut}
          colorOptions={
            hasVariants
              ? variants!.map((v) => ({ value: v.color, label: v.label || v.color }))
              : undefined
          }
          color={hasVariants ? selectedColor : undefined}
          onColorChange={hasVariants ? setSelectedColor : undefined}
        />

        {/* Details dropdown (above description) */}
        <section className="mt-8">
          <details className="group border-t border-black/10 pt-4">
            <summary className="flex items-center justify-between cursor-pointer text-base md:text-lg font-semibold tracking-titter">
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
            <summary className="flex items-center justify-between cursor-pointer text-base md:text-lg font-semibold tracking-titter">
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
    </>
  );
}

