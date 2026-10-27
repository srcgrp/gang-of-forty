import type { Shop, Category, Home } from "../../types";

import { renderShopMenus } from "./menus";
import {
  renderShopAbout,
  renderShopSchedule,
  renderShopNotice,
} from "./details";
import { renderShopContact } from "./contact";
import {
  renderShopHelp,
  renderShopCopyright,
} from "./footer";

import { renderCategories } from "../categories";
import { renderCategoryDropdown } from "../categories/dropdown";
import { renderFooterCategories } from "../categories/footer";
import {
  renderSideBanner,
  renderPromoBanners,
} from "../banners";

export function renderShopPage(
  shop: Shop,
  categories: Category[],
  home: Home,
  categoryImages: Partial<Record<number, string>>,
): void {
  renderShopNotice(shop);
  renderShopMenus(shop);
  renderShopAbout(shop);
  renderShopSchedule(shop);
  renderShopContact(shop);
  renderShopCopyright(shop);
  renderShopHelp(shop);

  renderCategories(categories, categoryImages);
  renderCategoryDropdown(categories);
  renderFooterCategories(categories);

  renderSideBanner(home.side);
  renderPromoBanners(home.promos);
}