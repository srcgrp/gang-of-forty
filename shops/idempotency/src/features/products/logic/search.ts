import Fuse from "fuse.js";
import type { Product, Category } from "../../../shared/types";
import type { SearchHandler } from "../../../shared/types/search";

export function createProductSearch(
  products: Product[],
  categories: Category[],
  getCategory: () => string | null,
): SearchHandler {
  const index = new Fuse(products, {
    keys: ["name"], threshold: 0.35, ignoreLocation: true,
  });

  return (query: string) => {
    const slug = getCategory();
    const categoryId = categories.find((item) => item.slug === slug)?.id;
    return index.search(query).map(({ item }) => item)
      .filter((item) => slug === null || item.categoryId === categoryId)
      .slice(0, 4);
  };
}
