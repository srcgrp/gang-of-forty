import type { Catalog, CatalogItem, Category, CategoryGroup } from "../types";

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
  if (carouselId === "offers") return catalog.specials;
  const category = catalog.categories.find((c) => c.slug === carouselId);
  if (!category) return null;
  return catalog.items.filter((i) => i.categoryId === category.id);
}
