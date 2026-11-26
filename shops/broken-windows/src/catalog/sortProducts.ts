import type { Product } from "../types";

type SortType = "default" | "price";

export function sortProducts(
  products: Product[],
  sort: SortType
): Product[] {
  if (sort === "default") {
    return products;
  }

  return [...products].sort((a, b) => a.price - b.price);
}