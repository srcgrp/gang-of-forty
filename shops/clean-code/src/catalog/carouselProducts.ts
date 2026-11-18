import { offerProducts } from "../features/products/offer";
import type { Offer, Product } from "../types/product";
import type { Home } from "../types/shop";

export type Catalog = {
  products: Product[];
  offers: Offer[];
  home: Home;
};

export function carouselProducts(
  catalog: Catalog,
  carouselId: string,
): Product[] | null {
  const item = catalog.home.carousels.find(function (c) {
    return c.id === carouselId;
  });

  if (!item) return null;

  if ("categoryId" in item) {
    return catalog.products.filter(function (p) {
      return p.categoryId === item.categoryId;
    });
  }

  return offerProducts(catalog.products, catalog.offers);
}
