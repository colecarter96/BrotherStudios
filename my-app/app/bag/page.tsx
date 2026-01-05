"use client";

import Link from "next/link";
import { useCart } from "@/app/components/useCart";
import { useState } from "react";

export default function BagPage() {
  const { items, updateItem, removeItem, clear, checkout } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQtyChange = (index: number, value: number) => {
    const qty = Math.max(1, Number.isFinite(value) ? value : 1);
    updateItem(index, { quantity: qty });
  };

  const handleSizeChange = (index: number, size: string) => {
    updateItem(index, { size });
  };

  const hasItems = items.length > 0;

  return (
    <section className="max-w-4xl mx-auto px-6 pt-36 pb-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter mb-8">BAG</h1>

      {!hasItems && (
        <div className="text-lg">
          Your bag is empty.{" "}
          <Link href="/shop" className="bg-black text-white border-2 px-3 py-3 rounded-sm">
            Continue shopping
          </Link>
          
        </div>
      )}

      {hasItems && (
        <>
          <ul className="divide-y divide-black/10 border-t border-b border-black/10">
            {items.map((item, index) => (
              <li key={`${item.priceId}-${index}`} className="py-5">
                <div className="font-semibold text-xl">
                  {item.title || "Product"}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {(item.size || item.slug === "dog-tee") && (
                    <label className="flex items-center gap-2">
                      <span className="text-sm">Size</span>
                      <select
                        className="border border-black/20 rounded-md px-2 py-1"
                        value={item.size || ""}
                        onChange={(e) => handleSizeChange(index, e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    </label>
                  )}
                  <label className="flex items-center gap-2">
                    <span className="text-sm">Qty</span>
                    <input
                      type="number"
                      min={1}
                      className="border border-black/20 rounded-md px-2 py-1 w-20"
                      value={item.quantity}
                      onChange={(e) => handleQtyChange(index, Number(e.target.value))}
                    />
                  </label>
                  <button
                    className="text-sm text-red-700 cursor-pointer border-2 px-2 py-2 rounded-sm"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={async () => {
                try {
                  setIsCheckingOut(true);
                  await checkout();
                } catch (e) {
                  setIsCheckingOut(false);
                }
              }}
              disabled={isCheckingOut}
              className="inline-flex items-center justify-center rounded-xs px-6 py-2 bg-black text-white font-semibold text-sm md:text-lg cursor-pointer"
            >
              {isCheckingOut ? "Redirecting..." : "Checkout"}
            </button>
            <button
              onClick={clear}
              className="text-sm border-2 px-3 py-3 rounded-sm cursor-pointer"
            >
              Clear bag
            </button>
            <Link href="/shop" className="text-sm border-2 px-3 py-3 rounded-sm cursor-pointer">
              Continue shopping
            </Link>
          </div>
        </>
      )}
    </section>
  );
}


