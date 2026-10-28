import type { SectionView, PageView, CartItem } from "../../../shared/types";
import { createElement } from "../../../shared/ui/elements";
import { createProductCard } from "./product-card";
import { createCarouselControls, fillCarouselControls } from "./carousel-controls";
function createSection(section: SectionView, onAdd: (item: CartItem) => void): HTMLElement {
  const element = createElement("section", "product-section", "");
  element.id = section.id;
  const heading = createElement("div", "section-heading", "");
  const title = createElement("h2", "", section.title);
  title.id = section.id + "-title";
  element.setAttribute("aria-labelledby", title.id);
  const controls = createCarouselControls(section.title);
  heading.appendChild(title);
  if (section.carousel) { heading.appendChild(controls); element.appendChild(heading); }
  else element.appendChild(title);
  const status = createElement("p", "products-status", "");
  status.id = section.id + "-status";
  if (section.carousel) element.appendChild(status);
  const list = createElement("div", section.carousel ? "products" : "sample-products", "");
  if (section.carousel) {
    list.id = section.id + "-products";
    list.tabIndex = 0;
    list.setAttribute("role", "group");
    list.setAttribute("aria-label", section.title + "؛ برای پیمایش از کلیدهای جهت استفاده کنید");
  }
  section.cards.forEach((card, index) => {
    const item = createProductCard(card, onAdd);
    if (section.carousel) {
      item.id = section.id + "-" + card.id;
      if (index === 0) item.id = section.id + "-first";
      else if (index === section.cards.length - 1) item.id = section.id + "-last";
    }
    list.appendChild(item);
  });
  if (section.cards.length === 0) {
    status.textContent = "محصولی برای نمایش وجود ندارد.";
    if (!section.carousel) list.appendChild(status);
  }
  if (section.carousel) fillCarouselControls(controls, list, section.title);
  element.appendChild(list);
  return element;
}
export function showSections(page: PageView, onAdd: (item: CartItem) => void): void {
  const carousels = document.querySelector<HTMLElement>("#carousels");
  const categories = document.querySelector<HTMLElement>("#category-products");
  if (!carousels || !categories) throw new Error("بخش محصولات پیدا نشد.");
  carousels.replaceChildren();
  categories.replaceChildren();
  for (const section of page.sections) {
    const target = section.carousel ? carousels : categories;
    target.appendChild(createSection(section, onAdd));
  }
}
