import type { Product, Offer, StockData, Shop, Category, Home } from './types';
import {
  isProductArray, isOfferArray, isStockData, isShop,
  isCategoryArray, isHome,
} from './validators';

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

export const API = {
  products: `${API_BASE}/products.json`,
  stock: `${API_BASE}/stock.json`,
  offers: `${API_BASE}/offers.json`,
  shop: `${API_BASE}/shop.json`,
  categories: `${API_BASE}/categories.json`,
  home: `${API_BASE}/home.json`,
};

const TIMEOUT_MS = 8000;

async function fetchRaw(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json: unknown = await res.json();
    return json;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await fetchRaw(API.products);
  if (!isProductArray(data)) throw new Error('Invalid products.json shape');
  return data;
}

export async function fetchOffers(): Promise<Offer[]> {
  const data = await fetchRaw(API.offers);
  if (!isOfferArray(data)) throw new Error('Invalid offers.json shape');
  return data;
}

export async function fetchStock(): Promise<StockData> {
  const data = await fetchRaw(API.stock);
  if (!isStockData(data)) throw new Error('Invalid stock.json shape');
  return data;
}

export async function fetchShop(): Promise<Shop> {
  const data = await fetchRaw(API.shop);
  if (!isShop(data)) throw new Error('Invalid shop.json shape');
  return data;
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await fetchRaw(API.categories);
  if (!isCategoryArray(data)) throw new Error('Invalid categories.json shape');
  return data;
}

export async function fetchHome(): Promise<Home> {
  const data = await fetchRaw(API.home);
  if (!isHome(data)) throw new Error('Invalid home.json shape');
  return data;
}