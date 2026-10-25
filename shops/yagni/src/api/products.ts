import type { Product, Offer, ProductData, SuggestionsData, Stock } from '../types';
import { getJson, clearRequestCache } from './request';
import { isProduct, isOffer, isStock } from './guards-products';
const API_URL = import.meta.env.VITE_API_URL;
const productsUrl = `${API_URL}/products.json`;
const offersUrl = `${API_URL}/offers.json`;
const stockUrl = `${API_URL}/stock.json`;
async function getValidProducts(): Promise<Product[]> {
  const raw = await getJson(productsUrl);
  if (!Array.isArray(raw)) { clearRequestCache(productsUrl); throw new Error('Invalid products API response'); }
  const entries: unknown[] = raw;
  const products = entries.filter(isProduct);
  if (products.length !== entries.length) console.warn(`Skipped ${entries.length - products.length} invalid product(s)`);
  return products;
}
async function getOffers(): Promise<Offer[]> {
  const raw = await getJson(offersUrl);
  if (!Array.isArray(raw)) { clearRequestCache(offersUrl); throw new Error('Invalid offers API response'); }
  const entries: unknown[] = raw;
  if (!entries.every(isOffer)) { clearRequestCache(offersUrl); throw new Error('Invalid offers API response'); }
  return entries.filter(isOffer);
}
export async function fetchProducts(): Promise<ProductData> {
  const [products, offers] = await Promise.all([getValidProducts(), getOffers()]);
  return { products, offers };
}
export async function fetchSuggestions(): Promise<SuggestionsData> {
  const [products, offers, rawStock] = await Promise.all([getValidProducts(), getOffers(), getJson(stockUrl)]);
  if (!isStock(rawStock)) { clearRequestCache(stockUrl); throw new Error('Invalid stock API response'); }
  const stock: Stock = rawStock;
  return { products, offers, stock };
}

export async function loadProducts(): Promise<Product[]> {
  return getValidProducts();
}
export async function loadOffers(): Promise<Offer[]> {
  return getOffers();
}
export async function loadStock(): Promise<Stock> {
  const raw = await getJson(stockUrl);
  if (!isStock(raw)) { clearRequestCache(stockUrl); throw new Error('Invalid stock API response'); }
  return raw;
}
