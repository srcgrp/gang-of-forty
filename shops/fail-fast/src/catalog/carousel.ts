/**
 * Pure catalog helper for carousel product selection.
 * No DOM access, no fetch, no localStorage, no input mutation.
 */

import type { Category, HomeCarousel, Offer, Product } from "../types.js";

export interface Catalog {
  products: Product[];
  categories: Category[];
  offers: Offer[];
  carousels: HomeCarousel[];
}

export function getProductsForCarousel(
  catalog: Catalog,
  carouselId: string
): Product[] | null {
  const carousel = catalog.carousels.find((item) => item.id === carouselId);
  if (!carousel) {
    const category = catalog.categories.find((item) => item.slug === carouselId);
    if (!category) return null;
    return catalog.products.filter((product) => product.categoryId === category.id);
  }

  if (carousel.source === "offers") {
    const offerProductIds = catalog.offers.map((offer) => offer.productId);
    return catalog.products.filter((product) =>
      offerProductIds.includes(product.id)
    );
  }

  if (carousel.categoryId !== undefined) {
    return catalog.products.filter(
      (product) => product.categoryId === carousel.categoryId
    );
  }

  return catalog.products;
}
