import type { ShopData } from "../types";
import { getProducts, getStock, getOffers, getCategories, getShop, getHome } from "./requests";
export async function loadShopData(): Promise<ShopData> {
  const [products, stock, offers, categories, shop, home] = await Promise.all([
    getProducts(), getStock(), getOffers(), getCategories(), getShop(), getHome(),
  ]);
  return { products, stock, offers, categories, shop, home };
}
