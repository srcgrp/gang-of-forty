import type { ProductItem, ShopModel } from '../types';

export function categoryProducts(catalog: ShopModel, categoryId: number): ProductItem[] {
  return [...(catalog.itemsByCategory.get(categoryId) ?? [])];
}

export function carouselProducts(catalog: ShopModel, carouselId: string): ProductItem[] | null {
  const carousel = catalog.carousels.find((section) => section.id === carouselId);
  if (!carousel) return null;
  return carousel.source === 'offers'
    ? catalog.offerItems.filter((item) => item.percent > 0)
    : categoryProducts(catalog, carousel.categoryId);
}
