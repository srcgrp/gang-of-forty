import type { Product } from "../types/product.ts";
import { keepList } from "./list.ts";

export function loadProducts(raw: unknown) {
  return keepList(raw, isProduct, "products");
}

export function isProduct(x: unknown): x is Product {
  if (typeof x !== "object" || x === null) return false;
  if (!("id" in x) || typeof x.id !== "number") return false;
  if (!("categoryId" in x) || typeof x.categoryId !== "number") return false;
  if (!("name" in x) || typeof x.name !== "string") return false;
  if (!("emoji" in x) || typeof x.emoji !== "string") return false;
  if (!("unit" in x) || typeof x.unit !== "string") return false;
  if (!("price" in x) || typeof x.price !== "number") return false;
  if (!("tags" in x) || !Array.isArray(x.tags)) return false;
  if (!x.tags.every((tag) => typeof tag === "string")) return false;
  return true;
}
