
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
      throw new Error("Category grid container is missing from the DOM.");
  }

 const cards = categories.map(createCategoryCard);

  container.replaceChildren(...cards);
  container.setAttribute("aria-busy", "false");
}

export function renderCategoryDropdown(categories: Category[]) {
  const dropdown = document.querySelector("#category-dropdown");

  if (!dropdown) {
  throw new Error("Category dropdown is missing from the DOM.");

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
    throw new Error("Footer categories container is missing from the DOM.");
  }

  const apiLinks = categories.map((category) => {
    const link = document.createElement("a");
    link.href = `#${category.slug}`;
    link.textContent = category.name;
    link.dataset.apiCategory = "true";
    return link;
  });

  const customLinks = Array.from(
    container.querySelectorAll(":scope > a:not([data-api-category])")
  );

  container.replaceChildren(...apiLinks, ...customLinks);
}