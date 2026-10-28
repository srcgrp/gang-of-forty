import type { Category } from "../types/product.ts";
import type { FrozenShop } from "../types/shop.ts";
import { addCatLinks } from "./cat-links";

export function fillFooter(shop: FrozenShop, categories: Category[]): void {
  const footerCats = document.querySelector<HTMLUListElement>("#footer-cats");
  const helpList = document.querySelector<HTMLUListElement>("#footer-help");
  if (!helpList || !footerCats)
    throw new Error("index.html is missing an element");

  addCatLinks(footerCats, categories);

  for (const item of shop.help) {
    const li: HTMLLIElement = document.createElement("li");
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    li.appendChild(a);
    helpList.appendChild(li);
  }
}
