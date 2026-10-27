import type { Product } from "../types";
import { isProduct } from "./validation/catalog";
import { getJSON } from "./get-json";
export async function loadProducts(): Promise<Product[]> {
  const data = await getJSON("/api/products.json");

  if (!Array.isArray(data)) {
    throw new Error("Products data must be an array");
  }

  const products = data.filter(isProduct);
  const invalidCount = data.length - products.length;

  if (invalidCount > 0) {
    console.warn(`${invalidCount} invalid products were removed`);
  }

  return products;
}