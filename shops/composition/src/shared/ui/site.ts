import type { Shop, Home } from "../types";
import { showShop } from "./shop";
import { showFooter } from "./footer";
import { showBanners } from "./banners";
export function showSite(shop: Shop, home: Home): void {
  showShop(shop);
  showFooter(shop);
  showBanners(home);
}
