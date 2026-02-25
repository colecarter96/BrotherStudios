import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { products } from "./products";

export const dynamic = "force-dynamic";

async function getSoldOutSlugs(): Promise<Set<string>> {
  const oneOfOneSlugs = products.filter((p) => p.oneOfOne).map((p) => p.slug);
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
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/shop/${p.slug}`}
              className="group block border-2 border-transparent px-2"
            >
              <div className="relative w-full aspect-square overflow-hidden">
                {/* Base image */}
                <div className="absolute -inset-[2px]">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    className={`object-cover transition-none duration-500 ${p.images[1] ? "md:group-hover:opacity-0" : ""}`}
                  />
                </div>
                {/* Hover image (desktop only) */}
                {p.images[1] && (
                  <div className="absolute -inset-[2px]">
                    <Image
                      src={p.images[1]}
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
              <h2 className="font-semibold text-lg md:text-xl mt-2">{p.title}</h2>
              <p className="font-semibold text-md md:text-lg -mt-1">${p.price.toFixed(2)}</p>
            </Link>
          ))}
          </div>
        </div>
        <Footer />
    </>
      
    );
  }
  