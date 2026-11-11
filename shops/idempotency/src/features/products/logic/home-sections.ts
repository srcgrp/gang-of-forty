import type { Product } from "../../../shared/types/products";
import type { StoreData } from "../api/store-data";

export type ProductSection = {
  id: string;
  title: string;
  products: Product[];
};

export function getHomeSections(
  data: StoreData,
  selectedId: number | null,
): ProductSection[] {
  if (selectedId !== null) {
    const category = data.categories.find((c) => c.id === selectedId);
    const products = data.products.filter((p) => p.categoryId === selectedId);
    return category
      ? [{ id: category.slug, title: category.name, products }]
      : [];
  }

  const offerIds = new Set(data.offers.map((o) => o.productId));
  const configured = data.home.carousels.map((carousel) => ({
    id: carousel.id,
    title: carousel.title,
    products: data.products.filter((product) =>
      carousel.source === "offers"
        ? offerIds.has(product.id)
        : product.categoryId === carousel.categoryId,
    ),
  }));

  const categoryCarousels = data.home.carousels.filter(
    (carousel) => carousel.source !== "offers",
  );
  const usedIds = new Set(categoryCarousels.map((c) => c.id));
  const usedCategories = new Set(categoryCarousels.map((c) => c.categoryId));

  const remaining = data.categories
    .filter((c) => !usedIds.has(c.slug) && !usedCategories.has(c.id))
    .map((c) => ({
      id: c.slug,
      title: c.name,
      products: data.products.filter((p) => p.categoryId === c.id),
    }));

  return [...configured, ...remaining].filter(
    (section) => section.products.length > 0,
  );
}
