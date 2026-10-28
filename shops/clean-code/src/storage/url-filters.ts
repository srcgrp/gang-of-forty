import type { Filters } from "../types/product.ts";

export function loadFilters(): Filters {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get("category") ?? "",
    q: params.get("q") ?? "",
  };
}

export function saveFilters(filters: Filters): void {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.q) params.set("q", filters.q);
  const query = params.toString();
  const url = query ? "?" + query : window.location.pathname;
  window.history.replaceState(null, "", url);
}
