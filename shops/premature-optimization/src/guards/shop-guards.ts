import type {
  ShopMenuItem,
  ShopScheduleItem,
  ShopHours,
  Shop,
} from "../scripts/types";

import {
  isRecord,
  isString,
  isNullableString,
  isArrayOf,
  isFiniteNumber,
} from "./common-guards";

function isMenuItem(x: unknown): x is ShopMenuItem {
  return isRecord(x) && isString(x.label) && isString(x.href);
}

function isScheduleItem(x: unknown): x is ShopScheduleItem {
  return isRecord(x) && isString(x.days) && isString(x.time);
}

function isShopHours(x: unknown): x is ShopHours {
  return isRecord(x) && isString(x.open) && isString(x.close);
}

export function isShop(x: unknown): x is Shop {
  return (
    isRecord(x) &&
    isString(x.name) &&
    isNullableString(x.slogan) &&
    isString(x.owner) &&
    isString(x.city) &&
    isString(x.phone) &&
    isShopHours(x.hours) &&
    isFiniteNumber(x.deliveryFee) &&
    isFiniteNumber(x.freeDeliveryOver) &&
    isString(x.currency) &&
    isNullableString(x.notice) &&
    isString(x.about) &&
    isString(x.address) &&
    isArrayOf(x.schedule, isScheduleItem) &&
    isArrayOf(x.menu, isMenuItem) &&
    isString(x.copyright)
  );
}
