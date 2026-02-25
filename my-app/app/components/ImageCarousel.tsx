"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const total = images.length;
  const [idx, setIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const horizontalLock = useRef<boolean>(false);

  const canPrev = idx > 0;
  const canNext = idx < total - 1;
  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(total - 1, i + 1));

  const slideWidth = useMemo(() => containerRef.current?.clientWidth ?? 0, [containerRef.current]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.targetTouches[0];
    startXRef.current = t.clientX;
    startYRef.current = t.clientY;
    setDragDeltaX(0);
    setIsDragging(true);
    horizontalLock.current = false;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.targetTouches[0];
    if (startXRef.current !== null && startYRef.current !== null) {
      const dx = t.clientX - startXRef.current;
      const dy = t.clientY - startYRef.current;
      if (!horizontalLock.current && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        horizontalLock.current = true;
      }
      if (horizontalLock.current) {
        e.preventDefault();
        setDragDeltaX(dx);
      }
    }
  };

  const onTouchEnd = () => {
    if (startXRef.current === null) {
      setIsDragging(false);
      setDragDeltaX(0);
      return;
    }
    const distance = dragDeltaX;
    const threshold = Math.max(50, slideWidth * 0.15);
    if (Math.abs(distance) >= threshold) {
      if (distance < 0 && canNext) next();
      else if (distance > 0 && canPrev) prev();
    }
    setIsDragging(false);
    setDragDeltaX(0);
    horizontalLock.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square overflow-hidden rounded-none md:rounded-lg touch-pan-y select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
    >
      <div
        className="h-full flex"
        style={{
          width: `${total * 100}%`,
          transform: `translateX(calc(${-idx * (100 / total)}% + ${dragDeltaX}px))`,
          transition: isDragging ? "none" : "transform 300ms ease-out",
        }}
      >
        {images.map((src, i) => (
          <div key={i} className="relative h-full overflow-hidden" style={{ width: `${100 / total}%` }}>
            <div className="absolute -inset-[3px]">
              <Image src={src} alt={alt} fill className="object-cover" priority={i === idx} />
            </div>
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            aria-label="Previous image"
            onClick={() => !isDragging && canPrev && prev()}
            disabled={!canPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full text-xl hover:bg-white text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            〈
          </button>
          <button
            aria-label="Next image"
            onClick={() => !isDragging && canNext && next()}
            disabled={!canNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full text-xl hover:bg-white text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            〉
          </button>
        </>
      )}
    </div>
  );
}

