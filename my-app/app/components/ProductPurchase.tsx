"use client";

import { useState } from "react";
import { useCart } from "@/app/components/useCart";

interface ProductPurchaseProps {
  slug: string;
  stripePriceId?: string;
  enableSizes?: boolean;
  title?: string;
  image?: string;
}

export default function ProductPurchase({ slug, stripePriceId, enableSizes, title, image }: ProductPurchaseProps) {
  const [size, setSize] = useState<string>("");
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });
  const [justAdded, setJustAdded] = useState<boolean>(false);
  const { addItem } = useCart();

  const showSize = !!enableSizes;
  const sizeValid = !showSize || Boolean(size);
  const canAdd = Boolean(stripePriceId) && sizeValid;
  const buttonLabel = showSize && !size ? "SELECT A SIZE" : justAdded ? "SUCCESS" : "ADD TO BAG";

  return (
    <div className="mt-8">
      {showSize && (
        <div className="mb-4">
          <div className="block text-base md:text-lg font-semibold mb-2">Size</div>
          <div role="radiogroup" aria-label="Size" className="grid grid-cols-4 gap-2 max-w-xs">
            {["S", "M", "L", "XL"].map((opt) => {
              const selected = size === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSize(opt)}
                  className={`px-3 py-2 text-sm md:text-base border ${
                    selected ? "border border-black" : "border-black/20"
                  } hover:border-black focus:outline-none focus:ring-2 focus:ring-black`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {!sizeValid && (
            <div className="mt-2 text-sm text-red-600">Please select a size.</div>
          )}
        </div>
      )}

      <div className="flex items-start flex-col">

        <button
          disabled={!canAdd}
          onClick={() => {
            setMessage({ type: "", text: "" });
            if (!stripePriceId) {
              setMessage({ type: "error", text: "This product is not available right now." });
              return;
            }
            if (showSize && !size) {
              setMessage({ type: "error", text: "Please select a size." });
              return;
            }
            try {
              addItem({
                priceId: stripePriceId,
                quantity: 1,
                size: showSize ? size : undefined,
                slug,
                title,
                image,
              });
              setJustAdded(true);
              setTimeout(() => setJustAdded(false), 1800);
            } catch {
              setMessage({ type: "error", text: "Could not add to bag. Please try again." });
            }
          }}
          className={`mt-6 inline-flex items-center justify-center px-4 py-3 md:py-4 w-full  ${justAdded ? "bg-green-800" : "bg-black"} text-white font-semibold text-md md:text-xl disabled:cursor-not-allowed transition-colors duration-200`}
        >
          {buttonLabel}
        </button>

        {message.type === "error" && message.text && (
          <div className="mt-3 text-sm text-red-600" role="status" aria-live="polite">
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}


