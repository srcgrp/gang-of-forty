import type { HomeCarousel, Category } from "../types";

export function groupHomeCarousels(
  carousels: HomeCarousel[],
  categories: Category[],
): { featured: HomeCarousel[]; category: HomeCarousel[] } {
  const featured = carousels.filter(
    (item) => item.source === "offers",
  );

  const configured = carousels.filter(
    (item) => item.source !== "offers",
  );

  const configuredIds = new Set(
    configured
      .map((item) => item.categoryId)
      .filter((id) => id != null),
  );

  const remaining: HomeCarousel[] = categories
    .filter((category) => !configuredIds.has(category.id))
    .map((category) => ({
      id: category.slug,
      title: category.name,
      categoryId: category.id,
    }));

  return {
    featured,
    category: [...configured, ...remaining],
  };
}