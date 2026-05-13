import { describe, expect, it } from "vitest";
import {
  getInventoryDisplayForColorway,
  getShopListingSwatchRemaining,
  isShopListingSwatchDepleted,
} from "@/lib/inventory";

describe("getInventoryDisplayForColorway", () => {
  const seed = {
    "black|S": 2,
    "black|M": 5,
    "white|S": 1,
    "white|M": 3,
  };

  it("sums remaining and cap for one color from live map", () => {
    const live = { "black|S": 2, "black|M": 1, "white|S": 1, "white|M": 3 };
    expect(getInventoryDisplayForColorway(seed, live, "black")).toEqual({ remaining: 3, cap: 7 });
    expect(getInventoryDisplayForColorway(seed, live, "white")).toEqual({ remaining: 4, cap: 4 });
  });

  it("uses displayCap when set so cap can exceed summed stock", () => {
    const live = { "black|S": 2, "black|M": 1, "white|S": 1, "white|M": 3 };
    expect(getInventoryDisplayForColorway(seed, live, "black", 30)).toEqual({ remaining: 3, cap: 30 });
  });

  it("returns null without composite keys or color", () => {
    expect(getInventoryDisplayForColorway({ S: 5, M: 5 }, { S: 3, M: 2 }, "black")).toBeNull();
    expect(getInventoryDisplayForColorway(seed, seed, "")).toBeNull();
  });
});

describe("shop listing swatch remaining / depleted", () => {
  const colorSeed = {
    "black|S": 1,
    "black|M": 0,
    "white|S": 1,
    "white|M": 1,
  };

  it("per-colorway: remaining and depleted per variant color", () => {
    const live = { "black|S": 0, "black|M": 0, "white|S": 1, "white|M": 0 };
    expect(getShopListingSwatchRemaining(colorSeed, live, "black")).toBe(0);
    expect(isShopListingSwatchDepleted(colorSeed, live, "black")).toBe(true);
    expect(getShopListingSwatchRemaining(colorSeed, live, "white")).toBe(1);
    expect(isShopListingSwatchDepleted(colorSeed, live, "white")).toBe(false);
  });

  it("size-only keys: shared pool across variant tiles", () => {
    const seed = { S: 1, M: 1, L: 0, XL: 0 };
    const live = { S: 0, M: 0, L: 0, XL: 0 };
    expect(getShopListingSwatchRemaining(seed, live, "black")).toBe(0);
    expect(isShopListingSwatchDepleted(seed, live, "black")).toBe(true);
    expect(isShopListingSwatchDepleted(seed, live, "white")).toBe(true);
  });

  it("no seed: not depleted", () => {
    expect(getShopListingSwatchRemaining(undefined, { S: 1 }, "x")).toBeNull();
    expect(isShopListingSwatchDepleted(undefined, { S: 1 }, "x")).toBe(false);
  });
});
