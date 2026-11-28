import type { HomeCarousel } from "../../../shared/types/home";
import type { Product } from "../../../shared/types/products";
import type { StoreData } from "../api/store-data";
import { groupHomeCarousels } from "./carousel-selection";

export function findCarousel(
  catalog: StoreData,
  carouselId: string,
): HomeCarousel | undefined {
  const { featured, category } = groupHomeCarousels(
    catalog.home.carousels,
    catalog.categories,
  );

  return [...featured, ...category].find((item) => item.id === carouselId);
}

export function carouselProducts(
  catalog: StoreData,
  carouselId: string,
): Product[] | null {
  const carousel = findCarousel(catalog, carouselId);

  if (!carousel) return null;

  if (carousel.source === "offers") {
    const offerIds = new Set(catalog.offers.map((offer) => offer.productId));
    return catalog.products.filter((product) => offerIds.has(product.id));
  }

  return catalog.products.filter(
    (product) =>
      carousel.categoryId !== undefined &&
      product.categoryId === carousel.categoryId,
  );
}
