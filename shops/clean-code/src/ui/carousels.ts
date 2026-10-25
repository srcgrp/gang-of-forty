import { findOffer } from "../catalog/offer.ts";
import type { Category, MakeItem, Offer, Product } from "../types/product.ts";
import type { Home } from "../types/shop.ts";
import { addCards, makeCarousel } from "./carousel-row.ts";

export function renderProducts(
  home: Home,
  categories: Category[],
  products: Product[],
  offers: Offer[],
  makeItem: MakeItem,
): void {
  const featured = document.querySelector<HTMLDivElement>("#featured");
  const more = document.querySelector<HTMLDivElement>("#carousels");
  const used: Record<string, boolean> = {};

  if (!featured || !more) throw new Error("index.html is missing an element");

  for (const item of home.carousels) {
    let list;
    if ("categoryId" in item) {
      list = products.filter(function (product) {
        return product.categoryId === item.categoryId;
      });
    } else {
      list = products.filter(function (product) {
        return findOffer(offers, product.id);
      });
    }

    const parts = makeCarousel(item.id, item.emoji + " " + item.title);
    addCards(parts.row, list, makeItem, item.id + "-start", item.id + "-end");
    featured.appendChild(parts.section);
    used[item.id] = true;
  }

  for (const cat of categories) {
    if (used[cat.slug]) {
      continue;
    }
    const list = products.filter(function (product) {
      return product.categoryId === cat.id;
    });
    const parts = makeCarousel(cat.slug, cat.emoji + " " + cat.name);
    addCards(parts.row, list, makeItem, cat.slug + "-start", cat.slug + "-end");
    more.appendChild(parts.section);
  }
}
