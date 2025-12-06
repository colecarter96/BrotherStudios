"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Footer from "../../components/Footer";

type Section = {
  id: string;
  title: string;
  element: React.ReactNode;
};

export default function MagazineViewer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sections: Section[] = useMemo(
    () => [
      {
        id: "cover",
        title: "Cover",
        element: (
          <div className="relative w-full h-full flex items-end overflow-hidden bg-stone-900">
            {/* <Image
              src="/logo.svg"
              alt="Two Brothers — studio still"
              fill
              className="object-cover"
              priority
            /> */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 p-6 md:p-10">
              <div className="inline-block bg-white px-3 py-1 text-[10px] md:text-xs font-semibold tracking-widest">
                     
              </div>
              <h1 className="mt-3 text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tighter leading-[0.95] max-w-[20ch]">
                TWO BROTHERS
              </h1>
              <p className="mt-4 max-w-[60ch] text-sm md:text-base text-white font-medium">
                An editorial from the studio—documenting process, people and the culture around durable design.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "letter",
        title: "Editor’s Letter",
        element: (
          <div className="mx-auto max-w-[800px]">
            <h2 className="text-xs md:text-sm font-semibold tracking-widest mb-4">EDITOR&apos;S LETTER</h2>
            <p className="text-lg md:text-2xl leading-relaxed">
              Two Brothers is a lifestyle project born from family and craft. We honestly just love to make stuff
              that we want to wear, and document experiences that we find fun. We wouldn&apos;t put something out to
              Two Brothers if we wouldn&apos;t wear it ourselves.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-black" />
              <div>
                <div className="text-sm font-semibold">Editors — The Brothers</div>
                <div className="text-xs opacity-70">Two Brothers Studio</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "everyday-tee",
        title: "The Everyday Tee",
        element: (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
            <div className="md:col-span-3 relative aspect-[3/2] md:aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/dogTeeFront.png" alt="Dog Tee — front" fill className="object-cover" />
            </div>
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">The Dog Tee</h3>
              <p className="mt-3 text-base md:text-lg leading-relaxed">
                A staple silhouette with reinforced seams, weighted cotton and a graphic that Bryce and I designed
                in Newport Beach, CA.
              </p>
              <Link href="/shop" className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">
                Shop the collection
              </Link>
            </div>
          </div>
        ),
      },
      {
        id: "quote",
        title: "On Durability",
        element: (
          <blockquote className="text-2xl md:text-5xl font-extrabold leading-tight tracking-tight">
            “I just want to make cool stuff for us, hopefully people like it...”
          </blockquote>
        ),
      },
      {
        id: "process",
        title: "From sketch to street",
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
            <div className="md:col-span-2">
              <h4 className="text-xs md:text-sm font-semibold tracking-widest mb-2">PROCESS</h4>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">From Sketch To Your Back</h3>
              <p className="mt-3 text-base md:text-lg leading-relaxed">
                This digital mag is so that people can see our process behind the brand and how we hopefully grow overtime.
                It will come in issues and show the different stages.
              </p>
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <Image src="/plusHoodieFront.png" alt="Plus Hoodie — front" fill className="object-cover" />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const getIndexFromId = useCallback(
    (id: string | null) => {
      if (!id) return 0;
      const idx = sections.findIndex((s) => s.id === id);
      return idx >= 0 ? idx : 0;
    },
    [sections]
  );

  const [currentIndex, setCurrentIndex] = useState(() => getIndexFromId(searchParams.get("p")));

  // Sync with query param
  useEffect(() => {
    const idx = getIndexFromId(searchParams.get("p"));
    setCurrentIndex(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const goToIndex = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, sections.length - 1));
      const target = sections[clamped];
      const sp = new URLSearchParams(Array.from(searchParams.entries()));
      sp.set("p", target.id);
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
      // Scroll top of the content panel
      if (typeof window !== "undefined") {
        const content = document.getElementById("magazine-content");
        content?.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pathname, router, searchParams, sections]
  );

  const onNext = () => goToIndex(currentIndex + 1);
  const onPrev = () => goToIndex(currentIndex - 1);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const [tocOpen, setTocOpen] = useState(false);
  const current = sections[currentIndex];

  return (
    <main className="bg-white text-black pt-20"> {/* pad for fixed header */}
      {/* Mobile fallback */}
      <div className="md:hidden px-6 py-24 text-center">
        <p className="text-sm">
          This magazine is designed for desktop. Please view on a larger screen.
        </p>
      </div>

      <div className="hidden md:grid mx-auto w-[92vw] max-w-[1600px] grid-cols-[260px_minmax(0,1fr)] gap-8">
        {/* Left: TOC */}
        <aside className="md:sticky md:top-20 md:self-start">
          {/* Mobile TOC toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setTocOpen((v) => !v)}
              className="w-full border border-black/10 rounded-lg px-4 py-3 text-left font-semibold"
            >
              Table of Contents
            </button>
            {tocOpen && (
              <ul className="mt-3 border border-black/10 rounded-lg divide-y">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        setTocOpen(false);
                        goToIndex(i);
                      }}
                      className={`w-full text-left px-4 py-3 ${i === currentIndex ? "bg-black text-white" : "hover:bg-black/5"}`}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Desktop TOC */}
          <div className="hidden md:block">
            <div className="text-xs font-semibold tracking-widest mb-3">CONTENTS</div>
            <ul className="space-y-1">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => goToIndex(i)}
                    className={`w-full text-left px-3 py-2 rounded-xs transition ${
                      i === currentIndex ? "bg-black text-white" : "hover:bg-black/5"
                    }`}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right: Content */}
        <section className="h-[88vh] flex flex-col">
          {/* Top: Page indicator only */}
          <div className="flex items-center justify-end px-4 md:px-6 py-2">
            <div className="flex items-baseline gap-1 select-none">
              <span className="text-4xl md:text-6xl font-extrabold text-black/25 leading-none">
                {currentIndex + 1}
              </span>
              <span className="text-4xl md:text-6xl font-extrabold text-black leading-none">
                /{sections.length}
              </span>
            </div>
          </div>

          {/* Page viewport: fixed, fills most of the screen, scrolls internally if needed */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-6">
            <div className="relative w-full max-w-[1200px] h-full">
              <div id="magazine-content" className="absolute inset-0 overflow-auto p-4 md:p-8">
                {current.element}
              </div>
            </div>
          </div>

          {/* Navigation bar */}
          <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-3">
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              className="px-2 py-1 text-2xl disabled:opacity-30 hover:opacity-70 transition"
              aria-label="Previous page"
            >
              ←
            </button>
            <button
              onClick={onNext}
              disabled={currentIndex === sections.length - 1}
              className="px-2 py-1 text-2xl disabled:opacity-30 hover:opacity-70 transition"
              aria-label="Next page"
            >
              →
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <section className="text-black bg-white mt-12">
        <Footer />
      </section>
    </main>
  );
}


