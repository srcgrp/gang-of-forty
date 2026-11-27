import Fuse from "fuse.js";
import type { StoreData } from "../api/store-data";
import { getHomeSections } from "./home-sections";

const HOME_PREVIEW_LIMIT = 6;

export function getSearchedSections(
  data: StoreData,
  categoryId: number | null,
  query: string,
) {
  const sections = getHomeSections(data, categoryId);

  if (!query.trim()) {
    return categoryId === null
      ? sections.map((section) => ({
          ...section,
          products: section.products.slice(0, HOME_PREVIEW_LIMIT),
        }))
      : sections;
  }

  const search = new Fuse(data.products, {
    keys: ["name"],
    threshold: 0.35,
    ignoreLocation: true,
  });

  const matchedIds = new Set(
    search.search(query.trim()).map(({ item }) => item.id),
  );

  return sections
    .map((section) => ({
      ...section,
      products: section.products.filter((product) =>
        matchedIds.has(product.id),
      ),
    }))
    .filter((section) => section.products.length > 0);
}
