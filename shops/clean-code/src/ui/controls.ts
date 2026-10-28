import type { Filters } from "../types/product.ts";

export function bindControls(
  productCount: number,
  faNumber: Intl.NumberFormat,
  onClear: () => void,
  start: Filters,
  onFilter: (filters: Filters) => void,
): void {
  const searchBoxInput = document.querySelector<HTMLInputElement>("#q");
  const clearCartButton =
    document.querySelector<HTMLButtonElement>("#clear-cart");
  const submitButton = document.querySelector<HTMLFormElement>(".search");
  const catListButton = document.querySelector<HTMLUListElement>("#cat-list");
  if (!searchBoxInput || !clearCartButton || !submitButton || !catListButton)
    throw new Error("index.html is missing an element");

  searchBoxInput.value = start.q;
  searchBoxInput.placeholder =
    "جستجو در میان " + faNumber.format(productCount) + " کالا…";

  let category = start.category;
  function apply(q: string): void {
    onFilter({ category, q });
  }
  apply(start.q);
  clearCartButton.addEventListener("click", onClear);
  searchBoxInput.addEventListener("input", function () {
    apply(this.value);
  });
  submitButton.addEventListener("submit", function (e) {
    e.preventDefault();
  });
  catListButton.addEventListener("click", function (e) {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const a = target.closest("a");
    if (!a) return;
    e.preventDefault();
    category = a.dataset.slug ?? "";
    apply(searchBoxInput.value);
  });
}
