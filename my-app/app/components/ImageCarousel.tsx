"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [idx, setIdx] = useState(0);
  const total = images.length;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const horizontalLock = useRef<boolean>(false);

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = null;
    const t = e.targetTouches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    horizontalLock.current = false;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.targetTouches[0];
    touchEndX.current = t.clientX;
    if (touchStartX.current !== null && touchStartY.current !== null) {
      const dx = t.clientX - touchStartX.current;
      const dy = t.clientY - touchStartY.current;
      // Decide if this is a horizontal drag; small slop of 8px
      if (!horizontalLock.current && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        horizontalLock.current = true;
      }
      // When horizontally dragging, prevent vertical scroll from hijacking
      if (horizontalLock.current) {
        e.preventDefault();
      }
    }
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50; // px
    if (Math.abs(distance) < threshold) return;
    if (distance > 0) {
      next();
    } else {
      prev();
    }
    horizontalLock.current = false;
  };

  return (
    <div
      className="relative w-full aspect-square overflow-hidden rounded-none md:rounded-lg touch-pan-y select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
    >
      <Image src={images[idx]} alt={alt} fill className="object-contain" />

      {total > 1 && (
        <>
          <button
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full text-xl hover:bg-white text-black font-bold flex items-center justify-center"
          >
            ⟵
          </button>
          <button
            aria-label="Next image"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full text-xl hover:bg-white text-black font-bold flex items-center justify-center"
          >
            ⟶
          </button>
        </>
      )}
    </div>
  );
}


