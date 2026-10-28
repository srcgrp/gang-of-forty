import type { Category, Offer, Product, StockData } from '../types';
import { fetchChecked, fetchList } from './client';
import { isCategory, isOffer, isProduct, isStock } from './guards';

const BASE = import.meta.env.VITE_API_URL

export const fetchProducts = (): Promise<Product[]> =>
  fetchList(`${BASE}/products.json`, isProduct);

export const fetchOffers = (): Promise<Offer[]> =>
  fetchList(`${BASE}/offers.json`, isOffer);

export const fetchCategories = (): Promise<Category[]> =>
  fetchList(`${BASE}/categories.json`, isCategory);

export const fetchStock = (): Promise<StockData> =>
  fetchChecked(`${BASE}/stock.json`, isStock);
