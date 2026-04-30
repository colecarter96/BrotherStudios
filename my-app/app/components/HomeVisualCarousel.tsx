"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const IMAGES = [
  { src: "/SS26/handsomeWhiteVisual.png", alt: "Handsome Tee White" },
  { src: "/SS26/handsomeBlackVisual.png", alt: "Handsome Tee Black" },
  { src: "/SS26/visuals/climbingTeeBackBlack.jpeg", alt: "Climbing Tee Back Black" },
  { src: "/SS26/visuals/climbingTeeBackWhite.jpeg", alt: "Climbing Tee Back White" },
];

const ROTATE_MS = 2000;

export default function HomeVisualCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="hidden md:flex min-h-[92vh] items-center justify-center px-6" data-scroll-section>
        <div className="relative w-[min(72vw,760px)] aspect-square overflow-hidden bg-white">
          {IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`absolute inset-0 ${i === index ? "opacity-100" : "opacity-0"}`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(min-width: 768px) 760px, 72vw" />
            </div>
          ))}

          <Link href="/shop" className="absolute inset-0 z-10" aria-label="Browse shop" />

          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-10">
            <img
              src="/logo2.0.svg"
              alt="Brother Studios"
              width={520}
              height={182}
              className="w-[60%] h-auto brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3 pointer-events-none">
            <Link
              href="/shop"
              className="pointer-events-auto border border-white px-6 py-2 text-sm font-semibold tracking-wider text-white"
            >
              SHOP
            </Link>
            <div className="flex items-center gap-1">
              {IMAGES.map((img, i) => (
                <span
                  key={img.src}
                  className={`h-[3px] w-5 rounded-full ${i === index ? "bg-white" : "bg-white/45"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="md:hidden pt-20 px-4 pb-4 bg-white" data-scroll-section>
        <div className="relative h-[calc(100dvh-6rem)] w-full overflow-hidden bg-white">
          {IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`absolute inset-0 ${i === index ? "opacity-100" : "opacity-0"}`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="100vw" />
            </div>
          ))}

          <Link href="/shop" className="absolute inset-0 z-10" aria-label="Browse shop" />

          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-8">
            <img
              src="/logo2.0.svg"
              alt="Brother Studios"
              width={420}
              height={147}
              className="w-[78%] h-auto brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3 pointer-events-none">
            <Link
              href="/shop"
              className="pointer-events-auto border border-white px-8 py-2.5 text-sm font-semibold tracking-wider text-white"
            >
              SHOP
            </Link>
            <div className="flex items-center gap-1">
              {IMAGES.map((img, i) => (
                <span
                  key={img.src}
                  className={`h-[3px] w-5 rounded-full ${i === index ? "bg-white" : "bg-white/45"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
