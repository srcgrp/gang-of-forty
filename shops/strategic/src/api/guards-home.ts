/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { CallToAction, CarouselDefinition, HomeData, HomeSection, Promo } from '../types';
import { isArrayOf, isFiniteNumber, isOptional, isRecord, isString } from './basic-guards';

function isCallToAction(value: unknown): value is CallToAction {
  return isRecord(value) && isString(value.label) && isString(value.href);
}

function isHomeSection(value: unknown): value is HomeSection {
  return (
    isRecord(value) &&
    isString(value.title) &&
    isString(value.text) &&
    (value.cta === null || isOptional(isCallToAction)(value.cta))
  );
}

function isCarouselDefinition(value: unknown): value is CarouselDefinition {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.title) &&
    isOptional(isString)(value.source) &&
    isOptional(isFiniteNumber)(value.categoryId)
  );
}

const isPromo = (value: unknown): value is Promo =>
  isRecord(value) && isString(value.text) && isString(value.href);

export function isHomeData(value: unknown): value is HomeData {
  return (
    isRecord(value) &&
    isHomeSection(value.hero) &&
    isHomeSection(value.side) &&
    isOptional(isArrayOf(isCarouselDefinition))(value.carousels) &&
    isOptional(isArrayOf(isPromo))(value.promos)
  );
}