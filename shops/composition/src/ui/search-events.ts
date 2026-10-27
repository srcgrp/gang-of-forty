import type { Category, SearchState } from "../types";
export function bindSearch(categories: Category[],
  onSearch: (state: SearchState, fragment?: string) => void): void {
  const input = document.querySelector<HTMLInputElement>("#product-search");
  const sort = document.querySelector<HTMLSelectElement>("#product-sort");
  const category = document.querySelector<HTMLSelectElement>("#category-filter");
  const clear = document.querySelector<HTMLButtonElement>("#clear-search");
  if (!input || !sort || !clear || !category) throw new Error("عناصر جست‌وجو پیدا نشدند.");
  function search(): void {
    if (input && sort && category)
      onSearch({ query: input.value, category: category.value, sort: sort.value });
  }
  input.addEventListener("input", search);
  sort.addEventListener("change", search);
  category.addEventListener("change", search);
  clear.addEventListener("click", () => {
    onSearch({ query: "", category: "", sort: "default" });
    input.focus();
  });
  document.addEventListener("click", (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a");
    const href = link?.getAttribute("href");
    if (!href?.startsWith("#") || event.ctrlKey || event.metaKey ||
        event.shiftKey || event.altKey || event.button !== 0) return;
    const selected = categories.find(item => href === "#" + item.slug);
    if (selected) {
      event.preventDefault();
      onSearch({ query: input.value, category: selected.slug, sort: sort.value });
      document.querySelector("#search-results")?.scrollIntoView({ block: "start" });
    } else if (href !== "#main") {
      event.preventDefault();
      onSearch({ query: "", category: "", sort: "default" }, href.slice(1));
    }
  });
}
