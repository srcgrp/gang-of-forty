import type { Product } from "../../../shared/types/products";
import type { StoreData } from "../api/store-data";
import { groupHomeCarousels } from "./carousel-selection";

export function carouselProducts(
  catalog: StoreData,
  carouselId: string,
): Product[] | null {
  const { featured, category } = groupHomeCarousels(
    catalog.home.carousels,
    catalog.categories,
  );
  const carousel = [...featured, ...category].find(
    (item) => item.id === carouselId,
  );

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
