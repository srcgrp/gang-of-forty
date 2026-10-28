import type { Product } from "../types";
import { getJSON } from "./getJSON";
import { isProduct } from "./catalog-guards";

export async function loadProducts(): Promise<Product[]> {
  const raw: unknown = await getJSON("/products.json");

  if (!Array.isArray(raw)) {
    throw new Error("Invalid products data");
  }

  const products = raw.filter(isProduct);
  const invalidCount = raw.length - products.length;

  if (invalidCount > 0) {
    console.warn(`Ignored ${invalidCount} invalid product(s).`);
  }

  return products;
}