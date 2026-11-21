import type { CartLine } from "../types/product.ts";

export function isCartLine(x: unknown): x is CartLine {
  if (typeof x !== "object" || x === null) return false;
  if (!("productId" in x) || typeof x.productId !== "number") return false;
  if (!("qty" in x) || typeof x.qty !== "number") return false;
  return true;
}
