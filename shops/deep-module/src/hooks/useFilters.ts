import { useState } from "react";
import type { Offer, Product, StockData } from "../types";

export type StockFilter = "all" | "in" | "out";
export type DiscountFilter = "all" | "yes";
export type SortFilter = "default" | "price-asc" | "price-desc" | "name";

export interface FilterValues {
  categoryId: number | null;
  stock: StockFilter;
  discount: DiscountFilter;
  sort: SortFilter;
}

const DEFAULT: FilterValues = {
  categoryId: null,
  stock: "all",
  discount: "all",
  sort: "default",
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterValues>(DEFAULT);

  const update = (patch: Partial<FilterValues>) =>
    setFilters((prev) => ({ ...prev, ...patch }));

  const reset = () => setFilters(DEFAULT);

  const activeCount =
    (filters.categoryId !== null ? 1 : 0) +
    (filters.stock !== "all" ? 1 : 0) +
    (filters.discount !== "all" ? 1 : 0) +
    (filters.sort !== "default" ? 1 : 0);

  return { filters, update, reset, activeCount };
}

export function applyFilters(
  products: Product[],
  filters: FilterValues,
  offers: Offer[],
  stock: StockData,
  query: string,
): Product[] {
  let result = products.filter((p) => p.name.includes(query));

  if (filters.categoryId !== null) {
    result = result.filter((p) => p.categoryId === filters.categoryId);
  }

  if (filters.stock !== "all") {
    result = result.filter((p) => {
      const s = stock.items[p.id] ?? 0;
      return filters.stock === "in" ? s > 0 : s === 0;
    });
  }

  if (filters.discount === "yes") {
    const ids = new Set(offers.map((o) => o.productId));
    result = result.filter((p) => ids.has(p.id));
  }

  if (filters.sort === "price-asc") {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (filters.sort === "price-desc") {
    result = [...result].sort((a, b) => b.price - a.price);
  } else if (filters.sort === "name") {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name, "fa"));
  }

  return result;
}
