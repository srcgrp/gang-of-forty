import type { Stock } from "../types/product.ts";

export function loadStock(raw: unknown) {
  if (!isStock(raw)) throw new Error("bad stock");
  return raw;
}

export function isStock(x: unknown): x is Stock {
  if (typeof x !== "object" || x === null) return false;
  if (!("updatedAt" in x) || typeof x.updatedAt !== "string") return false;
  if (!("items" in x) || typeof x.items !== "object" || x.items === null)
    return false;
  if (Array.isArray(x.items)) return false;
  if (!Object.values(x.items).every((qty) => typeof qty === "number"))
    return false;
  return true;
}
