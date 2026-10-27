import type { SearchHandler } from "../../types/search";
import { renderSearchResults } from "./results";

export function setupProductsSearch(
  search: SearchHandler,
): void {
  const input =
    document.querySelector<HTMLInputElement>("#site-search");

  const container =
    document.querySelector<HTMLDivElement>("#search-result");

  if (!input || !container) {
    throw new Error("Required search elements are missing.");
  }

  input.addEventListener("input", () => {
    const query = input.value.trim();

    if (!query) {
      container.replaceChildren();
      container.hidden = true;
      return;
    }

    const matches = search(query);

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
    const target = event.target;

    if (target instanceof Node && form && !form.contains(target)) {
      container.hidden = true;
    }
  });
}

export function setupSearchForm(): void {
  document.querySelector(".search")?.addEventListener(
    "submit",
    (event) => event.preventDefault(),
  );
}