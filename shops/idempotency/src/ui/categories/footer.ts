import type { Category } from "../../types";

export function renderFooterCategories(categories: Category[]): void {
  const container = document.querySelector("#footer-categories");

  if (!container) {
    return;
  }

  const apiLinks = categories.map((category) => {
    const link = document.createElement("a");
    link.href = `#${category.slug}`;
    link.textContent = category.name;
    link.dataset.apiCategory = "true";
    link.dataset.categorySlug = category.slug;
    return link;
  });

  const customLinks = Array.from(
    container.querySelectorAll(
      ":scope > a:not([data-api-category])",
    ),
  );

  container.replaceChildren(...apiLinks, ...customLinks);
}