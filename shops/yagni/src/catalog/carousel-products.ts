import type { Catalog, ProductCardData } from "../types";
import { suggestionCardData } from "./card-data";
import { toCard } from "./product-pricing";

export function carouselProducts(
  catalog: Catalog,
  carouselId: string,
): ProductCardData[] | null {
  const carousel = catalog.carousels.find((item) => item.id === carouselId);

  if (!carousel) return null;

  if (carousel.source === "offers" || carousel.id === "offers") {
    return suggestionCardData(
      catalog.products,
      catalog.offers,
      catalog.stock.items,
    );
  }

  if (carousel.categoryId !== undefined) {
    return catalog.products
      .filter((product) => product.categoryId === carousel.categoryId)
      .map((product) => toCard(product, catalog.offers, catalog.stock.items));
  }

  return null;
}
