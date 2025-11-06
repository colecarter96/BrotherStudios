"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [idx, setIdx] = useState(0);
  const total = images.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-lg">
      <Image src={images[idx]} alt={alt} fill className="object-contain" />

      {total > 1 && (
        <>
          <button
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full text-xl hover:bg-white text-black font-bold flex items-center justify-center"
          >
            ‹
          </button>
          <button
            aria-label="Next image"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full text-xl hover:bg-white text-black font-bold flex items-center justify-center"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}


