import type { Category } from "../types";
import { createElement, createLink } from "./elements";
export function showCategories(categories: Category[]): void {
  const categoryHeading = document.querySelector<HTMLElement>(
    "#categories-heading",
  );
  const footerCategories =
    document.querySelector<HTMLElement>("#footer-categories");
  const categoryTiles = document.querySelector<HTMLElement>("#category-tiles");
  const categoryLinks = document.querySelector<HTMLElement>("#category-links");
  if (
    !categoryHeading ||
    !footerCategories ||
    !categoryTiles ||
    !categoryLinks
  ) {
    throw new Error("Required page elements were not found");
  }

  categoryHeading.appendChild(createElement("h2", "", "از اینجا شروع کن"));
  footerCategories.appendChild(createElement("h2", "", "دسته‌بندی‌ها"));

  categories.forEach(function (category: Category): void {
    const href = "#" + category.slug;
    const tile = createLink("", href, "category-tile");
    const icon = createElement("span", "category-emoji", category.emoji);
    icon.style.backgroundColor = category.color;
    icon.setAttribute("aria-hidden", "true");
    tile.appendChild(icon);
    tile.appendChild(createElement("strong", "", category.name));
    categoryTiles.appendChild(tile);
    categoryLinks.appendChild(createLink(category.name, href, ""));
    footerCategories.appendChild(createLink(category.name, href, ""));
  });
}
