import type { Category } from "../types/product.ts";
import type { FrozenShop, Home } from "../types/shop.ts";
import { renderCategories } from "./categories.ts";
import { fillFooter } from "./footer.ts";
import { fillHero } from "./hero.ts";
import { fillMenu } from "./menu.ts";
import { fillPromos } from "./promos.ts";
import { fillShop } from "./shop.ts";

export function render(
  shop: FrozenShop,
  categories: Category[],
  home: Home,
): void {
  fillShop(shop);
  fillMenu(shop, categories);
  fillFooter(shop, categories);
  renderCategories(categories);
  fillHero(home);
  fillPromos(home);
}
