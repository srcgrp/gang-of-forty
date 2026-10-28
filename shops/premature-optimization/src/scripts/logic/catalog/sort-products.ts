import type { Product, Sort } from "../../types";
export const SORTS: Sort[] = ["default", "price-asc", "price-desc", "name"];
export const SORT_LABELS: Record<Sort, string> = {
  default: "پیش‌فرض",
  "price-asc": "ارزان‌ترین",
  "price-desc": "گران‌ترین",
  name: "نام محصول",
};
export function isSort(value: string): value is Sort {
  return SORTS.includes(value as Sort);
}
export function sortProducts(products: Product[], sort: Sort): Product[] {
  const copy = [...products];
  if (sort === "price-asc") return copy.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return copy.sort((a, b) => b.price - a.price);
  if (sort === "name")
    return copy.sort((a, b) => a.name.localeCompare(b.name, "fa"));
  return copy;
}
