import type { Categories } from '../types';
import { getJson, clearRequestCache } from './request';
import { isCategory } from './guards-products';
export async function fetchCategories(): Promise<Categories> {
  const url = '../../api/categories.json';
  const data = await getJson(url);
  if (!Array.isArray(data)) { clearRequestCache(url); throw new Error('Invalid categories API response'); }
  const entries: unknown[] = data;
  if (!entries.every(isCategory)) { clearRequestCache(url); throw new Error('Invalid categories API response'); }
  return entries.filter(isCategory);
}

export const loadCategories = fetchCategories;
