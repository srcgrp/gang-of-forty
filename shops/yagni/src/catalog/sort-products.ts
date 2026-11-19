import type { ProductCardData } from "../types";

export type ProductSort = "default" | "price";

export function sortProducts(products: ProductCardData[], sort: ProductSort) {
  if (sort === "price") return [...products].sort((a, b) => a.price - b.price);
  return products;
}
