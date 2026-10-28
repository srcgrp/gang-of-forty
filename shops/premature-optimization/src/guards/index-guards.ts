export { isRecord } from "./common-guards";

export { isProduct, isOffer } from "./product-guards";

export { isCategory } from "./category-guards";

export { isStock } from "./stock-guards";

export { isShop } from "./shop-guards";

export { isHome } from "./home-guards";

export function assertNever(value: never): never {
  throw new Error(`حالت پیش‌بینی‌نشده: ${JSON.stringify(value)}`);
}
