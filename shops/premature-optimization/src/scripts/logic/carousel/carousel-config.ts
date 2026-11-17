import type { CarouselConfig, Category } from "../../types";

const OFFERS_SOURCE = "offers";

export function isOffersCarousel(carousel: CarouselConfig): boolean {
  return carousel.source === OFFERS_SOURCE;
}

export function carouselCategoryId(carousel: CarouselConfig): number | null {
  return carousel.categoryId ?? carousel.category?.id ?? null;
}

export function categoryToCarousel(category: Category): CarouselConfig {
  return {
    id: category.slug,
    title: category.name,
    emoji: category.emoji,
    categoryId: category.id,
  };
}
