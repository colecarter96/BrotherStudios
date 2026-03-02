"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/components/useCart";
import { useState } from "react";
import { products } from "@/app/shop/products";

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

  const getPriceForItem = (slug?: string): number | null => {
    if (!slug) return null;
    const p = products.find((pp) => pp.slug === slug);
    return p ? p.price : null;
  };

  return (
    <section className="mx-auto w-[92vw] max-w-7xl pt-28 pb-20">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter mb-6">Bag</h1>

      {!hasItems && (
        <div className="text-lg px-2">
          Your bag is empty.{" "}
          <Link href="/shop" className="bg-black text-white border-2 px-3 py-2 rounded-sm">
            Continue shopping
          </Link>
          
        </div>
      )}

      {hasItems && (
        <>
          <ul className="divide-y divide-black/10 border-t border-b border-black/10 bg-white">
            {items.map((item, index) => (
              <li key={`${item.priceId}-${index}`} className="py-4 px-2">
                {/* Mobile: single large square image spanning full width */}
                {item.image && (
                  <div className="md:hidden mb-3">
                    <div className="relative w-full aspect-square overflow-hidden border border-black/10 bg-white">
                      <Image src={item.image as string} alt={item.title || "Product"} fill className="object-cover" />
                    </div>
                  </div>
                )}
                <div className="md:grid md:grid-cols-[300px_1fr] md:grid-rows-[auto_auto] gap-4 items-start">
                  {/* Left: single large square image spanning two rows (desktop) */}
                  <div className="hidden md:block md:row-span-2">
                    {item.image && (
                      <div className="relative w-full aspect-square overflow-hidden border border-black/10 bg-white">
                        <Image src={item.image as string} alt={item.title || "Product"} fill className="object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Row 1 right: Name left, Qty + Size right */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-semibold text-lg md:text-xl tracking-tight truncate">
                        {item.title || "Product"}
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Qty</span>
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQtyChange(index, (item.quantity || 1) - 1)}
                            className="px-3 py-2 text-base"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min={1}
                            className="w-16 text-center px-2 py-2 text-base outline-none border-none bg-transparent"
                            value={item.quantity}
                            onChange={(e) => handleQtyChange(index, Number(e.target.value))}
                          />
                          <button
                            onClick={() => handleQtyChange(index, (item.quantity || 1) + 1)}
                            className="px-3 py-2 text-base"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {(item.size || item.slug === "dog-tee") && (
                        <label className="flex items-center gap-2">
                          <span className="text-sm">Size</span>
                          <select
                            className="border-none bg-transparent px-2 py-2 text-base"
                            value={item.size || ""}
                            onChange={(e) => handleSizeChange(index, e.target.value)}
                          >
                            <option value="">-</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                          </select>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Row 2 right: Price (right), Remove below right */}
                  <div className="flex flex-col items-end justify-end gap-2">
                    <div className="min-w-20 text-right font-semibold">
                      {(() => {
                        const price = getPriceForItem(item.slug);
                        return price !== null ? `$${(price * (item.quantity || 1)).toFixed(2)}` : "";
                      })()}
                    </div>
                    <button
                      className="text-base text-red-600 cursor-pointer border border-red-600 px-4 py-2"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>

                  {/* Mobile controls under name (within flow) */}
                  <div className="mt-2 flex md:hidden items-center gap-4 justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Qty</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQtyChange(index, (item.quantity || 1) - 1)}
                          className="px-3 py-2 text-base"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          className="w-16 text-center px-2 py-2 text-base outline-none border-none bg-transparent"
                          value={item.quantity}
                          onChange={(e) => handleQtyChange(index, Number(e.target.value))}
                        />
                        <button
                          onClick={() => handleQtyChange(index, (item.quantity || 1) + 1)}
                          className="px-3 py-2 text-base"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {(item.size || item.slug === "dog-tee") && (
                      <label className="flex items-center gap-2">
                        <span className="text-sm">Size</span>
                        <select
                          className="border-none bg-transparent px-2 py-2 text-base"
                          value={item.size || ""}
                          onChange={(e) => handleSizeChange(index, e.target.value)}
                        >
                          <option value="">-</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                        </select>
                      </label>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-end gap-3 px-2">
            <Link href="/shop" className="inline-flex items-center justify-center px-5 py-3 bg-black text-white font-semibold text-base">
              Shop
            </Link>
            <button
              onClick={clear}
              className="inline-flex items-center justify-center px-5 py-3 border border-red-600 text-red-600 bg-white font-semibold text-base"
            >
              Clear
            </button>
            <button
              onClick={async () => {
                try {
                  setIsCheckingOut(true);
                  await checkout();
                } catch {
                  setIsCheckingOut(false);
                }
              }}
              disabled={isCheckingOut}
              className="inline-flex items-center justify-center px-5 py-3 bg-blue-400 text-black font-semibold text-base disabled:opacity-60"
            >
              {isCheckingOut ? "Redirecting..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}


