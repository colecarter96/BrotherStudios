import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import VariantLink from "../components/VariantLink";
import { productsNormalized, type ProductNormalized } from "./products";

export const dynamic = "force-dynamic";

async function getSoldOutSlugs(): Promise<Set<string>> {
  const oneOfOneSlugs = productsNormalized.filter((p: ProductNormalized) => p.oneOfOne).map((p: ProductNormalized) => p.slug);
  if (oneOfOneSlugs.length === 0) return new Set();
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) return new Set();
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
    const sold = new Set<string>();
    for (const slug of oneOfOneSlugs) {
      const result = await stripe.paymentIntents.search({
        query: `status:'succeeded' AND metadata['slug']:'${slug}'`,
        limit: 1,
      });
      if ((result?.data?.length || 0) > 0) {
        sold.add(slug);
      }
    }
    return sold;
  } catch {
    return new Set();
  }
}

export default async function Shop() {
    const soldOut = await getSoldOutSlugs();
    return (
    <>
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:mx-[5%] gap-0 mt-40 justify-items-stretch items-start min-h-[80dvh] mb-20">
          {productsNormalized.flatMap((p) =>
            p.variants.map((v, vi) => {
              const imgAt = (idx: number) => {
                const it: any = v.images?.[idx];
                return typeof it === "string" ? it : it?.src;
              };
              const baseImg = imgAt(1) || imgAt(0);
              // Hover: prefer alternate image of the same variant
              const altA = imgAt(0);
              const altB = imgAt(1);
              const hoverImg = (altA && altA !== baseImg && altA) || (altB && altB !== baseImg && altB) || undefined;
              const hasHover = Boolean(hoverImg);
              return (
                <VariantLink
                  key={`${p.slug}__${vi}`}
                  href={`/shop/${p.slug}`}
                  slug={p.slug}
                  color={v.color}
                  className="group block border-2 border-transparent px-2"
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    {/* Base image */}
                    <div className="absolute -inset-[2px]">
                      <Image
                        src={baseImg || altA || ""}
                        alt={p.title}
                        fill
                        className={`object-cover transition-none duration-500 ${hasHover ? "md:group-hover:opacity-0" : ""}`}
                      />
                    </div>
                    {/* Hover image (desktop only) */}
                    {hasHover && (
                      <div className="absolute -inset-[2px]">
                        <Image
                          src={hoverImg as string}
                          alt={`${p.title} alternate`}
                          fill
                          className="hidden md:block object-cover opacity-0 md:group-hover:opacity-100 transition-none duration-500"
                        />
                      </div>
                    )}
                    {soldOut.has(p.slug) && (
                      <div className="absolute top-2 left-2 bg-black text-white text-xs md:text-sm font-semibold px-2 py-1">
                        SOLD OUT
                      </div>
                    )}
                  </div>
                  <h2 className="font-semibold text-base md:text-lg mt-2">{p.title}</h2>
                  <p className="font-medium text-base md:text-lg -mt-2">${p.price.toFixed(2)}</p>
                </VariantLink>
              );
            })
          )}
          </div>
        </div>
        <Footer />
    </>
      
    );
  }
  