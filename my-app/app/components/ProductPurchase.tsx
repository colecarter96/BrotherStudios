"use client";

import { useState } from "react";
import BuyNowButton from "@/app/components/BuyNowButton";
import { useCart } from "@/app/components/useCart";

interface ProductPurchaseProps {
  slug: string;
  stripePriceId?: string;
  enableSizes?: boolean;
}

export default function ProductPurchase({ slug, stripePriceId, enableSizes }: ProductPurchaseProps) {
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem } = useCart();

  const showSize = !!enableSizes;
  const sizeValid = !showSize || Boolean(size);
  const canAdd = Boolean(stripePriceId) && sizeValid && quantity >= 1;

  return (
    <div className="mt-8">
      {showSize && (
        <div className="mb-4">
          <label htmlFor="size" className="block text-base md:text-lg font-semibold mb-2">Size</label>
          <select
            id="size"
            className="border border-black/20 rounded-md px-3 py-2 w-full max-w-xs"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">X-Large</option>
          </select>
        </div>
      )}

      <div className="flex items-start flex-col">
        <div>
          <label htmlFor="qty" className="block text-base md:text-lg font-semibold mb-2">Quantity</label>
          <input
            id="qty"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            className="border border-black/20 rounded-md px-3 py-2 w-24"
          />
        </div>

        <button
          disabled={!canAdd}
          onClick={() => {
            if (!stripePriceId) return;
            addItem({
              priceId: stripePriceId,
              quantity,
              size: showSize ? size : undefined,
              slug,
            });
          }}
          className="mt-6 inline-flex items-center justify-center outline-solid outline-3 rounded-xs px-4 py-1 w-full  bg-white text-black font-semibold text-sm md:text-lg"
        >
          Add to Bag
        </button>

        <BuyNowButton priceId={stripePriceId || ""} slug={slug} metadata={showSize ? { size } : undefined} disabled={!sizeValid} />
      </div>
    </div>
  );
}


