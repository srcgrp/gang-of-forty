import type { Product, Sort } from "../../types";
export const SORTS: Sort[] = ["default", "price", "price-desc", "name"];
export const SORT_LABELS: Record<Sort, string> = {
  default: "پیش‌فرض",
  price: "ارزان‌ترین",
  "price-desc": "گران‌ترین",
  name: "نام محصول",
};
export function isSort(value: string): value is Sort {
  return SORTS.some((sort) => sort === value);
}
export function parseSort(value: unknown): Sort {
  return typeof value === "string" && isSort(value) ? value : "default";
}
export function sortSearch(sort: Sort): { sort?: Sort } {
  return sort === "default" ? {} : { sort };
}
export function sortProducts(products: Product[], sort: Sort): Product[] {
  const copy = [...products];
  if (sort === "price") return copy.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return copy.sort((a, b) => b.price - a.price);
  if (sort === "name")
    return copy.sort((a, b) => a.name.localeCompare(b.name, "fa"));
  return copy;
}
