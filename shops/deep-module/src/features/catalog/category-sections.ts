import type { Category, Product, StockData } from "../../shared/types";
import { createProductCard } from "./product-card";
import { attachProductEvents } from "./product-events";
import { h } from "../../shared/ui/dom";

export function renderCategorySections(
  products: Product[],
  categories: Category[],
  stock: StockData,
  onAdd: (product: Product) => boolean,
): void {
  const container = document.getElementById("category-sections");
  if (!container) return;
  container.replaceChildren();
  if (categories.length === 0 || products.length === 0) return;

  const frag = document.createDocumentFragment();
  for (const cat of categories) {
    const catProducts = products.filter((p) => p.categoryId === cat.id);
    if (catProducts.length === 0) continue;

    const section = h("section", "carousel-section");
    section.id = `cat-${cat.id}`;
    const head = h("div", "carousel-section__head");
    const h2 = h("h2", "section-head__title");
    const emoji = h("span", undefined, cat.emoji ?? "");
    emoji.setAttribute("aria-hidden", "true");
    h2.append(emoji, " " + cat.name);
    head.append(
      h2,
      h("span", "section-head__count", `${catProducts.length.toLocaleString("fa-IR")} کالا`),
    );

    const carousel = h("div", "carousel");
    carousel.setAttribute("role", "region");
    carousel.setAttribute("aria-label", `کاروسل ${cat.name}`);
    carousel.tabIndex = 0;
    const track = h("ul", "carousel__track");
    for (const p of catProducts) track.appendChild(createProductCard(p, null, stock));

    carousel.appendChild(track);
    section.append(head, carousel);
    frag.appendChild(section);
    attachProductEvents(track, products, onAdd);
  }
  container.appendChild(frag);
}