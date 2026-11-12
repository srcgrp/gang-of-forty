import type { CatalogItem, Sort, SortComparators } from "../types";

const inStockFirst = (a: CatalogItem, b: CatalogItem): number =>
  Number(b.stock > 0) - Number(a.stock > 0);

const COMPARATORS: SortComparators = {
  default: inStockFirst,
  "price-asc": (a, b) => inStockFirst(a, b) || a.price - b.price,
  "price-desc": (a, b) => inStockFirst(a, b) || b.price - a.price,
  discount: (a, b) => inStockFirst(a, b) || (b.percent ?? 0) - (a.percent ?? 0),
};

export const sortItems = (list: CatalogItem[], sort: Sort = "default"): CatalogItem[] =>
  [...list].sort(COMPARATORS[sort]);
