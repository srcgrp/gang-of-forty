import type { CarouselConfig, Catalog, ProductView } from "../types";

export const CAROUSEL_PREVIEW_LIMIT = 8;
export const LATEST_CAROUSEL = { id: "latest", title: "جدیدترین‌ها", emoji: "", source: "latest" };

export const categoryProducts = (products: ProductView[], categoryId: number): ProductView[] =>
  products.filter(({ product }) => product.categoryId === categoryId);

const newestFirst = (products: ProductView[]): ProductView[] =>
  [...products].sort((first, second) => second.product.id - first.product.id);

export const latestProducts = (products: ProductView[], categoryId: number | null): ProductView[] => {
  const latest = newestFirst(products).slice(0, CAROUSEL_PREVIEW_LIMIT);
  return categoryId === null ? latest : categoryProducts(latest, categoryId);
};

export const configuredCategoryCarousel = (catalog: Catalog, categoryId: number): CarouselConfig | undefined =>
  catalog.home.carousels.find((carousel) => carousel.source !== "offers" && carousel.categoryId === categoryId);

export function findCarousel(catalog: Catalog, carouselId: string): CarouselConfig | undefined {
  const configured = catalog.home.carousels.find(({ id }) => id === carouselId);
  if (configured) return configured;
  if (carouselId === LATEST_CAROUSEL.id) return LATEST_CAROUSEL;

  const category = catalog.categories.find(({ slug }) => slug === carouselId);
  if (!category) return undefined;
  return { id: category.slug, title: category.name, emoji: category.emoji, categoryId: category.id };
}

export function carouselProducts(catalog: Catalog, carouselId: string): ProductView[] | null {
  const carousel = findCarousel(catalog, carouselId);
  if (!carousel) return null;
  if (carousel.source === "latest") return newestFirst(catalog.products);
  if (carousel.source === "offers") return catalog.products.filter(({ offer }) => offer !== undefined);
  if (carousel.categoryId === undefined) return [];
  return categoryProducts(catalog.products, carousel.categoryId);
}
