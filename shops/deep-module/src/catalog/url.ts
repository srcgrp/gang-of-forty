import type { FilterState, Sort } from "../types";

const KEYS = {
  q: "q",
  cat: "cat",
  stock: "stock",
  discount: "discount",
  sort: "sort",
} as const;

export interface UrlState {
  query: string;
  categoryId: string;
  stock: FilterState["stock"];
  discount: FilterState["discount"];
  sort: Sort;
}

export function readUrlState(): UrlState {
  const p = new URLSearchParams(location.search);
  const stock = p.get(KEYS.stock);
  const discount = p.get(KEYS.discount);
  const sort = p.get(KEYS.sort);

  return {
    query: p.get(KEYS.q) ?? "",
    categoryId: p.get(KEYS.cat) ?? "all",
    stock: stock === "in" || stock === "out" ? stock : "all",
    discount: discount === "yes" ? "yes" : "all",
    sort:
      sort === "price-asc" || sort === "price-desc" || sort === "name"
        ? sort
        : "default",
  };
}

export function writeUrlState(state: UrlState): void {
  const p = new URLSearchParams();
  if (state.query) p.set(KEYS.q, state.query);
  if (state.categoryId !== "all") p.set(KEYS.cat, state.categoryId);
  if (state.stock !== "all") p.set(KEYS.stock, state.stock);
  if (state.discount !== "all") p.set(KEYS.discount, state.discount);
  if (state.sort !== "default") p.set(KEYS.sort, state.sort);

  const qs = p.toString();
  const url = qs ? `${location.pathname}?${qs}` : location.pathname;
  history.replaceState(null, "", url);
}
