import type { Offer, Product, Stock } from '../types';

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}

export function isProduct(x: unknown): x is Product {
  return (
    isRecord(x) &&
    typeof x['id'] === 'number' &&
    typeof x['name'] === 'string' &&
    typeof x['emoji'] === 'string' &&
    typeof x['unit'] === 'string' &&
    typeof x['price'] === 'number' &&
    typeof x['categoryId'] === 'number'
  );
}

export function isOffer(x: unknown): x is Offer {
  return (
    isRecord(x) &&
    typeof x['productId'] === 'number' &&
    typeof x['percent'] === 'number'
  );
}

export function isStock(x: unknown): x is Stock {
  if (!isRecord(x)) return false;
  const items = x['items'];
  return isRecord(items) && Object.values(items).every((qty) => typeof qty === 'number');
}

export function isArrayOf<T>(
  x: unknown,
  guard: (item: unknown) => item is T,
): x is T[] {
  return Array.isArray(x) && x.every(guard);
}
