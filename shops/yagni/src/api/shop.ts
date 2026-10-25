import type { Shop, ShopData } from '../types';
import { getJson, clearRequestCache } from './request';
import { isShop } from './guards-shop';
import { fetchCategories } from './categories';
export async function fetchShop(): Promise<ShopData> {
  const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/shop.json`;
  const [rawShop, categories] = await Promise.all([getJson(url), fetchCategories()]);
  if (!isShop(rawShop)) { clearRequestCache(url); throw new Error('Invalid shop API response'); }
  const shop: Shop = rawShop;
  return { shop, categories };
}
