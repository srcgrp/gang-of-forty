export function bindControls(
  productCount: number,
  faNumber: Intl.NumberFormat,
  onClear: () => void,
  onSearch: (q: string) => void,
): void {
  const searchBoxInput = document.querySelector<HTMLInputElement>("#q");
  const clearCartButton =
    document.querySelector<HTMLButtonElement>("#clear-cart");
  const submitButton = document.querySelector<HTMLFormElement>(".search");
  if (!searchBoxInput || !clearCartButton || !submitButton)
    throw new Error("index.html is missing an element");

  searchBoxInput.placeholder =
    "جستجو در میان " + faNumber.format(productCount) + " کالا…";

  clearCartButton.addEventListener("click", onClear);
  searchBoxInput.addEventListener("input", function () {
    onSearch(this.value);
  });
  submitButton.addEventListener("submit", function (e) {
    e.preventDefault();
  });
}
