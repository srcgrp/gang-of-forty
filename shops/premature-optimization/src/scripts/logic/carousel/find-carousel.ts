import type { CarouselConfig, CatalogData } from "../../types";
import { categoryToCarousel } from "./carousel-config.ts";

export function findCarousel(
  catalog: CatalogData,
  carouselId: string,
): CarouselConfig | null {
  const configured = catalog.home.carousels?.find((c) => c.id === carouselId);
  if (configured) return configured;

  const category = catalog.categories.find((c) => c.slug === carouselId);
  return category ? categoryToCarousel(category) : null;
}

export function carouselTitle(
  catalog: CatalogData,
  carouselId: string,
): string | null {
  return findCarousel(catalog, carouselId)?.title ?? null;
}
