import type { Product, ProductCardOptions, Sort } from "../../types";
import { makeElement } from "../shared/make-element";
import { makeProductCard } from "./product-card";
import {
  animateCarouselTo,
  animateSections,
  animateProductCards,
  setCarouselPosition,
} from "../shared/animations";

export interface CatalogSection {
  id: string;
  title: string;
  products: Product[];
  options: (product: Product) => ProductCardOptions;
}

type SortProducts = (products: Product[], sort: Sort) => Product[];

export function renderSections(
  sections: CatalogSection[],
  sortProducts: SortProducts,
): void {
  const container = document.querySelector<HTMLElement>("#home-carousels");
  if (!container) return;

  container.replaceChildren();

  sections.forEach((data) => {
    const section = makeElement("section", "recommendation");
    section.id = data.id;
    section.append(makeElement("h2", "recommendation-title", data.title));

    const sort = makeElement("select", "sort-select");

    [
      ["default", "پیش‌فرض"],
      ["price-asc", "ارزان‌ترین"],
      ["price-desc", "گران‌ترین"],
      ["name", "نام محصول"],
    ].forEach(([value, label]) => {
      const option = makeElement("option", "", label);
      option.value = value;
      sort.append(option);
    });

    const carousel = makeElement("div", "dairy-carousel");
    const viewport = makeElement("div", "dairy-carousel-viewport");
    const list = makeElement("ul", "products");

    carousel.style.direction = "rtl";
    viewport.style.direction = "rtl";
    list.style.direction = "rtl";

    const render = (): void => {
      list.replaceChildren(
        ...sortProducts(data.products, sort.value as Sort).map((product) =>
          makeProductCard(product, data.options(product)),
        ),
      );

      list.dataset.offset = "0";
      setCarouselPosition(list, 0);
      animateProductCards(list);
    };

    sort.addEventListener("change", render);

    const label = makeElement("label", "sort-control");
    label.append(makeElement("span", "sort-control-label", "مرتب‌سازی:"));

    const wrapper = makeElement("span", "sort-select-wrap");
    const arrow = makeElement("span", "sort-arrow", "˅");
    arrow.setAttribute("aria-hidden", "true");

    wrapper.append(sort, arrow);
    label.append(wrapper);

    const previous = makeElement("button", "dairy-prev-button", "→");
    const next = makeElement("button", "dairy-next-button", "←");
    const controls = makeElement("div", "dairy-carousel-controls");

    previous.type = "button";
    next.type = "button";
    previous.title = "محصول قبلی";
    next.title = "محصول بعدی";

    const getStep = (): number => {
      const card = list.querySelector<HTMLElement>(".product-item");
      if (!card) return 0;

      const styles = getComputedStyle(list);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;

      return card.getBoundingClientRect().width + gap;
    };

    const moveCarousel = (direction: -1 | 1): void => {
      const step = getStep();
      if (!step) return;

      const max = Math.max(0, list.scrollWidth - viewport.clientWidth);
      const current = Number(list.dataset.offset || 0);

      const nextOffset = Math.max(0, Math.min(max, current + direction * step));

      if (nextOffset === current) return;

      list.dataset.offset = String(nextOffset);
      animateCarouselTo(list, nextOffset);
    };

    previous.addEventListener("click", () => moveCarousel(-1));
    next.addEventListener("click", () => moveCarousel(1));

    controls.append(previous, next);
    viewport.append(list);
    carousel.append(viewport, controls);
    section.append(label, carousel);

    if (!data.products.length) {
      section.append(
        makeElement("p", "empty-message", "محصولی برای نمایش وجود ندارد."),
      );
    } else {
      render();
    }

    container.append(section);
  });
  animateSections(container);
}
