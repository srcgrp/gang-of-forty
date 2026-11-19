import type { Catalog, ProductView } from "../types";

export const categoryProducts = (products: ProductView[], categoryId: number): ProductView[] =>
  products.filter(({ product }) => product.categoryId === categoryId);

export const latestProducts = (products: ProductView[], categoryId: number | null): ProductView[] => {
  const latest = [...products].sort((first, second) => second.product.id - first.product.id).slice(0, 8);
  return categoryId === null ? latest : categoryProducts(latest, categoryId);
};

export function carouselProducts(catalog: Catalog, carouselId: string): ProductView[] | null {
  const carousel = catalog.home.carousels.find(({ id }) => id === carouselId);
  if (!carousel) return null;
  if (carousel.source === "offers") return catalog.products.filter(({ offer }) => offer !== undefined);
  if (carousel.categoryId === undefined) return [];
  return categoryProducts(catalog.products, carousel.categoryId);
}
