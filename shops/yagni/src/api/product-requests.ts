import type { Offer, Product, Stock } from "../types";
import { getJson, clearRequestCache } from "./request";
import { isProduct, isOffer, isStock } from "./guards-products";

const API_URL = import.meta.env.VITE_API_URL;
const productsUrl = `${API_URL}/products.json`;
const offersUrl = `${API_URL}/offers.json`;
const stockUrl = `${API_URL}/stock.json`;

export async function getValidProducts(): Promise<Product[]> {
  const raw = await getJson(productsUrl);
  if (!Array.isArray(raw)) {
    clearRequestCache(productsUrl);
    throw new Error("Invalid products API response");
  }
  const entries: unknown[] = raw;
  const products = entries.filter(isProduct);
  if (products.length !== entries.length) {
    console.warn(`Skipped ${entries.length - products.length} invalid product(s)`);
  }
  return products;
}

export async function getOffers(): Promise<Offer[]> {
  const raw = await getJson(offersUrl);
  if (!Array.isArray(raw)) {
    clearRequestCache(offersUrl);
    throw new Error("Invalid offers API response");
  }
  const entries: unknown[] = raw;
  if (!entries.every(isOffer)) {
    clearRequestCache(offersUrl);
    throw new Error("Invalid offers API response");
  }
  return entries.filter(isOffer);
}

export async function getValidStock(): Promise<Stock> {
  const raw = await getJson(stockUrl);
  if (!isStock(raw)) {
    clearRequestCache(stockUrl);
    throw new Error("Invalid stock API response");
  }
  return raw;
}
