import type { Data } from "../types";
import { getJSON } from "./getJSON";
import { isArrayOf } from "./guard-basics";
import { loadProducts } from "./load-products";
import {
  isOffer,
  isStock,
  isCategory,
} from "./catalog-guards";
import { isShop } from "./shop-guards";
import { isHome } from "./home-guards";

export async function loadData(): Promise<Data> {
  const [
    products,
    rawOffers,
    rawStock,
    rawCategories,
    rawShop,
    rawHome,
  ] = await Promise.all([
    loadProducts(),
    getJSON("/offers.json"),
    getJSON("/stock.json"),
    getJSON("/categories.json"),
    getJSON("/shop.json"),
    getJSON("/home.json"),
  ]);

  if (!isArrayOf(rawOffers, isOffer)) {
    throw new Error("Invalid offers data");
  }

  if (!isStock(rawStock)) {
    throw new Error("Invalid stock data");
  }

  if (!isArrayOf(rawCategories, isCategory)) {
    throw new Error("Invalid categories data");
  }

  if (!isShop(rawShop)) {
    throw new Error("Invalid shop data");
  }

  if (!isHome(rawHome)) {
    throw new Error("Invalid home data");
  }

  return {
    products,
    offers: rawOffers,
    stock: rawStock,
    categories: rawCategories,
    shop: rawShop,
    home: rawHome,
  };
}