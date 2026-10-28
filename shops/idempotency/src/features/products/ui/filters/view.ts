import type { CarouselView } from "../../../../shared/types/catalog";
import type { FilterState } from "../../../../shared/types/filters";
import { renderHomeCarousels } from "../carousels";
import { restoreSearchQuery } from "../search/events";
import { updateSelectedCategory } from "./categories";

type CarouselGroups = { featured: CarouselView[]; category: CarouselView[] };

export function createFilterView(
  filterViews: (filters: FilterState) => CarouselGroups,
): (filters: FilterState) => void {
  return (filters) => {
    const views = filterViews(filters);
    renderHomeCarousels(views.featured, views.category);
    restoreSearchQuery(filters.query);
    updateSelectedCategory(filters.category);
  };
}
