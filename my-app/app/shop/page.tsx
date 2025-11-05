import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { products } from "./products";

export default function Shop() {
    return (
    <>
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-40 justify-items-stretch min-h-[80dvh] mb-20">
          {products.map((p) => (
            <Link key={p.slug} href={`/shop/${p.slug}`} className="group block">
              <div className="relative w-full aspect-square">
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
  