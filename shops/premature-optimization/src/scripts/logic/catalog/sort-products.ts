import type { Product, Sort } from "../../types";

export const SORTS: readonly Sort[] = [
  "default",
  "price",
  "price-desc",
  "name",
];

export const SORT_LABELS: Readonly<Record<Sort, string>> = {
  default: "پیش‌فرض",
  price: "ارزان‌ترین",
  "price-desc": "گران‌ترین",
  name: "نام محصول",
};

type Comparator = (a: Product, b: Product) => number;

const nameCollator = new Intl.Collator("fa");

const COMPARATORS: Record<Sort, Comparator | null> = {
  default: null,
  price: (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  name: (a, b) => nameCollator.compare(a.name, b.name),
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

export function sortProducts(
  products: readonly Product[],
  sort: Sort,
): Product[] {
  const compare = COMPARATORS[sort];
  const copy = [...products];
  return compare ? copy.sort(compare) : copy;
}
