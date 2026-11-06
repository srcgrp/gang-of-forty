import type { CatalogItem, CategorySection } from "../types";
import { createArrow, setupArrows } from "./arrows";
import { el } from "./dom";

export function createCategorySection(
  data: CategorySection,
  makeCard: (item: CatalogItem) => HTMLElement
): HTMLElement {
  const { category, items, countText } = data;
  const section = el("section", "category-carousel");
  section.id = category.slug;
  section.setAttribute("aria-labelledby", `${category.slug}-title`);

  const icon = el("span", "category-carousel-icon", category.emoji);
  icon.style.setProperty("--category-color", category.color);
  icon.setAttribute("aria-hidden", "true");

  const title = el("h2", "category-carousel-title", category.name);
  title.id = `${category.slug}-title`;

  const head = el("div", "category-carousel-head");
  head.append(icon, title, el("span", "category-carousel-count", countText));

  const track = el("div", "carousel");
  track.tabIndex = 0;
  track.setAttribute("aria-label", category.name);
  track.append(...items.map((item) => makeCard(item)));

  const wrap = el("div", "carousel-wrap");
  wrap.append(createArrow("prev"), track, createArrow("next"));
  setupArrows(wrap);

  section.append(head, wrap);
  return section;
}
