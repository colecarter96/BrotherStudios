"use client";

import { useEffect } from "react";

const STORAGE_KEY = "tbs_cart_v1";
const CART_EVENT = "tbs_cart_update";

export default function ClearCartOnMount() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "[]");
        window.dispatchEvent(new CustomEvent(CART_EVENT));
      }
    } catch {
      // ignore
    }
  }, []);
  return null;
}

