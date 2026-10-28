import type { Category } from "../types/product.ts";

export function addCatLinks(
  ul: HTMLUListElement,
  categories: Category[],
): void {
  for (const cat of categories) {
    const li: HTMLLIElement = document.createElement("li");
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = "#" + cat.slug;
    a.textContent = cat.name;
    li.appendChild(a);
    ul.appendChild(li);
  }
}
