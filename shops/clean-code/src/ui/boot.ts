import type { Category, Filters, MakeItem, Product } from "../types/product.ts";
import type { FrozenShop, Home } from "../types/shop.ts";
import { renderProducts } from "./carousels.ts";
import { bindControls } from "./controls.ts";
import { render } from "./page.ts";
import { visibleProducts } from "./search.ts";
import { renderStatus } from "./status.ts";

export function bootShop(
  shop: FrozenShop,
  categories: Category[],
  home: Home,
  products: Product[],
  onOffer: Product[],
  item: MakeItem,
  showCart: () => void,
  emptyCart: () => void,
  faNumber: Intl.NumberFormat,
  filters: Filters,
  saveFilters: (filters: Filters) => void,
): void {
  render(shop, categories, home);
  renderProducts(home, categories, products, onOffer, item);
  showCart();
  bindControls(products.length, faNumber, emptyCart, filters, function (next) {
    saveFilters(next);
    visibleProducts(next.q, next.category);
  });
  renderStatus({ status: "success", products });
}
