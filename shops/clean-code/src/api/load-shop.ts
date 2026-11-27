import { loadCategories } from "./category.ts";
import { getJSON } from "./get-json.ts";
import { isHome } from "./home.ts";
import { loadOffers } from "./offer.ts";
import { loadProducts } from "./product.ts";
import { isShop } from "./shop.ts";
import { loadStock } from "./stock.ts";

export async function loadShop(api: string) {
  const [rawProducts, rawStock, rawOffers, rawCategories, rawShop, rawHome] =
    await Promise.all([
      getJSON(api + "products.json"),
      getJSON(api + "stock.json"),
      getJSON(api + "offers.json"),
      getJSON(api + "categories.json"),
      getJSON(api + "shop.json"),
      getJSON(api + "home.json"),
    ]);

  const products = loadProducts(rawProducts);
  const offers = loadOffers(rawOffers);
  const categories = loadCategories(rawCategories);
  const stock = loadStock(rawStock);
  if (!isShop(rawShop)) throw new Error("bad shop");
  if (!isHome(rawHome)) throw new Error("bad home");
  return {
    categories,
    shop: rawShop,
    home: rawHome,
    products,
    stock,
    offers,
  };
}
