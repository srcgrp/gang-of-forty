import type { ShopData, PageView, CartItem } from "../types";
import { showShop } from "./shop";
import { showFooter } from "./footer";
import { showCategories } from "./categories";
import { showBanners } from "./banners";
import { showSections } from "./sections";
import { fillCategoryFilter } from "./search-controls";
export function showPage(data: ShopData, page: PageView,
  onAdd: (item: CartItem) => void): void {
  showShop(data.shop);
  showFooter(data.shop);
  showCategories(data.categories);
  showBanners(data.home);
  showSections(page, onAdd);
  fillCategoryFilter(data.categories);
}
