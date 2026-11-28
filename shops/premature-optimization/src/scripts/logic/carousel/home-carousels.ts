import type { CarouselConfig, CatalogData } from "../../types";
import { carouselCategoryId, categoryToCarousel } from "./carousel-config.ts";

export function homeCarousels(catalog: CatalogData): CarouselConfig[] {
  const configured = catalog.home.carousels ?? [];
  const coveredCategoryIds = new Set(configured.map(carouselCategoryId));
  const categoryCarousels = catalog.categories
    .filter(
      (category) =>
        !coveredCategoryIds.has(category.id) &&
        catalog.products.some((p) => p.categoryId === category.id),
    )
    .map(categoryToCarousel);
  return [...configured, ...categoryCarousels];
}
