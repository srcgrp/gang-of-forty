import type { Catalog, CatalogItem, Category, CategoryGroup } from "../types";

export const OFFERS_ID = "offers";
export const OFFERS_TITLE = "پیشنهاد ویژه امروز 🔥";

export function groupByCategory(
  items: CatalogItem[],
  categories: Category[]
): CategoryGroup[] {
  return categories
    .map((category) => ({
      category,
      items: items.filter((i) => i.categoryId === category.id),
    }))
    .filter((group) => group.items.length > 0);
}

export function carouselProducts(catalog: Catalog, carouselId: string): CatalogItem[] | null {
  if (carouselId === OFFERS_ID) return catalog.specials;
  const category = catalog.categories.find((c) => c.slug === carouselId);
  if (!category) return null;
  return catalog.items.filter((i) => i.categoryId === category.id);
}

export function carouselTitle(catalog: Catalog, carouselId: string): string | null {
  if (carouselId === OFFERS_ID) return OFFERS_TITLE;
  return catalog.categories.find((c) => c.slug === carouselId)?.name ?? null;
}
