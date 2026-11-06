export function setupCategoryDropdown(): void {
  const categoryToggle =
    document.querySelector<HTMLInputElement>("#category-toggle");

  if (!categoryToggle) return;

  const closeCategories = (): void => {
    categoryToggle.checked = false;
  };

  document
    .querySelectorAll<HTMLAnchorElement>(".category-dropdown a")
    .forEach((link: HTMLAnchorElement) => {
      link.addEventListener("click", closeCategories);
    });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && categoryToggle.checked) {
      closeCategories();
      categoryToggle.focus();
    }
  });
}
