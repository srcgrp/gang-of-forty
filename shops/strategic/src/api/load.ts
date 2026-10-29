/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ApiData, HomeData, ShopData } from '../types';
import { isHomeData } from './guards-home';
import { isShopData } from './guards-shop';
import { getChecked } from './http';
import { loadCategories, loadOffers, loadProducts, loadStock } from './load-catalog';
const HARD_TIMEOUT_MS = 30_000;

export const loadShop = (signal?: AbortSignal): Promise<ShopData> =>
  getChecked('shop.json', isShopData, signal);

export const loadHome = (signal?: AbortSignal): Promise<HomeData> =>
  getChecked('home.json', isHomeData, signal);

export async function loadApiData(): Promise<ApiData> {
  const controller = new AbortController();
  const { signal } = controller;
  const timeoutId = window.setTimeout(() => controller.abort(), HARD_TIMEOUT_MS);

  try {
    const [products, categories, stock, offers, shop, home] = await Promise.all([
      loadProducts(signal),
      loadCategories(signal),
      loadStock(signal),
      loadOffers(signal),
      loadShop(signal),
      loadHome(signal),
    ]);
    return { products, categories, stock, offers, shop, home };
  } catch (error: unknown) {
    controller.abort();
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}