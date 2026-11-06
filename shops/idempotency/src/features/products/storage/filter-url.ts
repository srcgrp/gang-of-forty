import { FILTER_FIELDS } from "../../../shared/types/filters";
import type { FilterField, FilterState } from "../../../shared/types/filters";

function toUrlParam(field: FilterField): string {
  return field === "query" ? "q" : "category";
}

export function readFilterUrl(): FilterState {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get("category") || null,
    query: params.get("q") ?? "",
  };
}

export function writeFilterUrl(
  filters: FilterState,
  mode: "push" | "replace",
): void {
  const url = new URL(window.location.href);

  for (const field of FILTER_FIELDS) {
    const key = toUrlParam(field);
    const value = filters[field]?.trim();

    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }

  if (url.href === window.location.href) return;

  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
}

export function listenToFilterHistory(
  onChange: (filters: FilterState) => void,
): void {
  window.addEventListener("popstate", () => onChange(readFilterUrl()));
}