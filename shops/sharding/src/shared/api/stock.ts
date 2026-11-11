import type { Stock } from '../types';
import { getJSON } from './get-json';
import { isRecord } from './is-record';

function isStock(v: unknown): v is Stock {
  if (!isRecord(v) || !isRecord(v.items)) return false;
  const itemsValid = Object.entries(v.items).every(([id, quantity]) => {
    const productId = Number(id);
    return Number.isSafeInteger(productId) && productId > 0 && String(productId) === id &&
      typeof quantity === 'number' && Number.isSafeInteger(quantity) && quantity >= 0;
  });
  if (!itemsValid) return false;
  if (v.updatedAt !== undefined && typeof v.updatedAt !== 'string') return false;
  return true;
}

export async function loadStock(): Promise<Stock> {
  const data = await getJSON('stock.json');
  if (!isStock(data)) throw new Error('Invalid stock.json');
  return data;
}
