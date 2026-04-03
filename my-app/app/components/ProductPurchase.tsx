"use client";

import { useState } from "react";
import { useCart } from "@/app/components/useCart";

interface ProductPurchaseProps {
  slug: string;
  stripePriceId?: string;
  enableSizes?: boolean;
  title?: string;
  image?: string;
  waistOptions?: string[];
  inseamOptions?: string[];
  soldOut?: boolean;
  colorOptions?: { value: string; label?: string }[];
  color?: string;
  onColorChange?: (value: string) => void;
  colorPriceIds?: Record<string, string | undefined>;
}

export default function ProductPurchase({
  slug,
  stripePriceId,
  enableSizes,
  title,
  image,
  waistOptions,
  inseamOptions,
  soldOut,
  colorOptions,
  color: controlledColor,
  onColorChange,
  colorPriceIds,
}: ProductPurchaseProps) {
  const [size, setSize] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [inseam, setInseam] = useState<string>("");
  const [uncontrolledColor, setUncontrolledColor] = useState<string>(
    controlledColor || colorOptions?.[0]?.value || ""
  );
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });
  const [justAdded, setJustAdded] = useState<boolean>(false);
  const { addItem } = useCart();

  const isPants = Array.isArray(waistOptions) || Array.isArray(inseamOptions);
  const showSize = !!enableSizes && !isPants;
  const sizeValid = isPants ? Boolean(waist) && Boolean(inseam) : (!showSize || Boolean(size));
  const effectiveColor = controlledColor ?? uncontrolledColor;
  const computedPriceId = (effectiveColor && colorPriceIds?.[effectiveColor]) || stripePriceId;
  const canAdd = Boolean(computedPriceId) && sizeValid && !soldOut;
  const buttonLabel =
    soldOut ? "SOLD OUT" :
    isPants && (!waist || !inseam) ? "SELECT SIZE" :
    (showSize && !size ? "SELECT A SIZE" : justAdded ? "SUCCESS" : "ADD TO BAG");

  return (
    <div className="mt-2 md:mt-8">
      {isPants && (
        <div className="mb-4">
          <div className="block text-sm md:text-base font-semibold mb-2">Waist</div>
          <div role="radiogroup" aria-label="Waist" className="grid grid-cols-4 gap-2 max-w-xs">
            {(waistOptions || []).map((opt) => {
              const selected = waist === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setWaist(opt)}
                  className={`px-2 py-1 text-xs md:text-sm border ${selected ? "border border-black" : "border-black/20"} hover:border-black focus:outline-none focus:ring-2 focus:ring-black`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="block text-sm md:text-base font-semibold mt-4 mb-2">Inseam</div>
          <div role="radiogroup" aria-label="Inseam" className="grid grid-cols-4 gap-2 max-w-xs">
            {(inseamOptions || []).map((opt) => {
              const selected = inseam === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setInseam(opt)}
                  className={`px-2 py-1 text-xs md:text-sm border ${selected ? "border border-black" : "border-black/20"} hover:border-black focus:outline-none focus:ring-2 focus:ring-black`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {!sizeValid && (
            <div className="mt-2 text-sm text-red-600">Please select waist and inseam.</div>
          )}
        </div>
      )}

      {/* Color swatches */}
      {Array.isArray(colorOptions) && colorOptions.length > 0 && (
        <div className="mb-4">
          <div className="block text-sm md:text-base font-semibold mb-2">Color</div>
          <div role="radiogroup" aria-label="Color" className="flex flex-wrap gap-2">
            {colorOptions.map((opt) => {
              const selected = (effectiveColor || colorOptions[0].value) === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  title={opt.label || opt.value}
                  onClick={() => {
                    if (onColorChange) onColorChange(opt.value);
                    setUncontrolledColor(opt.value);
                  }}
                  className={`relative h-7 w-9 md:h-8 md:w-10 border ${
                    selected ? "border-black ring-2 ring-black" : "border-black/20"
                  } focus:outline-none focus:ring-2 focus:ring-black`}
                  style={{ backgroundColor: opt.value }}
                >
                  <span className="sr-only">{opt.label || opt.value}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {showSize && (
        <div className="mb-4">
          <div className="block text-sm md:text-base font-semibold mb-2">Size</div>
          {!sizeValid && (
            <div className="mb-2 text-sm text-blue-400">Please select a size.</div>
          )}
          <div role="radiogroup" aria-label="Size" className="flex flex-wrap gap-x-1 gap-y-2 justify-start w-full">
            {["S", "M", "L", "XL"].map((opt) => {
              const selected = size === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSize(opt)}
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-base md:text-lg font-semibold focus:outline-none ${
                    selected ? "text-blue-400" : "text-black hover:text-blue-400"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-start flex-col">

        <button
          disabled={!canAdd}
          onClick={() => {
            setMessage({ type: "", text: "" });
            if (!computedPriceId) {
              setMessage({ type: "error", text: "This product is not available right now." });
              return;
            }
            if (soldOut) {
              setMessage({ type: "error", text: "This product is sold out." });
              return;
            }
            if (isPants && (!waist || !inseam)) {
              setMessage({ type: "error", text: "Please select waist and inseam." });
              return;
            }
            if (showSize && !size) {
              setMessage({ type: "error", text: "Please select a size." });
              return;
            }
            try {
              addItem({
                priceId: computedPriceId!,
                quantity: 1,
                size: isPants ? `${waist}x${inseam}` : (showSize ? size : undefined),
                slug,
                title,
                image,
                color: effectiveColor || undefined,
              });
              setJustAdded(true);
              setTimeout(() => setJustAdded(false), 1800);
            } catch {
              setMessage({ type: "error", text: "Could not add to bag. Please try again." });
            }
          }}
          className={`mt-0 md:mt-1 inline-flex items-center justify-center px-4 py-3 w-full  ${justAdded ? "bg-blue-400" : "bg-black"} text-white font-semibold text-sm md:text-base lg:text-lg disabled:cursor-not-allowed transition-colors duration-200`}
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


