import type { Product, Offer, Stock, Category } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function getJSON(name: string): Promise<unknown> {
  const res = await fetch(`${API_BASE}/${name}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  return res.json() as unknown;
}

function isProductArray(data: unknown): data is Product[] {
  return Array.isArray(data) && data.every(p => typeof p === 'object' && p !== null && 'id' in p && 'price' in p);
}
function isOfferArray(data: unknown): data is Offer[] {
  return Array.isArray(data) && data.every(o => typeof o === 'object' && o !== null && 'productId' in o && 'percent' in o);
}
function isStock(data: unknown): data is Stock {
  return typeof data === 'object' && data !== null && 'items' in data;
}
function isCategoryArray(data: unknown): data is Category[] {
  return Array.isArray(data) && data.every(c => typeof c === 'object' && c !== null && 'id' in c && 'name' in c);
}

export async function fetchShopData(): Promise<{ products: Product[], offers: Offer[], stock: Stock, categories: Category[] }> {
  try {
    const [rawProducts, rawOffers, rawStock, rawCategories] = await Promise.all([
      getJSON('products.json'),
      getJSON('offers.json'),
      getJSON('stock.json'),
      getJSON('categories.json'),
    ]);

    if (!isProductArray(rawProducts)) throw new Error('داده‌های محصولات نامعتبر است');
    if (!isOfferArray(rawOffers)) throw new Error('داده‌های تخفیف‌ها نامعتبر است');
    if (!isStock(rawStock)) throw new Error('داده‌های موجودی نامعتبر است');
    if (!isCategoryArray(rawCategories)) throw new Error('داده‌های دسته‌بندی نامعتبر است');

    return { products: rawProducts, offers: rawOffers, stock: rawStock, categories: rawCategories };
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`خطا در دریافت داده: ${error.message}`);
    throw new Error('خطای ناشناخته در دریافت داده');
  }
}