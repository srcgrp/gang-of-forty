import { getProducts, getStock, getOffers, getCategories } from "./requests";
export async function loadCatalog() {
  const [products, stock, offers, categories] = await Promise.all([
    getProducts(), getStock(), getOffers(), getCategories(),
  ]);
  return { products, stock, offers, categories };
}
