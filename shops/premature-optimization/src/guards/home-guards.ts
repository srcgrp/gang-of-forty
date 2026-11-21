import type {
  CallToAction,
  BannerData,
  Promo,
  CarouselConfig,
  Home,
} from "../scripts/types";

import {
  isRecord,
  isString,
  isNullableString,
  isArrayOf,
} from "./common-guards";

function isCallToAction(x: unknown): x is CallToAction {
  return isRecord(x) && isString(x.label) && isString(x.href);
}

function isBanner(x: unknown): x is BannerData {
  return (
    isRecord(x) &&
    isString(x.title) &&
    isString(x.text) &&
    isString(x.emoji) &&
    (x.name === undefined || isString(x.name)) &&
    (x.cta === undefined || isCallToAction(x.cta))
  );
}

function isPromo(x: unknown): x is Promo {
  return (
    isRecord(x) &&
    isString(x.text) &&
    isString(x.href) &&
    isString(x.emoji) &&
    (x.name === undefined || isString(x.name))
  );
}

function isCarouselConfig(x: unknown): x is CarouselConfig {
  return (
    isRecord(x) &&
    isString(x.id) &&
    isString(x.title) &&
    (x.emoji === undefined || isNullableString(x.emoji)) &&
    (x.source === undefined || isString(x.source)) &&
    (x.categoryId === undefined ||
      x.categoryId === null ||
      Number.isInteger(x.categoryId)) &&
    (x.category === undefined ||
      (isRecord(x.category) && Number.isInteger(x.category.id)))
  );
}

export function isHome(x: unknown): x is Home {
  return (
    isRecord(x) &&
    (x.hero === undefined || x.hero === null || isBanner(x.hero)) &&
    (x.side === undefined || x.side === null || isBanner(x.side)) &&
    (x.promos === undefined || isArrayOf(x.promos, isPromo)) &&
    (x.carousels === undefined || isArrayOf(x.carousels, isCarouselConfig))
  );
}
