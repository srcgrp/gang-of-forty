import type { CatalogItem, Category, CategoryGroup } from "../types";

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
