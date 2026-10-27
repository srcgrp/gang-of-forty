import type { CarouselView } from "../types/catalog";
import { createHomeCarousel } from "./carousels/section";

export function renderHomeCarousels(
  featured: CarouselView[],
  categories: CarouselView[],
): void {
  const featuredContainer = document.querySelector(
    "#home-featured-carousels",
  );

  const categoryContainer = document.querySelector(
    "#home-category-carousels",
  );

  if (!featuredContainer || !categoryContainer) {
    throw new Error(
      "Home carousel containers are missing from the DOM.",
    );
  }

  featuredContainer.replaceChildren(
    ...featured.map(createHomeCarousel),
  );

  categoryContainer.replaceChildren(
    ...categories.map(createHomeCarousel),
  );
}