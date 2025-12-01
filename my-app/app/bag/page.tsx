"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/components/useCart";

export default function BagPage() {
  const { items, updateItem, removeItem, clear, checkout } = useCart();

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
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter mb-8">Your Bag</h1>

      {!hasItems && (
        <div className="text-lg">
          Your bag is empty.{" "}
          <Link href="/shop" className="underline">
            Continue shopping
          </Link>
          .
        </div>
      )}

      {hasItems && (
        <>
          <ul className="divide-y divide-black/10 border-t border-b border-black/10">
            {items.map((item, index) => (
              <li key={`${item.priceId}-${index}`} className="py-5 flex items-center gap-4">
                <div className="w-20 h-20 relative bg-white border border-black/10 rounded">
                  {item.image ? (
                    <Image src={item.image} alt={item.title || item.slug || "Item"} fill className="object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs">No Image</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">
                    {item.title || item.slug || "Product"}
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
                      className="text-sm underline"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={checkout}
              className="inline-flex items-center justify-center outline-solid outline-4 rounded-sm px-6 py-2 md:hover:bg-black md:hover:text-white bg-white text-black font-semibold text-sm md:text-lg"
            >
              Checkout
            </button>
            <button
              onClick={clear}
              className="text-sm underline"
            >
              Clear bag
            </button>
            <Link href="/shop" className="text-sm underline">
              Continue shopping
            </Link>
          </div>
        </>
      )}
    </section>
  );
}


