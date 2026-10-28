import type { Category } from "../types/product.ts";
import type { FrozenShop } from "../types/shop.ts";
import { addCatLinks } from "./cat-links.ts";

export function fillMenu(shop: FrozenShop, categories: Category[]): void {
  const list = document.querySelector<HTMLUListElement>("#menu-list");
  if (!list) throw new Error("index.html is missing an element");

  const all: HTMLLIElement = document.createElement("li");
  all.className = "all-cats";
  const allLink: HTMLAnchorElement = document.createElement("a");
  allLink.href = "#categories";
  allLink.textContent = "همه دسته‌ها";
  const sub: HTMLUListElement = document.createElement("ul");
  addCatLinks(sub, categories);
  all.appendChild(allLink);
  all.appendChild(sub);
  list.appendChild(all);

  for (const item of shop.menu) {
    const li: HTMLLIElement = document.createElement("li");
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    li.appendChild(a);
    list.appendChild(li);
  }

  const cartLi: HTMLLIElement = document.createElement("li");
  const cartA: HTMLAnchorElement = document.createElement("a");
  cartA.href = "#cart";
  cartA.textContent = "سبد خرید";
  cartLi.appendChild(cartA);
  list.appendChild(cartLi);
}
