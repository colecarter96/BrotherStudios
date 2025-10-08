import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { products } from "./products";
import { redirect } from "next/navigation";

export default function Shop() {
    // Temporary: redirect /shop to the sticker product page
    redirect('/shop/2-man-sticker');
    return (
    <>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-40 justify-items-center md:justify-items-start min-h-[80dvh]">
          {products.map((p) => (
            <Link key={p.slug} href={`/shop/${p.slug}`} className="group">
              <div className="relative w-80 h-80 md:w-100 md:h-100">
                <Image src={p.images[0]} alt={p.title} fill className="object-contain" />
              </div>
              <h2 className="font-semibold text-2xl mt-2">{p.title}</h2>
              <p className="font-semibold text-xl -mt-1">${p.price.toFixed(2)}</p>
            </Link>
          ))}
          </div>
        </div>
        <Footer />
    </>
      
    );
  }
  