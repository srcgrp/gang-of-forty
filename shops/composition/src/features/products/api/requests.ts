import type { Product, Stock, Offer, Category } from "../../../shared/types";
import { getJSON } from "../../../shared/api/http";
import { isList } from "../../../shared/api/validation";
import { isProduct } from "./product-guard";
import { isCategory, isOffer, isStock } from "./catalog-guards";

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

