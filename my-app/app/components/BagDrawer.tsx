"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./useCart";
import { products } from "@/app/shop/products";

type BagDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function BagDrawer({ open, onClose }: BagDrawerProps) {
  const { items, updateItem, removeItem, clear, checkout } = useCart();
  const [checkoutError, setCheckoutError] = useState<string>("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

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
    <div aria-hidden={!open} className={`fixed inset-0 z-120 overscroll-contain ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full md:w-1/2 bg-white shadow-xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 border-b border-black/10 bg-white">
          <h2 className="text-lg md:text-xl font-semibold tracking-tighter">BAG</h2>
          <button
            aria-label="Close bag"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-2xl hover:opacity-80"
          >
            ×
          </button>
        </div>

        {/* Actions (top) – keep Clear only */}
        {hasItems && (
          <div className="px-4 py-3 flex items-center justify-end gap-3 border-b border-black/10">
            <button
              onClick={clear}
              className="inline-flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 bg-white font-semibold text-sm"
            >
              Clear
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {!hasItems && (
            <div className="p-6 text-lg">
              Your bag is empty.{" "}
              {/* <Link href="/shop" onClick={onClose} className="bg-black text-white border-2 px-3 py-2 rounded-sm">
                Continue shopping
              </Link> */}
            </div>
          )}

          {hasItems && (
            <ul className="divide-y divide-black/10">
              {items.map((item, index) => (
                <li key={`${item.priceId}-${index}`} className="py-4 px-4">
                  {/* Mobile image */}
                  {item.image && (
                    <div className="md:hidden mb-3">
                      <div className="relative w-full aspect-square overflow-hidden border border-black/10 bg-white">
                        <Image src={item.image as string} alt={item.title || "Product"} fill className="object-cover" />
                      </div>
                    </div>
                  )}
                  <div className="md:grid md:grid-cols-[220px_1fr] md:grid-rows-[auto_auto] gap-4 items-start">
                    {/* Desktop image */}
                    <div className="hidden md:block md:row-span-2">
                      {item.image && (
                        <div className="relative w-full aspect-square overflow-hidden border border-black/10 bg-white">
                          <Image src={item.image as string} alt={item.title || "Product"} fill className="object-cover" />
                        </div>
                      )}
                    </div>

                    {/* Row 1 right: name + controls */}
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
                        {item.size && (
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

                    {/* Row 2 right: price + remove */}
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

                    {/* Mobile controls */}
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
                      {item.size && (
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
          )}
        </div>
        {/* Sticky bottom actions: Continue Shopping + Checkout */}
        <div className="sticky bottom-2 md:bottom-4 bg-white border-t border-black/10 px-3 md:px-6 py-3">
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <Link
              href="/shop"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center px-4 py-3 bg-white text-black font-semibold text-sm border border-black"
            >
              CONTINUE SHOPPING
            </Link>
            <button
              onClick={async () => {
                try {
                  setCheckoutError("");
                  await checkout();
                } catch {
                  // no-op
                  setCheckoutError("Checkout failed. Please try again.");
                }
              }}
              className="inline-flex w-full items-center justify-center px-4 py-3 bg-black text-white font-semibold text-sm"
            >
              CHECKOUT
            </button>
          </div>
          {checkoutError && (
            <div className="px-3 md:px-6 pb-3 text-sm text-red-600">{checkoutError}</div>
          )}
        </div>
      </div>
    </div>
  );
}

