import type { Category } from "../types/product.ts";

export function renderCategories(categories: Category[]): void {
  const list = document.querySelector<HTMLUListElement>("#cat-list");
  if (!list) throw new Error("index.html is missing an element");

  for (const cat of categories) {
    const li: HTMLLIElement = document.createElement("li");
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = "#" + cat.slug;

    const icon: HTMLSpanElement = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = cat.emoji;
    icon.style.backgroundColor = cat.color;

    a.appendChild(icon);
    a.appendChild(document.createTextNode(cat.name));
    li.appendChild(a);
    list.appendChild(li);
  }
}
