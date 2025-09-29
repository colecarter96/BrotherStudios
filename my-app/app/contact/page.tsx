"use client";

import Footer from "../components/Footer";
import Script from "next/script";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    const initTypeform = () => {
      try {
        if (typeof window !== "undefined" && (window as unknown as { tf?: { load?: () => void } }).tf?.load) {
          (window as unknown as { tf?: { load?: () => void } }).tf?.load?.();
        }
      } catch {}
    };

    // Try immediately after mount (for client navigations when script already present)
    initTypeform();

    // Also attempt shortly after to catch script load timing
    const t = setTimeout(initTypeform, 50);

    // If the script tag exists, attach a one-time listener
    const existingScript = document.querySelector(
      'script[src="https://embed.typeform.com/next/embed.js"]'
    ) as HTMLScriptElement | null;
    existingScript?.addEventListener("load", initTypeform, { once: true });

    return () => {
      clearTimeout(t);
      existingScript?.removeEventListener("load", initTypeform as EventListener);
    };
  }, []);
  return (
    <>
      <section className="py-40">
        <div className="w-[90vw] md:w-[80vw] max-w-5xl mx-auto px-0 md:px-4">
          <p className="text-center text-sm md:text-base mb-6 font-medium">colescarter@gmail.com</p>
          <div className="w-full">
            <div data-tf-live="01K69JWTZAXPY11G6BMQR5Z2RQ" className="w-full" />
          </div>
        </div>
      </section>
      <Script src="https://embed.typeform.com/next/embed.js" strategy="afterInteractive" onLoad={() => {
        try {
          const w = window as unknown as { tf?: { load?: () => void } };
          w.tf?.load?.();
        } catch {}
      }} />
      <Footer />
    </>
  );
}
  