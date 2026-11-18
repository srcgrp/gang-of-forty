import type { Product, ShopData } from "../../../shared/types";

export function carouselProducts(catalog: ShopData, carouselId: string): Product[] | null {
  const carousel = catalog.home.carousels.find(item => item.id === carouselId);
  if (carousel) {
    if (carousel.source === "offers") {
      const ids = new Set(catalog.offers.map(offer => offer.productId));
      return catalog.products.filter(product => ids.has(product.id));
    }
    return catalog.products.filter(product => product.categoryId === carousel.categoryId);
  }
  const category = catalog.categories.find(item => item.slug === carouselId);
  if (!category) return null;
  return catalog.products.filter(product => product.categoryId === category.id);
}
