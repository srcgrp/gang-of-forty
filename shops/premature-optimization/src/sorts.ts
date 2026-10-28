import type { Product, Sort } from "./types";

export const SORTS = ["default", "price-asc", "price-desc", "name"] as const;

export const SORT_LABELS: Record<Sort, string> = {
  default: "پیش‌فرض",
  "price-asc": "ارزان‌ترین",
  "price-desc": "گران‌ترین",
  name: "حروف الفبا",
};

export function isSort(value: string): value is Sort {
  return (SORTS as readonly string[]).includes(value);
}

export function sortProducts(products: Product[], sort: Sort): Product[] {
  const copy: Product[] = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name, "fa"));
    default:
      return copy;
  }
}
