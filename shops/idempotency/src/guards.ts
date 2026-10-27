import type { Product, Category , Offer ,Stock , Shop ,Home} from "./types";

export function isProduct(x: unknown): x is Product {
  if (typeof x !== "object" || x === null || Array.isArray(x)) {
    return false;
  }

  return (
    "id" in x &&
    typeof x.id === "number" &&
    Number.isFinite(x.id) &&
    "name" in x &&
    typeof x.name === "string" &&
    "categoryId" in x &&
    typeof x.categoryId === "number" &&
    Number.isFinite(x.categoryId) &&
    "price" in x &&
    typeof x.price === "number" &&
    Number.isFinite(x.price) &&
    "unit" in x &&
    typeof x.unit === "string" &&
    (!("emoji" in x) || typeof x.emoji === "string")
  );
}

export function isCategory(x: unknown): x is Category {
  if (typeof x !== "object" || x === null || Array.isArray(x)) {
    return false;
  }

  return (
    "id" in x &&
    typeof x.id === "number" &&
    Number.isFinite(x.id) &&
    "name" in x &&
    typeof x.name === "string" &&
    "slug" in x &&
    typeof x.slug === "string"
  );
}

export function isOffer(x: unknown): x is Offer {
  if (typeof x !== "object" || x === null || Array.isArray(x)) {
    return false;
  }

  return (
    "productId" in x &&
    typeof x.productId === "number" &&
    Number.isFinite(x.productId) &&
    "percent" in x &&
    typeof x.percent === "number" &&
    Number.isFinite(x.percent) &&
    "label" in x &&
    typeof x.label === "string"
  );
}

export function isStock(x: unknown): x is Stock {
  if (typeof x !== "object" || x === null || Array.isArray(x)) {
    return false;
  }

  if (
    !("items" in x) ||
    typeof x.items !== "object" ||
    x.items === null ||
    Array.isArray(x.items)
  ) {
    return false;
  }

  return Object.entries(x.items).every(
    ([id, quantity]) =>
      Number.isSafeInteger(Number(id)) &&
      Number(id) >= 0 &&
      id.trim() !== "" &&
      typeof quantity === "number" &&
      Number.isSafeInteger(quantity) &&
      quantity >= 0,
  );
}

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function isShop(x: unknown): x is Shop {
  if (!isRecord(x)) {
    return false;
  }

  const isLink = (item: unknown): boolean =>
    isRecord(item) &&
    typeof item.href === "string" &&
    typeof item.label === "string";

  const isSchedule = (item: unknown): boolean =>
    isRecord(item) &&
    typeof item.days === "string" &&
    typeof item.time === "string";

  return (
    Array.isArray(x.help) &&
    x.help.every(isLink) &&
    Array.isArray(x.menu) &&
    x.menu.every(isLink) &&
    Array.isArray(x.schedule) &&
    x.schedule.every(isSchedule) &&
    typeof x.about === "string" &&
    typeof x.phone === "string" &&
    typeof x.address === "string" &&
    typeof x.name === "string" &&
    typeof x.copyright === "string" &&
    typeof x.notice === "string"
  );
}

export function isHome(x: unknown): x is Home {
  if (!isRecord(x)) {
    return false;
  }

  const isHero = (value: unknown): boolean =>
    isRecord(value) &&
    typeof value.title === "string" &&
    typeof value.text === "string" &&
    isRecord(value.cta) &&
    typeof value.cta.label === "string" &&
    typeof value.cta.href === "string";

  const isPromo = (value: unknown): boolean =>
    isRecord(value) &&
    typeof value.href === "string" &&
    typeof value.text === "string";

  const isCarousel = (value: unknown): boolean =>
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    (value.source === undefined || typeof value.source === "string") &&
    (value.categoryId === undefined ||
      (typeof value.categoryId === "number" &&
        Number.isFinite(value.categoryId)));

  return (
    isHero(x.hero) &&
    isHero(x.side) &&
    Array.isArray(x.promos) &&
    x.promos.every(isPromo) &&
    Array.isArray(x.carousels) &&
    x.carousels.every(isCarousel)
  );
}