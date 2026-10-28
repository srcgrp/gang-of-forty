import type { Product } from '../types';
import { getJSON } from './get-json';
import { isRecord } from './is-record';

function isProduct(v: unknown): v is Product {
  if (!isRecord(v)) return false;
  return (
    typeof v.id === 'number' &&
    typeof v.categoryId === 'number' &&
    typeof v.name === 'string' &&
    typeof v.emoji === 'string' &&
    typeof v.unit === 'string' &&
    typeof v.price === 'number' &&
    v.price >= 0 &&
    Array.isArray(v.tags) &&
    v.tags.every((t) => typeof t === 'string') &&
    (v.image === undefined || typeof v.image === 'string')
  );
}

export async function loadProducts(): Promise<Product[]> {
  const data = await getJSON('products.json');
  if (!Array.isArray(data)) {
    console.error('[api] products.json is not an array', data);
    throw new Error('Invalid products.json');
  }
  const products = data.filter(isProduct);
  const dropped = data.length - products.length;
  if (dropped > 0) {
    console.warn(`[api] ${dropped} invalid product(s) removed`);
  }
  return products;
}