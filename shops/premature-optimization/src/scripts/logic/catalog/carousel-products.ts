import type { CarouselConfig, CatalogData, Product } from "../../types";

const OFFERS_SOURCE = "offers";

export function carouselProducts(
  catalog: CatalogData,
  carouselId: string,
): Product[] | null {
  const carousel = catalog.home.carousels?.find((c) => c.id === carouselId);
  if (!carousel) return null;

  if (carousel.source === OFFERS_SOURCE) {
    return discountedProducts(catalog);
  }
  return productsOfCategory(catalog.products, carouselCategoryId(carousel));
}

function discountedProducts({ products, offers }: CatalogData): Product[] {
  const discountedIds = new Set(offers.map((offer) => offer.productId));
  return products.filter((product) => discountedIds.has(product.id));
}

function carouselCategoryId(carousel: CarouselConfig): number | null {
  return carousel.categoryId ?? carousel.category?.id ?? null;
}

function productsOfCategory(
  products: Product[],
  categoryId: number | null,
): Product[] {
  if (categoryId === null) return [];
  return products.filter((product) => product.categoryId === categoryId);
}
