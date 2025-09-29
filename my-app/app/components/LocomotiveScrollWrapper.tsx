"use client";

import { useEffect, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

interface Props {
  children: React.ReactNode;
}

export default function LocomotiveScrollWrapper({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scroll: { destroy: () => void } | null = null;

    (async () => {
      if (!containerRef.current) return;

      // Dynamically import so it only runs in the browser
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      scroll = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        multiplier: 1,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });
    })();

    return () => {
      if (scroll) scroll.destroy();
      scroll = null;
    };
  }, []);

  return (
    <div
      data-scroll-container
      ref={containerRef}
      className="min-h-screen overflow-hidden"
    >
      {children}
    </div>
  );
}
