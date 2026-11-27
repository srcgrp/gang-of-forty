import type { Stock } from '../types';
import { getJSON } from './get-json';
import { isRecord } from './is-record';

function isStock(v: unknown): v is Stock {
  if (!isRecord(v) || !isRecord(v.items)) return false;
  const itemsValid = Object.values(v.items).every((n) => typeof n === 'number' && n >= 0);
  if (!itemsValid) return false;
  if (v.updatedAt !== undefined && typeof v.updatedAt !== 'string') return false;
  return true;
}

export async function loadStock(): Promise<Stock> {
  const data = await getJSON('stock.json');
  if (!isStock(data)) throw new Error('Invalid stock.json');
  return data;
}