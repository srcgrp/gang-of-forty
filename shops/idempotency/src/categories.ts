
import type { Category } from "./types";
import { categoryImages } from "./data";

function createCategoryCard(category: Category) {
  const card = document.createElement("a");
  card.classList.add("category-card");
  card.href = `#${category.slug}`;

  const image = document.createElement("img");
  image.src = categoryImages[category.id] ?? "";
  image.alt = "";
  image.setAttribute("aria-hidden", "true");

  const name = document.createElement("span");
  name.textContent = category.name;

  card.append(image, name);
  return card;
}

export function renderCategories(categories: Category[]) {
  const container = document.querySelector("#category-grid");

  if (!container) {
    return;
  }

  const cards = categories.map((category) => {
    return createCategoryCard(category);
  });

  container.replaceChildren(...cards);
  container.setAttribute("aria-busy", "false");
}

export function renderCategoryDropdown(categories: Category[]) {
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
    dropdown.querySelectorAll(":scope > a:not([data-api-category])")
  );

  dropdown.replaceChildren(...apiLinks, ...customLinks);
}

export function renderFooterCategories(categories: Category[]) {
  const container = document.querySelector("#footer-categories");

  if (!container) {
    return;
  }

  const apiLinks = categories.map((category) => {
    const link = document.createElement("a");
    link.href = `#${category.slug}`;
    link.textContent = category.name;
    return link;
  });

  const customLinks = Array.from(
    container.querySelectorAll(":scope > a:not([data-api-category])")
  );

  apiLinks.forEach((link) => {
    link.dataset.apiCategory = "true";
  });

  container.replaceChildren(...apiLinks, ...customLinks);
}
