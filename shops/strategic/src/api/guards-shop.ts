/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ShopData, ShopHelpItem, ShopMenuItem, ShopScheduleRow } from '../types';
import { isArrayOf, isNonNegative, isOptional, isRecord, isString } from './basic-guards';

function isShopMenuItem(value: unknown): value is ShopMenuItem {
  return isRecord(value) && isString(value.label) && isString(value.href);
}
function isShopHelpItem(value: unknown): value is ShopHelpItem {
  return isRecord(value) && isString(value.label) && isOptional(isString)(value.href);
}
function isShopScheduleRow(value: unknown): value is ShopScheduleRow {
  return isRecord(value) && isString(value.days) && isString(value.time);
}
export function isShopData(value: unknown): value is ShopData {
  return isRecord(value) && isString(value.name) && isString(value.slogan) && isString(value.owner) &&
    isString(value.city) && isString(value.phone) && isRecord(value.hours) &&
    isString(value.hours.open) && isString(value.hours.close) && isNonNegative(value.deliveryFee) &&
    isNonNegative(value.freeDeliveryOver) && isString(value.currency) && isString(value.notice) &&
    isString(value.about) && isString(value.address) && isString(value.copyright) &&
    isArrayOf(isShopMenuItem)(value.menu) && isArrayOf(isShopHelpItem)(value.help) &&
    isArrayOf(isShopScheduleRow)(value.schedule);
}