import type { SearchHandler } from "../../../../shared/types/search";
import { renderSearchResults } from "./results";

export function setupProductsSearch(
  search: SearchHandler,
  onQueryChange: (query: string) => void,
): void {
  const input = document.querySelector<HTMLInputElement>("#site-search");
  const container = document.querySelector<HTMLDivElement>("#search-result");
  if (!input || !container) {
    throw new Error("Required search elements are missing.");
  }

  input.addEventListener("input", () => {
    const query = input.value;
    onQueryChange(query);
    const matches = query.trim() ? search(query.trim()) : null;
    if (matches === null) {
      container.replaceChildren();
      container.hidden = true;
      return;
    }
    renderSearchResults(container, matches);
    container.hidden = false;
  });

  input.addEventListener("click", () => {
    if (input.value.trim() && container.hasChildNodes()) {
      container.hidden = false;
    }
  });

  const form = input.closest(".search");
  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && form && !form.contains(event.target)) {
      container.hidden = true;
    }
  });
}

export function restoreSearchQuery(query: string): void {
  const input = document.querySelector<HTMLInputElement>("#site-search");
  const container = document.querySelector<HTMLDivElement>("#search-result");
  if (!input || !container) throw new Error("Search elements are missing.");
  if (input.value === query) return;
  input.value = query;
  container.hidden = true;
  container.replaceChildren();
}

export function setupSearchForm(): void {
  document.querySelector(".search")?.addEventListener(
    "submit", (event) => event.preventDefault(),
  );
}
