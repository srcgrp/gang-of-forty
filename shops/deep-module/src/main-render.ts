import type { AppState, Product } from "./shared/types";
import { renderShopInfo } from "./shared/ui/header";
import { renderHero } from "./shared/ui/hero";
import { renderCategories } from "./features/catalog/categories";
import { renderSpecialOffers } from "./features/catalog/offers";
import { renderAllProducts } from "./features/catalog/all-products";
import { renderBanners } from "./shared/ui/banners";
import { renderFooter } from "./shared/ui/footer";
import { renderCategorySections } from "./features/catalog/category-sections";

export interface RenderOptions {
  state: AppState;
  onAdd: (product: Product) => boolean;
}

export function renderApp(opts: RenderOptions): void {
  const { state } = opts;
  if (!state.data) return;
  const { products, categories, shop, home, offers, stock } = state.data;

  renderShopInfo(shop, categories);
  renderHero(home);
  renderCategories(categories);
  renderSpecialOffers(products, offers, stock, opts.onAdd);
  renderAllProducts(state, products, offers, stock, opts.onAdd);
  renderBanners(home);
  renderFooter(shop, categories);
  renderCategorySections(products, categories, stock, opts.onAdd);
}
