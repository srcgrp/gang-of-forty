import Fuse from "fuse.js";
import type { Product, Category } from "../../../shared/types";
import type { CarouselView } from "../../../shared/types/catalog";
import type { FilterState } from "../../../shared/types/filters";

type CarouselGroups = { featured: CarouselView[]; category: CarouselView[] };

export function createCarouselFilter(products: Product[], categories: Category[]) {
  const search = new Fuse(products, {
    keys: ["name"], threshold: 0.35, ignoreLocation: true,
  });

  return (views: CarouselGroups, filters: FilterState): CarouselGroups => {
    const categoryId = categories.find((c) => c.slug === filters.category)?.id;
    const matchedIds = filters.query.trim()
      ? new Set(search.search(filters.query).map(({ item }) => item.id))
      : null;

    const allowedIds = new Set(products.filter((product) =>
      (filters.category === null || product.categoryId === categoryId) &&
      (matchedIds === null || matchedIds.has(product.id))
    ).map((product) => product.id));

    const filterViews = (items: CarouselView[]) => items
      .map((view) => ({ ...view, cards: view.cards.filter((card) => allowedIds.has(card.id)) }))
      .filter((view) => view.cards.length > 0);

    return {
      featured: filterViews(views.featured),
      category: filterViews(views.category),
    };
  };
}
