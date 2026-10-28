import type { Shop, Category, Home } from "../../../../shared/types";

import { renderShopMenus } from "../../../../shared/ui/shop/menus";
import {
  renderShopAbout,
  renderShopSchedule,
  renderShopNotice,
} from "../../../../shared/ui/shop/details";
import { renderShopContact } from "../../../../shared/ui/shop/contact";
import {
  renderShopHelp,
  renderShopCopyright,
} from "../../../../shared/ui/shop/footer";

import { renderCategories } from "../categories";
import { renderCategoryDropdown } from "../categories/dropdown";
import { renderFooterCategories } from "../categories/footer";

import {
  renderSideBanner,
  renderPromoBanners,
} from "../../../../shared/ui/banners";

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