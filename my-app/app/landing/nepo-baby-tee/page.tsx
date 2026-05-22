import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import NepoBabyLanding from "./NepoBabyLanding";
import { products } from "@/app/shop/products";
import { getInventoryForSlug, getInventoryDisplayForSlug } from "@/lib/inventory";

export const dynamic = "force-dynamic";

const nepoBabyTeeProduct = products.find((p) => p.slug === "nepo-baby-tee");

export const metadata: Metadata = nepoBabyTeeProduct
  ? {
      title: `${nepoBabyTeeProduct.title} | Two Brothers`,
      description: nepoBabyTeeProduct.description.split("\n")[0],
    }
  : { title: "Shop | Two Brothers" };

export default async function NepoBabyTeeLandingPage() {
  if (!nepoBabyTeeProduct) notFound();
  const inventoryBySize = await getInventoryForSlug(nepoBabyTeeProduct.slug);
  const inventoryDisplay = await getInventoryDisplayForSlug(nepoBabyTeeProduct.slug);

  return (
    <>
      <section className="max-w-5xl lg:max-w-6xl xl:max-w-none xl:w-[80vw] mx-auto px-3 md:px-6 pt-8 md:pt-16 lg:pt-22 pb-20 grid md:grid-cols-[3fr_2fr] gap-4 md:gap-0 min-h-[70dvh]">
        <NepoBabyLanding
          product={nepoBabyTeeProduct}
          inventoryBySize={inventoryBySize}
          inventoryDisplay={inventoryDisplay}
        />
      </section>
      <Footer />
    </>
  );
}
