/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { CallToAction, CarouselDefinition, HomeData, HomeSection, Promo } from '../types';
import { isArrayOf, isId, isOptional, isRecord, isString } from './basic-guards';

function isCallToAction(value: unknown): value is CallToAction {
  return isRecord(value) && isString(value.label) && isString(value.href);
}
function isHomeSection(value: unknown): value is HomeSection {
  return isRecord(value) && isString(value.title) && isString(value.text) && isString(value.emoji) &&
    (value.cta === null || isOptional(isCallToAction)(value.cta));
}
function isCarouselDefinition(value: unknown): value is CarouselDefinition {
  return isRecord(value) && isString(value.id) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.id) &&
    isString(value.title) && isString(value.emoji) && (value.source === undefined || value.source === 'offers') &&
    isOptional(isId)(value.categoryId) && (value.source === 'offers' || isId(value.categoryId));
}
const isPromo = (value: unknown): value is Promo =>
  isRecord(value) && isString(value.text) && isString(value.href) && isString(value.emoji) && isString(value.color);
export function isHomeData(value: unknown): value is HomeData {
  return isRecord(value) && isHomeSection(value.hero) && isHomeSection(value.side) &&
    isArrayOf(isCarouselDefinition)(value.carousels) && isArrayOf(isPromo)(value.promos);
}