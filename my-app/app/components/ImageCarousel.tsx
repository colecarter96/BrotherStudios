"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ImageItem = { src: string; aspect?: "5:7" | "auto" };

interface ImageCarouselProps {
  images: ImageItem[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const realCount = images.length;
  const hasLoop = realCount > 1;
  // Augment slides for seamless circular scroll: [last, ...images, first]
  const augmented: ImageItem[] = hasLoop ? [images[realCount - 1], ...images, images[0]] : images;
  const total = augmented.length;
  // Start at index 1 (first real slide) when looping; else 0
  const [idx, setIdx] = useState(hasLoop ? 1 : 0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const horizontalLock = useRef<boolean>(false);
  const recentMovesRef = useRef<Array<{ t: number; x: number }>>([]);

  const canPrev = hasLoop ? true : idx > 0;
  const canNext = hasLoop ? true : idx < total - 1;
  const prev = () => setIdx((i) => (hasLoop ? i - 1 : Math.max(0, i - 1)));
  const next = () => setIdx((i) => (hasLoop ? i + 1 : Math.min(total - 1, i + 1)));

  // slide width is read on touch end; no memoization needed

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.targetTouches[0];
    startXRef.current = t.clientX;
    startYRef.current = t.clientY;
    setDragDeltaX(0);
    setIsDragging(true);
    setIsRestoring(false);
    horizontalLock.current = false;
    recentMovesRef.current = [{ t: performance.now(), x: t.clientX }];
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
        // Track for velocity
        const now = performance.now();
        recentMovesRef.current.push({ t: now, x: t.clientX });
        // keep last ~5 samples
        if (recentMovesRef.current.length > 5) recentMovesRef.current.shift();
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
    const width = containerRef.current?.clientWidth ?? 0;
    const threshold = Math.max(36, width * 0.1); // a bit easier

    // Compute approximate swipe velocity (px/ms) from recent samples
    let velocity = 0;
    const samples = recentMovesRef.current;
    if (samples.length >= 2) {
      const last = samples[samples.length - 1];
      // find a sample at least 30ms before last for stability
      let ref = samples[0];
      for (let i = samples.length - 2; i >= 0; i--) {
        if (last.t - samples[i].t >= 30) {
          ref = samples[i];
          break;
        }
      }
      const dt = last.t - ref.t || 1;
      velocity = (last.x - ref.x) / dt; // px/ms (+ right, - left)
    }
    const velocityThreshold = 0.35; // px/ms

    // Decide slide change using distance or velocity
    if (Math.abs(distance) >= threshold || Math.abs(velocity) > velocityThreshold) {
      if ((distance < 0 || velocity < -velocityThreshold) && canNext) next();
      else if ((distance > 0 || velocity > velocityThreshold) && canPrev) prev();
    }

    setIsDragging(false);
    setDragDeltaX(0);
    horizontalLock.current = false;
  };

  const onTransitionEnd = () => {
    if (!hasLoop) return;
    // If we landed on a clone, jump (without animation) to the corresponding real index
    if (idx === total - 1) {
      // Moved onto last clone (copy of first real) → jump to first real (1)
      setIsRestoring(true);
      setIdx(1);
      // allow next paint to remove restoring flag
      requestAnimationFrame(() => setIsRestoring(false));
    } else if (idx === 0) {
      // Moved onto first clone (copy of last real) → jump to last real (total-2)
      setIsRestoring(true);
      setIdx(total - 2);
      requestAnimationFrame(() => setIsRestoring(false));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-5/7 overflow-hidden rounded-none md:rounded-lg touch-pan-y select-none"
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
          transition: isDragging || isRestoring ? "none" : "transform 360ms cubic-bezier(0.22, 0.61, 0.36, 1)",
          willChange: "transform",
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {augmented.map((item, i) => (
          <div key={i} className="relative h-full overflow-hidden" style={{ width: `${100 / total}%` }}>
            <div className="absolute -inset-[3px]">
              <Image
                src={item.src}
                alt={alt}
                fill
                className={item.aspect === "5:7" ? "object-cover" : "object-contain bg-white"}
                priority={i === idx}
                style={item.aspect === "auto" ? { transform: "scale(1.03)", transformOrigin: "center" } : undefined}
              />
            </div>
          </div>
        ))}
      </div>

      {realCount > 1 && (
        <>
          <button
            aria-label="Previous image"
            onClick={() => !isDragging && canPrev && prev()}
            disabled={!canPrev && !hasLoop}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full text-xl hover:bg-white text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            〈
          </button>
          <button
            aria-label="Next image"
            onClick={() => !isDragging && canNext && next()}
            disabled={!canNext && !hasLoop}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full text-xl hover:bg-white text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            〉
          </button>
        </>
      )}
    </div>
  );
}

