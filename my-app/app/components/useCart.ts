"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type CartItem = {
  priceId: string; // Stripe price_... or prod_...
  quantity: number;
  size?: string;
  // Optional identifiers for UI use
  slug?: string;
  title?: string;
  image?: string;
};

const STORAGE_KEY = "tbs_cart_v1";
const CART_EVENT = "tbs_cart_update";

function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean);
  } catch {
    return [];
  }
}

function writeCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // Notify other hook instances in the same tab
    window.dispatchEvent(new CustomEvent(CART_EVENT));
  } catch {
    // ignore quota/security errors
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => readCartFromStorage());

  // Keep state in sync with localStorage and across tabs
  useEffect(() => {
    writeCartToStorage(items);
  }, [items]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setItems(readCartFromStorage());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Same-tab sync via custom event
  useEffect(() => {
    const onCartEvent = () => {
      const updated = readCartFromStorage();
      // Only update if different to avoid infinite loops
      setItems((prev) => {
        try {
          if (JSON.stringify(prev) === JSON.stringify(updated)) return prev;
        } catch {
          // if stringify fails, fall through to update
        }
        return updated;
      });
    };
    window.addEventListener(CART_EVENT, onCartEvent as EventListener);
    return () => window.removeEventListener(CART_EVENT, onCartEvent as EventListener);
  }, []);

  const totalQuantity = useMemo(
    () => items.reduce((sum, it) => sum + (it.quantity || 0), 0),
    [items]
  );

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      // Merge by priceId + size for simplicity
      const idx = prev.findIndex(
        (p) => p.priceId === item.priceId && (p.size || "") === (item.size || "")
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: (next[idx].quantity || 0) + (item.quantity || 1) };
        return next;
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  const updateItem = useCallback((index: number, partial: Partial<CartItem>) => {
    setItems((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const next = [...prev];
      next[index] = { ...next[index], ...partial };
      return next;
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const checkout = useCallback(async () => {
    if (items.length === 0) return;
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((it) => ({
          priceId: it.priceId,
          quantity: it.quantity,
          metadata: { size: it.size || undefined, slug: it.slug || undefined },
        })),
      }),
    });
    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || !data.url) {
      throw new Error(data.error || "Checkout failed");
    }
    window.location.href = data.url;
  }, [items]);

  return {
    items,
    totalQuantity,
    addItem,
    updateItem,
    removeItem,
    clear,
    checkout,
  };
}


