"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) setVisible(true);
    } catch {
      // ignore
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem("cookieConsent", "accepted");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-60">
      <div className="mx-auto w-[92vw] max-w-[1400px] mb-4">
        <div className="bg-white text-black border border-black/10 rounded-xl px-4 py-3 md:px-6 md:py-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-sm leading-relaxed">
              We use essential cookies to make this site work and, with your consent, analytics to improve it.
              See our <Link href="/policies/cookies" className="underline underline-offset-4">Cookie Policy</Link>.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={accept}
                className="px-4 py-2 rounded-md border border-black/20 hover:bg-black/5 text-sm font-semibold"
                aria-label="Accept cookies"
              >
                Accept
              </button>
              <Link
                href="/policies/cookies"
                className="px-4 py-2 rounded-md text-sm font-semibold underline underline-offset-4"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

