import type { Shop, Schedule, MenuItem, HelpItem } from "../types";
import {
  isRecord,
  isString,
  isNonEmptyString,
  isNonNegativeNumber,
  isSafeHref,
} from "./guards-base";
function isSchedule(value: unknown): value is Schedule {
  return isRecord(value) && isString(value.days) && isString(value.time);
}
function isMenuItem(value: unknown): value is MenuItem {
  return (
    isRecord(value) && isNonEmptyString(value.label) && isSafeHref(value.href)
  );
}
function isHelpItem(value: unknown): value is HelpItem {
  return (
    isRecord(value) && isNonEmptyString(value.label) && isSafeHref(value.href)
  );
}
export function isShop(value: unknown): value is Shop {
  if (!isRecord(value) || !isRecord(value.hours)) return false;
  return (
    isString(value.name) &&
    isString(value.slogan) &&
    isString(value.owner) &&
    isString(value.city) &&
    isString(value.phone) &&
    isString(value.hours.open) &&
    isString(value.hours.close) &&
    isNonNegativeNumber(value.deliveryFee) &&
    isNonNegativeNumber(value.freeDeliveryOver) &&
    isString(value.currency) &&
    isString(value.notice) &&
    isString(value.about) &&
    isString(value.address) &&
    Array.isArray(value.schedule) &&
    value.schedule.every(isSchedule) &&
    Array.isArray(value.menu) &&
    value.menu.every(isMenuItem) &&
    Array.isArray(value.help) &&
    value.help.every(isHelpItem) &&
    isString(value.copyright)
  );
}
