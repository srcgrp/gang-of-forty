import type { Product } from "../types";

type SortType = "default" | "price" | "expensive";

export function sortProducts(
  products: Product[],
  sort: SortType
): Product[] {
  if (sort === "default") {
    return products;
  }

 return [...products].sort((a, b) =>
    sort === "price" ? a.price - b.price : b.price - a.price
  );
}