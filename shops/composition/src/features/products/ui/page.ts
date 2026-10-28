import type { ShopData, PageView, CartItem } from "../../../shared/types";
import { showCategories } from "./categories";
import { showSections } from "./sections";
import { fillCategoryFilter } from "./search-controls";
export function showPage(data: ShopData, page: PageView,
  onAdd: (item: CartItem) => void): void {
  showCategories(data.categories);
  showSections(page, onAdd);
  fillCategoryFilter(data.categories);
}
