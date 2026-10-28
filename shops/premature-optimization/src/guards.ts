import type * as Types from "./types";

export function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function isString(x: unknown): x is string {
  return typeof x === "string";
}

function isFiniteNumber(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x);
}

function isNullableString(x: unknown): x is string | null {
  return x === null || typeof x === "string";
}

function isArrayOf<T>(
  x: unknown,
  guard: (item: unknown) => item is T,
): x is T[] {
  return Array.isArray(x) && x.every(guard);
}

export function isProduct(x: unknown): x is Types.Product {
  return (
    isRecord(x) &&
    Number.isInteger(x.id) &&
    Number.isInteger(x.categoryId) &&
    isString(x.name) &&
    x.name.trim() !== "" &&
    isString(x.image) &&
    isString(x.unit) &&
    Number.isInteger(x.price) &&
    isFiniteNumber(x.price) &&
    x.price >= 0 &&
    isArrayOf(x.tags, isString)
  );
}

export function isOffer(x: unknown): x is Types.Offer {
  return (
    isRecord(x) &&
    Number.isInteger(x.productId) &&
    isFiniteNumber(x.percent) &&
    x.percent > 0 &&
    x.percent < 100 &&
    isString(x.label)
  );
}

export function isCategory(x: unknown): x is Types.Category {
  return (
    isRecord(x) &&
    Number.isInteger(x.id) &&
    isString(x.slug) &&
    x.slug !== "" &&
    isString(x.name) &&
    isString(x.image) &&
    isNullableString(x.emoji) &&
    isString(x.color)
  );
}

export function isStock(x: unknown): x is Types.Stock {
  return (
    isRecord(x) &&
    isString(x.updatedAt) &&
    isRecord(x.items) &&
    Object.values(x.items).every(
      (quantity: unknown): boolean => isFiniteNumber(quantity) && quantity >= 0,
    )
  );
}

function isMenuItem(x: unknown): x is Types.ShopMenuItem {
  return isRecord(x) && isString(x.label) && isString(x.href);
}

function isScheduleItem(x: unknown): x is Types.ShopScheduleItem {
  return isRecord(x) && isString(x.days) && isString(x.time);
}

function isShopHours(x: unknown): x is Types.ShopHours {
  return isRecord(x) && isString(x.open) && isString(x.close);
}

export function isShop(x: unknown): x is Types.Shop {
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

function isCallToAction(x: unknown): x is Types.CallToAction {
  return isRecord(x) && isString(x.label) && isString(x.href);
}

function isBanner(x: unknown): x is Types.BannerData {
  return (
    isRecord(x) &&
    isString(x.title) &&
    isString(x.text) &&
    isString(x.emoji) &&
    (x.name === undefined || isString(x.name)) &&
    (x.cta === undefined || isCallToAction(x.cta))
  );
}

function isPromo(x: unknown): x is Types.Promo {
  return (
    isRecord(x) &&
    isString(x.text) &&
    isString(x.href) &&
    isString(x.emoji) &&
    (x.name === undefined || isString(x.name))
  );
}

function isCarouselConfig(x: unknown): x is Types.CarouselConfig {
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

export function isHome(x: unknown): x is Types.Home {
  return (
    isRecord(x) &&
    (x.hero === undefined || x.hero === null || isBanner(x.hero)) &&
    (x.side === undefined || x.side === null || isBanner(x.side)) &&
    (x.promos === undefined || isArrayOf(x.promos, isPromo)) &&
    (x.carousels === undefined || isArrayOf(x.carousels, isCarouselConfig))
  );
}

export function assertNever(value: never): never {
  throw new Error(`حالت پیش‌بینی‌نشده: ${JSON.stringify(value)}`);
}
