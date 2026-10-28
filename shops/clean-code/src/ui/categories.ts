import type { Category } from "../types/product.ts";

export function renderCategories(categories: Category[]): void {
  const list = document.querySelector<HTMLUListElement>("#cat-list");
  if (!list) throw new Error("index.html is missing an element");

  const all: HTMLLIElement = document.createElement("li");
  const allLink: HTMLAnchorElement = document.createElement("a");
  allLink.dataset.slug = "";
  allLink.href = "?";
  const allIcon: HTMLSpanElement = document.createElement("span");
  allIcon.setAttribute("aria-hidden", "true");
  allIcon.textContent = "🛒";
  allIcon.style.backgroundColor = "#de7272";
  allLink.appendChild(allIcon);
  allLink.appendChild(document.createTextNode("همه"));
  all.appendChild(allLink);
  list.appendChild(all);

  for (const cat of categories) {
    const li: HTMLLIElement = document.createElement("li");
    const a: HTMLAnchorElement = document.createElement("a");
    a.dataset.slug = cat.slug;
    a.href = "?category=" + cat.slug;

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
