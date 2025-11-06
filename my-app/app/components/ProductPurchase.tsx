"use client";

import { useState } from "react";
import BuyNowButton from "@/app/components/BuyNowButton";

interface ProductPurchaseProps {
  slug: string;
  stripePriceId?: string;
  enableSizes?: boolean;
}

export default function ProductPurchase({ slug, stripePriceId, enableSizes }: ProductPurchaseProps) {
  const [size, setSize] = useState<string>("");

  const showSize = !!enableSizes;
  const sizeValid = !showSize || Boolean(size);

  return (
    <div className="mt-8">
      {showSize && (
        <div className="mb-4">
          <label htmlFor="size" className="block text-sm font-semibold mb-2">Size</label>
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

      <BuyNowButton priceId={stripePriceId || ""} slug={slug} metadata={showSize ? { size } : undefined} disabled={!sizeValid} />
    </div>
  );
}


