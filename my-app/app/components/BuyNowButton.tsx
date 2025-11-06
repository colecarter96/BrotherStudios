"use client";

import { useState } from "react";

interface BuyNowButtonProps {
  priceId: string;
  slug: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
  disabled?: boolean;
}

export default function BuyNowButton({ priceId, slug, metadata, disabled }: BuyNowButtonProps) {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    if (!priceId) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/checkout?slug=${encodeURIComponent(slug)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, quantity: 1, metadata }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url as string;
      } else {
        alert(data?.error || "Unable to start checkout");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading || !priceId}
      className="mt-6 inline-flex items-center justify-center outline-solid outline-4 rounded-sm px-6 py-2 md:hover:bg-black md:hover:text-white bg-white text-black font-semibold text-sm md:text-lg disabled:opacity-50"
    >
      {loading ? "Redirecting…" : "Buy Now"}
    </button>
  );
}


