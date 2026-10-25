import type { Home, HomeSlide, Promo, HomeCarousel } from '../types';
import { isRecord, isString, isNonEmptyString, isPositiveInteger, isSafeHref } from './guards-base';
function isHomeSlide(value: unknown): value is HomeSlide {
  return isRecord(value) && isString(value.emoji) && isString(value.title) && isString(value.text) && isRecord(value.cta) && isSafeHref(value.cta.href) && isNonEmptyString(value.cta.label);
}
function isPromo(value: unknown): value is Promo { return isRecord(value) && isSafeHref(value.href) && isString(value.color) && isString(value.emoji) && isString(value.text); }
function isCarousel(value: unknown): value is HomeCarousel {
  if (!isRecord(value) || !isString(value.id) || !isString(value.title) || !isString(value.emoji)) return false;
  return (value.source === undefined || value.source === 'offers') && (value.categoryId === undefined || isPositiveInteger(value.categoryId));
}
export function isHome(value: unknown): value is Home {
  return isRecord(value) && isHomeSlide(value.hero) && isHomeSlide(value.side) && Array.isArray(value.promos) && value.promos.every(isPromo) && Array.isArray(value.carousels) && value.carousels.every(isCarousel);
}
