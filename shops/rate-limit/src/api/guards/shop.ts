import type { Shop, ShopLink, ShopSchedule } from "../../types";
import { isArrayOf, isPrice, isRecord, isString } from "./basic";

const isShopLink = (x: unknown): x is ShopLink =>
  isRecord(x) && isString(x.label) && isString(x.href);

const isShopSchedule = (x: unknown): x is ShopSchedule =>
  isRecord(x) && isString(x.days) && isString(x.time);

export function isShop(x: unknown): x is Shop {
  return (
    isRecord(x) &&
    isString(x.name) &&
    isString(x.slogan) &&
    isString(x.owner) &&
    isString(x.city) &&
    isString(x.phone) &&
    isRecord(x.hours) &&
    isString(x.hours.open) &&
    isString(x.hours.close) &&
    isPrice(x.deliveryFee) &&
    isPrice(x.freeDeliveryOver) &&
    isString(x.currency) &&
    isString(x.notice) &&
    isString(x.about) &&
    isString(x.address) &&
    isArrayOf(x.schedule, isShopSchedule) &&
    isArrayOf(x.menu, isShopLink) &&
    isArrayOf(x.help, isShopLink) &&
    isString(x.copyright)
  );
}
