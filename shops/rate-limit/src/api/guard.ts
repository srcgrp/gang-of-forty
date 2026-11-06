import type {
  Category,
  Offer,
  Product,
  Shop,
  ShopLink,
  ShopSchedule,
  Stock,
} from "../types";

const isRecord = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null && !Array.isArray(x);

const isString = (x: unknown): x is string => typeof x === "string";

const isNumber = (x: unknown): x is number =>
  typeof x === "number" && Number.isFinite(x);

const isPrice = (x: unknown): x is number => isNumber(x) && x >= 0;

const isPercent = (x: unknown): x is number => isNumber(x) && x >= 0 && x <= 100;

const isArrayOf = <T>(
  x: unknown,
  guard: (v: unknown) => v is T
): x is T[] => Array.isArray(x) && x.every(guard);


export function isProduct(x: unknown): x is Product {
  return (
    isRecord(x) &&
    isNumber(x.id) &&
    isNumber(x.categoryId) &&
    isString(x.name) &&
    isString(x.emoji) &&
    isString(x.unit) &&
    isPrice(x.price) &&
    isArrayOf(x.tags, isString)
  );
}

export function isCategory(x: unknown): x is Category {
  return (
    isRecord(x) &&
    isNumber(x.id) &&
    isString(x.slug) &&
    isString(x.name) &&
    isString(x.emoji) &&
    isString(x.color)
  );
}

export function isOffer(x: unknown): x is Offer {
  return (
    isRecord(x) &&
    isNumber(x.productId) &&
    isPercent(x.percent) &&
    isString(x.label)
  );
}

export function isStock(x: unknown): x is Stock {
  return (
    isRecord(x) &&
    isString(x.updatedAt) &&
    isRecord(x.items) &&
    Object.values(x.items).every(isNumber)
  );
}

function isShopLink(x: unknown): x is ShopLink {
  return isRecord(x) && isString(x.label) && isString(x.href);
}

function isShopSchedule(x: unknown): x is ShopSchedule {
  return isRecord(x) && isString(x.days) && isString(x.time);
}

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
