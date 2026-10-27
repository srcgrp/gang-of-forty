import type { Product } from "../types";
export const SORT_OPTIONS = ["default", "price-asc", "price-desc"] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export function sortProducts(
  products: Readonly<Product[]>,
  sort: SortOption,
): Product[] {
  const sortedProducts = [...products];

  if (sort === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return sortedProducts;
}

export function readSortOption(value: string): SortOption {
  if (value === "price-asc" || value === "price-desc") return value;
  return "default";
}
