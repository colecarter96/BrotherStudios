"use client";

import { useCart } from "./useCart";
import Link from "next/link";

type Props = {
  onClick?: () => void;
};

export default function BagButton({ onClick }: Props) {
  const { totalQuantity } = useCart();

  const handleClick = async () => {
    if (onClick) return onClick();
  };

  return (
    <Link href="/bag" onClick={handleClick} className="relative inline-flex items-center gap-2 px-3 py-1 rounded-md hover:opacity-80 transition" aria-label="Open bag">
      <span className="font-semibold">BAG</span>
      {totalQuantity > 0 && (
        <span className="min-w-5 h-5 px-1 rounded-full bg-black text-white text-xs flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}


