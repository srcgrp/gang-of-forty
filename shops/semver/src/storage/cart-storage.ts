import type { CartLine } from '../types.ts';

const KEY = 'cart';

function isCartLine(x: unknown): x is CartLine {
  return (
    typeof x === 'object' &&
    x !== null &&
    'productId' in x &&
    typeof x.productId === 'number' &&
    'qty' in x &&
    typeof x.qty === 'number'
  );
}

export function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return [];
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(isCartLine) : [];
  } catch {
    return [];
  }
}

export function saveCart(lines: readonly CartLine[]): void {
  localStorage.setItem(KEY, JSON.stringify(lines));
}