/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ShopData, ShopHelpItem, ShopMenuItem, ShopScheduleRow } from '../types';
import { isArrayOf, isOptional, isRecord, isString } from './basic-guards';

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
  return (
    isRecord(value) &&
    isOptional(isString)(value.notice) &&
    isOptional(isString)(value.about) &&
    isOptional(isArrayOf(isShopMenuItem))(value.menu) &&
    isOptional(isArrayOf(isShopHelpItem))(value.help) &&
    isOptional(isArrayOf(isShopScheduleRow))(value.schedule)
  );
}