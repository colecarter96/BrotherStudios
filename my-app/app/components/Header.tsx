"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BagButton from "./BagButton";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className={`md:hidden fixed top-4 left-0 right-0 ${menuOpen ? "z-120" : "z-70"} px-4`}>
        <div className={`flex items-center justify-between h-14 rounded-2xl px-4 `}>
          <Link href="/" aria-label="Home">
            <Image src="/logo.svg" alt="Logo" width={80} height={32} />
          </Link>
          <div className="flex items-center gap-3">
            <BagButton />
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative w-8 h-6 flex items-center justify-center"
            >
              <span
                className={`absolute block h-[3px] w-12 bg-black transition-transform duration-300 ${
                  menuOpen ? "rotate-45 translate-y-0" : "-translate-y-[5px]"
                }`}
              />
              <span
                className={`absolute block h-[3px] w-12 bg-black transition-transform duration-300 ${
                  menuOpen ? "-rotate-45 translate-y-0" : "translate-y-[5px]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-100 bg-white/10 backdrop-blur-lg transition-all duration-300 animate-[fade-in_0.25s_ease-out]">
          <nav className="h-full w-full flex items-center">
            <ul className="text-5xl font-semibold tracking-tighter space-y-4 text-left px-8">
              <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards]">
                <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
              </li>
              <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards] [animation-delay:80ms]">
                <Link href="/lookbook" onClick={() => setMenuOpen(false)}>Lookbook</Link>
              </li>
              {/* <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards] [animation-delay:120ms]">
                <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
              </li> */}
              <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards] [animation-delay:200ms]">
                <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              </li>
              <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards] [animation-delay:280ms]">
                <Link href="/videos" onClick={() => setMenuOpen(false)}>Videos</Link>
              </li>
              {/* <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards] [animation-delay:360ms]">
                <Link href="/magazine" onClick={() => setMenuOpen(false)}>Magazine</Link>
              </li> */}
            </ul>
          </nav>
        </div>
      )}

      {/* Desktop Header */}
      <header className={`hidden md:flex fixed top-0 left-0 right-0 z-50 bg-transparent h-16`}>
        <div className="mx-auto w-[90vw] flex items-center justify-between">
          {/* Left: Two-man logo -> home */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Two Brothers" width={60} height={60} />
          </Link>

          {/* Right: Shop and Bag */}
          <nav className="flex items-center gap-6 text-md font-semibold">
            <Link href="/shop" className="hover:opacity-80 transition">SHOP</Link>
            <Link href="/lookbook" className="hover:opacity-80 transition">LOOKBOOK</Link>
            {/* <Link href="/magazine" className="hover:opacity-80 transition">MAGAZINE</Link> */}
            <Link href="/videos" className="hover:opacity-80 transition">VIDEOS</Link>
            <BagButton />
          </nav>
        </div>
      </header>
    </>
  );
}
