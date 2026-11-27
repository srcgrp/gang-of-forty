import type { Category } from '../types';
import { getJSON } from './get-json';
import { isRecord } from './is-record';

function isCategory(v: unknown): v is Category {
  if (!isRecord(v)) return false;
  return (
    typeof v.id === 'number' &&
    typeof v.slug === 'string' &&
    typeof v.name === 'string' &&
    typeof v.emoji === 'string' &&
    (v.color === undefined || typeof v.color === 'string') &&
    (v.image === undefined || typeof v.image === 'string')
  );
}

export async function loadCategories(): Promise<Category[]> {
  const data = await getJSON('categories.json');
  if (!Array.isArray(data) || !data.every(isCategory)) {
    throw new Error('Invalid categories.json');
  }
  return data;
}