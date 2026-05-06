"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ImageCarousel from "@/app/components/ImageCarousel";
import ProductDetails from "@/app/components/ProductDetails";
import ProductSizeChart from "@/app/components/ProductSizeChart";
import { useCart } from "@/app/components/useCart";
import type { Product, ColorVariant, ImageSpec } from "@/app/shop/products";

const RETURN_PATH = "/landing/nepo-baby-tee";

type Props = {
  product: Product;
};

export default function NepoBabyLanding({ product }: Props) {
  const variants: ColorVariant[] | undefined = product.variants;
  const hasVariants = Array.isArray(variants) && variants.length > 0;
  const [selectedColor, setSelectedColor] = useState<string>(hasVariants ? variants![0].color : "");
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const searchParams = useSearchParams();
  const { addItem } = useCart();

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

  useEffect(() => {
    if (!hasVariants) return;
    const q = searchParams?.get("color");
    if (!q) return;
    const match = variants!.find((v) => v.color.toLowerCase() === q.toLowerCase());
    if (match) setSelectedColor(match.color);
  }, [hasVariants, searchParams, variants]);

  const currentVariant = useMemo(
    () => (hasVariants ? variants!.find((v) => v.color === selectedColor) ?? variants![0] : undefined),
    [hasVariants, variants, selectedColor]
  );

  type Img = string | { src: string; aspect?: "5:7" | "auto" };
  const rawImages: Img[] = hasVariants ? ((currentVariant?.images as Img[]) || []) : (product.images as Img[]);
  const images = rawImages.map((im) =>
    typeof im === "string" ? { src: im, aspect: "auto" as const } : { src: im.src, aspect: im.aspect ?? "auto" }
  );
  const displayImages = [...images].reverse();
  const computedPriceId = hasVariants
    ? currentVariant?.stripePriceId || product.stripePriceId
    : product.stripePriceId;
  const colorPriceIds: Record<string, string | undefined> | undefined = hasVariants
    ? Object.fromEntries(variants!.map((v) => [v.color, v.stripePriceId || product.stripePriceId]))
    : undefined;
  const effectiveColor = selectedColor;
  const resolvedPriceId = (effectiveColor && colorPriceIds?.[effectiveColor]) || computedPriceId;

  const imgToSrc = (im: ImageSpec | undefined): string | undefined => (typeof im === "string" ? im : im?.src);
  const enableSizes = product.sizeType === "standard";
  const showSize = enableSizes;
  const sizeValid = !showSize || Boolean(size);
  const qty = Math.max(1, Number.isFinite(quantity) ? quantity : 1);
  const canAct = Boolean(resolvedPriceId) && sizeValid;
  const soldOut = Boolean(product.soldOut);

  const setQty = (n: number) => {
    const next = Math.max(1, Number.isFinite(n) ? n : 1);
    setQuantity(next);
  };

  async function goToStripe() {
    setFormError("");
    if (!resolvedPriceId) {
      setFormError("Checkout is not configured yet.");
      return;
    }
    if (soldOut) {
      setFormError("This product is sold out.");
      return;
    }
    if (showSize && !size) {
      setFormError("Please select a size.");
      return;
    }
    try {
      setCheckoutLoading(true);
      const returnTo = encodeURIComponent(RETURN_PATH);
      const res = await fetch(
        `/api/checkout?slug=${encodeURIComponent(product.slug)}&return_to=${returnTo}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            priceId: resolvedPriceId,
            quantity: qty,
            metadata: {
              size: showSize ? size : undefined,
              slug: product.slug,
              title: product.title,
            },
          }),
        }
      );
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setFormError(data.error || "Unable to start checkout.");
      }
    } catch {
      setFormError("Unable to start checkout.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      <div className="pt-22 md:pt-0 md:mt-0">
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
                    src={displayImages[0]?.src || imgToSrc(product.images?.[0]) || ""}
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

      <div className="md:sticky md:top-28 md:self-start md:pt-0 lg:top-48">
        <h1 className="text-lg md:text-xl font-semibold tracking-tighter">{product.title}</h1>
        <p className="text-lg md:text-xl font-semibold tracking-tighter">${product.price.toFixed(2)}</p>

        <div className="mt-2 md:mt-8">
          {Array.isArray(variants) && variants.length > 1 && (
            <div className="mb-4">
              <div className="block text-sm md:text-base font-semibold mb-2">Color</div>
              <div role="radiogroup" aria-label="Color" className="flex flex-wrap gap-2">
                {variants.map((opt) => {
                  const selected = (effectiveColor || variants[0].color) === opt.color;
                  return (
                    <button
                      key={opt.color}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      title={opt.label || opt.color}
                      onClick={() => setSelectedColor(opt.color)}
                      className={`relative h-7 w-9 md:h-8 md:w-10 border ${
                        selected ? "border-black ring-2 ring-black" : "border-black/20"
                      } focus:outline-none focus:ring-2 focus:ring-black`}
                      style={{ backgroundColor: opt.color }}
                    >
                      <span className="sr-only">{opt.label || opt.color}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {showSize && (
            <div className="mb-4">
              <div className="block text-sm md:text-base font-semibold mb-2">Size</div>
              {!sizeValid && <div className="mb-2 text-sm text-blue-400">Please select a size.</div>}
              <div role="radiogroup" aria-label="Size" className="flex flex-wrap gap-x-1 gap-y-2 justify-start w-full">
                {["S", "M", "L", "XL"].map((opt) => {
                  const selected = size === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSize(opt)}
                      className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-base md:text-lg font-semibold focus:outline-none ${
                        selected ? "text-blue-400" : "text-black hover:text-blue-400"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-4">
            <div className="block text-sm md:text-base font-semibold mb-2">Quantity</div>
            <div className="flex items-center gap-2 max-w-[200px]">
              <button
                type="button"
                onClick={() => setQty(qty - 1)}
                className="px-3 py-2 text-base border border-black/20 hover:border-black"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                className="w-16 text-center px-2 py-2 text-base outline-none border border-black/20"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2 text-base border border-black/20 hover:border-black"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled={!canAct || soldOut}
              onClick={() => {
                setFormError("");
                if (!resolvedPriceId) {
                  setFormError("This product is not available right now.");
                  return;
                }
                if (soldOut) {
                  setFormError("This product is sold out.");
                  return;
                }
                if (showSize && !size) {
                  setFormError("Please select a size.");
                  return;
                }
                addItem({
                  priceId: resolvedPriceId,
                  quantity: qty,
                  size: showSize ? size : undefined,
                  slug: product.slug,
                  title: product.title,
                  image: images[0]?.src || imgToSrc(product.images?.[0]),
                  color: effectiveColor || undefined,
                });
                setJustAdded(true);
                setTimeout(() => setJustAdded(false), 600);
              }}
              className={`mt-0 md:mt-1 inline-flex items-center justify-center px-4 py-3 w-full ${
                soldOut ? "bg-black/40" : justAdded ? "bg-blue-400" : "bg-black"
              } text-white font-semibold text-sm md:text-lg lg:text-lg disabled:cursor-not-allowed transition-colors duration-200`}
            >
              {soldOut ? "SOLD OUT" : showSize && !size ? "SELECT A SIZE" : justAdded ? "ADDED" : "ADD TO BAG"}
            </button>

            <button
              type="button"
              disabled={!canAct || soldOut || checkoutLoading || !resolvedPriceId}
              onClick={goToStripe}
              className="inline-flex items-center justify-center px-4 py-3 w-full bg-blue-400 text-black font-semibold text-sm md:text-lg lg:text-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checkoutLoading ? "Redirecting…" : "CHECKOUT"}
            </button>
          </div>

          {formError && (
            <div className="mt-3 text-sm text-red-600" role="status" aria-live="polite">
              {formError}
            </div>
          )}
        </div>

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
        {product.sizeChart ? (
          <section className="mt-8">
            <details className="group border-t border-black/10 pt-4">
              <summary className="flex items-center justify-between cursor-pointer text-base md:text-base font-semibold tracking-titter">
                SIZE CHART
                <span className="ml-2 text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="mt-3 text-sm">
                <ProductSizeChart chart={product.sizeChart} />
              </div>
            </details>
          </section>
        ) : null}
        <p className="my-10 text-sm md:text-base font-semibold tracking-titter whitespace-pre-line">{product.description}</p>
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
                International: limited pilot. Some items may ship free; others can incur higher costs depending on
                weight and region. Duties/taxes are typically paid by the recipient unless stated otherwise.
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
