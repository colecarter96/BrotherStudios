"use client";

import ProductCard, { Product } from "./ProductCard";
import { useEffect, useRef } from "react";

const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Logo Tee",
    price: "$48",
    image:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
    hoverImage:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
  },
  {
    id: "2",
    title: "Heavy Hoodie",
    price: "$98",
    image:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
    hoverImage:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
  },
  {
    id: "3",
    title: "Work Jacket",
    price: "$168",
    image:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
    hoverImage:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
  },
  {
    id: "4",
    title: "Canvas Tote",
    price: "$38",
    image:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
    hoverImage:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
  },
  {
    id: "5",
    title: "Carpenter Pant",
    price: "$128",
    image:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
    hoverImage:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
  },
  {
    id: "6",
    title: "Canvas Cap",
    price: "$38",
    image:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
    hoverImage:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
  },
  {
    id: "7",
    title: "Logo Crewneck",
    price: "$88",
    image:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
    hoverImage:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
  },
  {
    id: "8",
    title: "Coach Jacket",
    price: "$158",
    image:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
    hoverImage:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F01%2Fstussy-spring-2020-collection-campaign-imagery-3.jpg?w=1260&cbr=1&q=90&fit=max",
  },
];

interface HorizontalProductsProps {
  products?: Product[];
}

export default function HorizontalProducts({ products = sampleProducts }: HorizontalProductsProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function setHeights() {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const trackWidth = track.scrollWidth;

      const extraScrollNeeded = Math.max(trackWidth - viewportWidth, 0);
      const requiredSectionHeight = viewportHeight + extraScrollNeeded;

      wrapper.style.height = `${requiredSectionHeight}px`;

      // Hint Locomotive to recalc positions after DOM style change
      window.dispatchEvent(new Event("resize"));
    }

    setHeights();
    window.addEventListener("resize", setHeights);
    return () => window.removeEventListener("resize", setHeights);
  }, []);

  return (
    <section className="text-black bg-white" data-scroll-section>
      {/* Mobile: vertical grid */}
      <div className="sm:hidden px-6 py-12">
        <div className="grid grid-cols-2 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Desktop: sticky horizontal on vertical scroll */}
      <div ref={wrapperRef} className="hidden sm:block relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 px-8 pr-[40vw]"
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="1"
          >
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                className="w-[60vw] md:w-[40vw] lg:w-[28vw] xl:w-[22vw] 2xl:w-[20vw]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

