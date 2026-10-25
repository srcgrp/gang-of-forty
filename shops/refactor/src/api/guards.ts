import type { Category, Offer, Product, Stock } from '../types';
import { isId, isNatural, isRecord, isText } from '../data/validation';

export const isSlug = (value: unknown): value is string =>
  isText(value) && /^[a-z][a-z0-9-]*$/.test(value);
export const isColor = (value: unknown): value is string =>
  isText(value) && /^#[0-9a-f]{6}$/i.test(value);

export const isProduct = (value: unknown): value is Product =>
  isRecord(value) && isId(value.id) && isId(value.categoryId) && isText(value.name)
  && isText(value.emoji) && isText(value.unit) && isNatural(value.price)
  && Array.isArray(value.tags) && value.tags.every(isText);

export const isCategory = (value: unknown): value is Category =>
  isRecord(value) && isId(value.id) && isSlug(value.slug) && isText(value.name)
  && isText(value.emoji) && isColor(value.color);

export const isOffer = (value: unknown): value is Offer =>
  isRecord(value) && isId(value.productId) && isNatural(value.percent)
  && value.percent > 0 && value.percent <= 100 && isText(value.label);

export const isStock = (value: unknown): value is Stock =>
  isRecord(value) && isText(value.updatedAt) && isRecord(value.items)
  && Object.entries(value.items).every(([id, count]) => /^[1-9]\d*$/.test(id) && isNatural(count));

export const readList = <T>(
  value: unknown, guard: (item: unknown) => item is T, file: string, notices: string[],
): T[] => {
  if (!Array.isArray(value)) throw new Error(`ساختار دادهٔ ${file} معتبر نیست.`);
  const accepted = value.filter(guard);
  const removed = value.length - accepted.length;
  if (removed > 0) {
    console.warn(`${file}: ${removed} record(s) failed the type guard and were skipped.`);
    notices.push(`${removed.toLocaleString('fa-IR')} رکورد نامعتبر از ${file} کنار گذاشته شد.`);
  }
  return accepted;
};

export const uniqueBy = <T>(items: T[], key: (item: T) => string | number, notices: string[]): T[] => {
  const seen = new Set<string | number>();
  return items.filter((item) => {
    const id = key(item);
    if (seen.has(id)) { notices.push('یک رکورد تکراری کنار گذاشته شد.'); return false; }
    seen.add(id);
    return true;
  });
};
