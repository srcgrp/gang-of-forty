import type { Catalog, ProductCardData } from "../types";
import { suggestionCardData } from "./card-data";
import { toCard } from "./product-pricing";

export function carouselProducts(
  catalog: Catalog,
  carouselId: string,
): ProductCardData[] | null {
  const carousel = catalog.carousels.find((item) => item.id === carouselId);

  if (carousel?.source === "offers" || carouselId === "offers") {
    return suggestionCardData(
      catalog.products,
      catalog.offers,
      catalog.stock.items,
    );
  }

  const categoryId =
    carousel?.categoryId ??
    catalog.categories.find((category) => category.slug === carouselId)?.id;

  if (categoryId !== undefined) {
    return catalog.products
      .filter((product) => product.categoryId === categoryId)
      .map((product) => toCard(product, catalog.offers, catalog.stock.items));
  }

  return null;
}
