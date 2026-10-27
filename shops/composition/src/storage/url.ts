import type { SearchState } from "../types";
export function readSearchUrl(): SearchState {
  const params = new URLSearchParams(window.location.search);
  return { query: params.get("q") ?? "", category: params.get("category") ?? "",
    sort: params.get("sort") ?? "default" };
}
export function writeSearchUrl(state: SearchState, fragment = ""): void {
  const url = new URL(window.location.href);
  for (const [key, value] of [["q", state.query], ["category", state.category],
    ["sort", state.sort === "default" ? "" : state.sort]]) {
    if (key === undefined || value === undefined) continue;
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }
  url.hash = fragment;
  if (url.href === window.location.href) return;
  window.history.pushState(null, "", url);
}
export function readFragment(): string {
  return window.location.hash.slice(1);
}
export function watchSearchUrl(onChange: () => void): void {
  window.addEventListener("popstate", onChange);
}
