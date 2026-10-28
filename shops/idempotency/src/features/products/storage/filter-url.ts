import type { FilterState } from "../../../shared/types/filters";

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
  if (filters.category) url.searchParams.set("category", filters.category);
  else url.searchParams.delete("category");

  if (filters.query.trim()) url.searchParams.set("q", filters.query.trim());
  else url.searchParams.delete("q");

  if (url.href === window.location.href) return;
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
}

export function listenToFilterHistory(
  onChange: (filters: FilterState) => void,
): void {
  window.addEventListener("popstate", () => onChange(readFilterUrl()));
}
