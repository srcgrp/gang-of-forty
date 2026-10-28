import type { Stock } from '../types';

export function inStock(id: number, stock: Stock | null): boolean {
  if (!stock) return true;
  return (stock.items[id] ?? 0) > 0;
}

export function stockOf(id: number, stock: Stock | null): number {
  if (!stock) return 999;
  return stock.items[id] ?? 0;
}