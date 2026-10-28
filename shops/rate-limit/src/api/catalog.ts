import type { Offer, Product, Stock } from '../types';
import { isArrayOf, isOffer, isProduct, isStock } from './guards';

async function getJSON(url: string, errorMessage: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  const data: unknown = await response.json();
  return data;
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await getJSON('/api/products.json', 'خطا در دریافت اطلاعات محصولات');
  if (!isArrayOf(data, isProduct)) {
    throw new Error('ساختار اطلاعات محصولات نامعتبر است');
  }
  return data;
}

export async function fetchStock(): Promise<Stock> {
  const data = await getJSON('/api/stock.json', 'خطا در دریافت اطلاعات موجودی');
  if (!isStock(data)) {
    throw new Error('ساختار اطلاعات موجودی نامعتبر است');
  }
  return data;
}

export async function fetchOffers(): Promise<Offer[]> {
  const data = await getJSON('/api/offers.json', 'خطا در دریافت اطلاعات تخفیف‌ها');
  if (!isArrayOf(data, isOffer)) {
    throw new Error('ساختار اطلاعات تخفیف‌ها نامعتبر است');
  }
  return data;
}
