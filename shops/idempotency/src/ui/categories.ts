import type { Category } from "../types";

function createCategoryCard(
  category: Category,
  imagePaths: Partial<Record<number, string>>,
) {
  const card = document.createElement("a");
  card.classList.add("category-card");
  card.href = `#${category.slug}`;

  const image = document.createElement("img");
  image.src = imagePaths[category.id] ?? "";
  image.alt = "";
  image.setAttribute("aria-hidden", "true");

  const name = document.createElement("span");
  name.textContent = category.name;

  card.append(image, name);
  return card;
}

export function renderCategories(
  categories: Category[],
  imagePaths: Partial<Record<number, string>>,
): void {
  const container = document.querySelector("#category-grid");

  if (!container) {
    throw new Error("Category grid container is missing from the DOM.");
  }

  const cards = categories.map((category) =>
    createCategoryCard(category, imagePaths),
  );

  container.replaceChildren(...cards);
  container.setAttribute("aria-busy", "false");
}