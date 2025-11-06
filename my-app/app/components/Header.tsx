"use client";

import { useEffect, useState, useRef } from "react";
import type LocomotiveScroll from "locomotive-scroll";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // lazy import and init if container exists
    const tryInit = async () => {
      const container = document.querySelector("[data-scroll-container]");
      if (!(container instanceof HTMLElement)) return;

      if (scrollRef.current) return; // already initialized

      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      scrollRef.current = new LocomotiveScroll({
        el: container,
        smooth: true,
      });

      scrollRef.current.on("scroll", (...args: unknown[]) => {
        const payload = (args && args[0] ? args[0] : {}) as { scroll?: { y?: number } };
        const y = typeof payload?.scroll?.y === "number" ? payload.scroll.y : window.scrollY;
        setScrolled(y > 0);
      });
    };

    tryInit();

    return () => {
      scrollRef.current?.destroy();
      scrollRef.current = null;
    };
  }, []);

  // On route changes, sync blur with current scroll position
  useEffect(() => {
    if (typeof window !== "undefined") {
      setScrolled(window.scrollY > 0);
    }
    // Re-init or destroy Locomotive based on presence of container
    (async () => {
      const container = document.querySelector("[data-scroll-container]");
      const hasContainer = container instanceof HTMLElement;
      if (hasContainer && !scrollRef.current) {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        scrollRef.current = new LocomotiveScroll({ el: container as HTMLElement, smooth: true });
        scrollRef.current.on("scroll", (...args: unknown[]) => {
          const payload = (args && args[0] ? args[0] : {}) as { scroll?: { y?: number } };
          const y = typeof payload?.scroll?.y === "number" ? payload.scroll.y : window.scrollY;
          setScrolled(y > 0);
        });
      } else if (!hasContainer && scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    })();
  }, [pathname]);

  // Always provide a native scroll fallback when Locomotive isn't active
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      if (scrollRef.current) return; // Locomotive will handle
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-4 left-0 right-0 z-70 px-4">
        <div className={`flex items-center justify-between h-14 rounded-2xl px-4 `}>
          <Link href="/" aria-label="Home">
            <Image src="/logo.svg" alt="Logo" width={80} height={32} />
          </Link>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative w-8 h-6 flex items-center justify-center"
          >
            <span
              className={`absolute block h-[3px] w-12 bg-black transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-[0px]" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute block h-[3px] w-12 bg-black transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[0px]" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white/10 backdrop-blur-lg transition-all duration-300 animate-[fade-in_0.25s_ease-out]">
          <nav className="h-full w-full flex items-center">
            <ul className="text-5xl font-semibold tracking-tighter space-y-4 text-left px-8">
              <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards]">
                <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
              </li>
              <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards] [animation-delay:120ms]">
                <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
              </li>
              <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards] [animation-delay:200ms]">
                <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              </li>
              <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards] [animation-delay:280ms]">
                <Link href="/videos" onClick={() => setMenuOpen(false)}>Videos</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Desktop Header */}
      <header
        className={`hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 w-[95vw] rounded-3xl z-50 transition-colors duration-300 ${
          scrolled ? "bg-white/10 backdrop-blur-lg" : "bg-transparent"
        } items-center justify-between px-6 h-20 text-lg font-bold`}
      >
        <div className="flex ml-10 space-x-8">
          <button><Link href="/shop">Shop</Link></button>
          <button><Link href="/about">About</Link></button>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/"><Image src="/logo.svg" alt="Logo" width={100} height={40} /></Link>
        </div>

        <div className="flex mr-10 space-x-8">
          <button><Link href="/contact">Contact</Link></button>
          <button><Link href="/videos">Videos</Link></button>
        </div>
      </header>
    </>
  );
}
