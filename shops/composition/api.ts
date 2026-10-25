import type { Product, Stock, Offer, Category, Shop, Home } from "./types";
import { isList } from "./validation";
import { isProduct } from "./product-guard";
import { isCategory, isOffer, isStock } from "./catalog-guards";
import { isShop } from "./shop-guard";
import { isHome } from "./home-guard";

const apiUrl: string = import.meta.env.VITE_API_URL || "../../api";

async function getJSON(file: string): Promise<unknown> {
  const response: Response = await fetch(apiUrl + "/" + file);
  if (!response.ok) {
    throw new Error("دریافت اطلاعات ناموفق بود: " + response.status);
  }
  const data: unknown = await response.json();
  return data;
}

export async function getProducts(): Promise<Product[]> {
  const data = await getJSON("products.json");
  if (!isList(data)) throw new Error("ساختار فهرست محصولات معتبر نیست.");
  const products = data.filter(isProduct);
  console.info("تعداد محصولات نامعتبر حذف‌شده:", data.length - products.length);
  return products;
}

export async function getStock(): Promise<Stock> {
  const data = await getJSON("stock.json");
  if (!isStock(data)) throw new Error("اطلاعات موجودی معتبر نیست.");
  return data;
}

export async function getOffers(): Promise<Offer[]> {
  const data = await getJSON("offers.json");
  if (!isList(data) || !data.every(isOffer)) {
    throw new Error("اطلاعات تخفیف‌ها معتبر نیست.");
  }
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const data = await getJSON("categories.json");
  if (!isList(data) || !data.every(isCategory)) {
    throw new Error("اطلاعات دسته‌بندی‌ها معتبر نیست.");
  }
  return data;
}

export async function getShop(): Promise<Shop> {
  const data = await getJSON("shop.json");
  if (!isShop(data)) throw new Error("اطلاعات فروشگاه معتبر نیست.");
  return data;
}

export async function getHome(): Promise<Home> {
  const data = await getJSON("home.json");
  if (!isHome(data)) throw new Error("اطلاعات صفحهٔ اصلی معتبر نیست.");
  return data;
}
