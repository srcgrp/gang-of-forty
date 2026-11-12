import { API } from "./endpoints";
import { isCategory, isOffer, isProduct, isStock } from "./guards/catalog";
import { isShop } from "./guards/shop";
import { getList, getValidated } from "./load";

export async function fetchRawCatalog() {
  const [products, offers, stock, categories, shop] = await Promise.all([
    getList(API.products, isProduct),
    getList(API.offers, isOffer),
    getValidated(API.stock, isStock),
    getList(API.categories, isCategory),
    getValidated(API.shop, isShop).catch((err: unknown) => {
      console.warn("shop.json ignored:", err);
      return null;
    }),
  ]);
  return { products, offers, stock, categories, shop };
}
