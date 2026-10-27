import { loadProducts } from "./products";
import { loadOffers } from "./offers";
import { loadStock } from "./stock";
import { loadShop } from "./shop";
import { loadCategories } from "./categories";
import { loadHome } from "./home";

export async function loadStoreData() {
  const [products, offers, stock, shop, categories, home] =
    await Promise.all([
      loadProducts(),
      loadOffers(),
      loadStock(),
      loadShop(),
      loadCategories(),
      loadHome(),
    ]);

  return { products, offers, stock, shop, categories, home };
}