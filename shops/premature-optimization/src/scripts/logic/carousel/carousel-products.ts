import type { CatalogData, Product } from "../../types";
import { carouselCategoryId, isOffersCarousel } from "./carousel-config.ts";
import { findCarousel } from "./find-carousel.ts";

export function carouselProducts(
  catalog: CatalogData,
  carouselId: string,
): Product[] | null {
  const carousel = findCarousel(catalog, carouselId);
  if (!carousel) return null;

  if (isOffersCarousel(carousel)) {
    return discountedProducts(catalog);
  }
  return productsOfCategory(catalog.products, carouselCategoryId(carousel));
}

function discountedProducts({ products, offers }: CatalogData): Product[] {
  const discountedIds = new Set(offers.map((offer) => offer.productId));
  return products.filter((product) => discountedIds.has(product.id));
}

function productsOfCategory(
  products: Product[],
  categoryId: number | null,
): Product[] {
  if (categoryId === null) return [];
  return products.filter((product) => product.categoryId === categoryId);
}
