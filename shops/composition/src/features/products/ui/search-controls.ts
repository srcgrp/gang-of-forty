import type { Category, SearchState } from "../../../shared/types";
export function fillCategoryFilter(categories: Category[]): void {
  const select = document.querySelector<HTMLSelectElement>("#category-filter");
  if (!select) throw new Error("فهرست دسته‌بندی پیدا نشد.");
  select.replaceChildren(new Option("همهٔ دسته‌ها", ""));
  for (const category of categories) select.add(new Option(category.name, category.slug));
  select.disabled = false;
}
export function setSearchControls(state: SearchState): void {
  const input = document.querySelector<HTMLInputElement>("#product-search");
  const category = document.querySelector<HTMLSelectElement>("#category-filter");
  const sort = document.querySelector<HTMLSelectElement>("#product-sort");
  if (!input || !category || !sort) throw new Error("عناصر فیلتر پیدا نشدند.");
  input.value = state.query;
  category.value = state.category;
  sort.value = state.sort;
}
