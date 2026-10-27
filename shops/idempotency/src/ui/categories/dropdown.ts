import type { Category } from "../../types";

export function renderCategoryDropdown(
  categories: Category[],
): void {
  const dropdown = document.querySelector("#category-dropdown");

  if (!dropdown) {
    return;
  }

  const apiLinks = categories.map((category) => {
    const link = document.createElement("a");

    link.classList.add("dropdown-item");
    link.href = `#${category.slug}`;
    link.textContent = category.name;
    link.dataset.apiCategory = "true";

    return link;
  });

  const customLinks = Array.from(
    dropdown.querySelectorAll(
      ":scope > a:not([data-api-category])",
    ),
  );

  dropdown.replaceChildren(...apiLinks, ...customLinks);
}