import type { Offer } from "../types.ts";

export function isOffer(x: unknown): x is Offer {
  if (typeof x !== "object" || x === null) return false;
  if (!("productId" in x) || typeof x.productId !== "number") return false;
  if (!("percent" in x) || typeof x.percent !== "number") return false;
  if (!("label" in x) || typeof x.label !== "string") return false;
  return true;
}
