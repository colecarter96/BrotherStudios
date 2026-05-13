"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BagButton from "./BagButton";
import BagDrawer from "./BagDrawer";
import {
  getFeaturedIssueLabel,
  getFeaturedIssueShopHref,
  isDropTeaserMode,
  shopCollectionHref,
} from "@/lib/shopCollection";

function ShopDropdownDesktop() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="transition hover:opacity-80"
      >
        SHOP
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-48  py-2 text-left text-sm font-semibold"
        >
          <Link
            href={getFeaturedIssueShopHref()}
            role="menuitem"
            className="block px-4 py-2 transition "
            onClick={close}
          >
            {getFeaturedIssueLabel()}
          </Link>
          <Link
            href={shopCollectionHref("archive")}
            role="menuitem"
            className="block px-4 py-2 transition "
            onClick={close}
          >
            ARCHIVE
          </Link>
          <Link href={shopCollectionHref("all")} role="menuitem" className="block px-4 py-2 " onClick={close}>
            ALL
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const dropTeaserOn = isDropTeaserMode();

  return (
    <>
      <div className={`md:hidden fixed top-4 left-0 right-0 ${menuOpen ? "z-120" : "z-70"} px-4`}>
        <div className={`flex items-center justify-between h-14 rounded-2xl px-4 `}>
          <Link href="/" aria-label="Home">
            <Image src="/logo.svg" alt="Logo" width={80} height={32} />
          </Link>
          <div className="flex items-center gap-3">
            <BagButton onClick={() => setBagOpen(true)} />
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

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-100 bg-white/10 backdrop-blur-lg transition-all duration-300 animate-[fade-in_0.25s_ease-out]">
          <nav className="h-full w-full flex items-center">
            <ul className="text-5xl font-semibold tracking-tighter space-y-4 text-left px-8">
              {dropTeaserOn ? (
                <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards]">
                  <Link href="/shop" onClick={() => setMenuOpen(false)}>
                    ARCHIVE
                  </Link>
                </li>
              ) : (
                <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards]">
                  <details className="group">
                    <summary className="cursor-pointer list-none transition [&::-webkit-details-marker]:hidden">
                      Shop
                    </summary>
                    <ul className="mt-3 space-y-3 pl-4 text-3xl font-semibold tracking-tighter">
                      <li>
                        <Link href={getFeaturedIssueShopHref()} onClick={() => setMenuOpen(false)}>
                          {getFeaturedIssueLabel()}
                        </Link>
                      </li>
                      <li>
                        <Link href={shopCollectionHref("archive")} onClick={() => setMenuOpen(false)}>
                          ARCHIVE
                        </Link>
                      </li>
                      <li>
                        <Link href={shopCollectionHref("all")} onClick={() => setMenuOpen(false)}>
                          ALL
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
              )}
              <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards] [animation-delay:80ms]">
                <Link href="/lookbook" onClick={() => setMenuOpen(false)}>
                  Lookbook
                </Link>
              </li>
              <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards] [animation-delay:200ms]">
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </li>
              <li className="opacity-0 animate-[slide-up_0.35s_ease-out_forwards] [animation-delay:280ms]">
                <Link href="/videos" onClick={() => setMenuOpen(false)}>
                  Videos
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <header className={`hidden md:flex fixed top-0 left-0 right-0 z-50 bg-transparent h-16`}>
        <div className="mx-auto w-[90vw] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Two Brothers" width={60} height={60} />
          </Link>

          <nav className="flex items-center gap-6 text-base font-semibold">
            {dropTeaserOn ? (
              <Link href="/shop" className="transition hover:opacity-80">
                ARCHIVE
              </Link>
            ) : (
              <ShopDropdownDesktop />
            )}
            <Link href="/videos" className="hover:opacity-80 transition">
              VIDEOS
            </Link>
            <BagButton onClick={() => setBagOpen(true)} />
          </nav>
        </div>
      </header>
      <BagDrawer open={bagOpen} onClose={() => setBagOpen(false)} />
    </>
  );
}
