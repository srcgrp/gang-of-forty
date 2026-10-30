import type { Product, StockItem, OfferItem } from '../types';

export async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`خطا در دریافت ${url}: ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export function isProduct(item: unknown): item is Product {
  if (typeof item !== 'object' || item === null) return false;
  const p = item as Record<string, unknown>;
  return (
    typeof p.id === 'string' &&
    typeof p.title === 'string' &&
    typeof p.price === 'number' &&
    typeof p.category === 'string' &&
    typeof p.image === 'string'
  );
}

export function isStockItem(item: unknown): item is StockItem {
  if (typeof item !== 'object' || item === null) return false;
  const s = item as Record<string, unknown>;
  return typeof s.productId === 'string' && typeof s.stock === 'number';
}

export function isOfferItem(item: unknown): item is OfferItem {
  if (typeof item !== 'object' || item === null) return false;
  const o = item as Record<string, unknown>;
  return typeof o.productId === 'string' && typeof o.discountPercent === 'number';
}
