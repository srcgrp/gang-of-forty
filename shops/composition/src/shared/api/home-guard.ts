import type { Banner, Promo, Carousel, Home } from "../types";
import { isObject, isId, isList } from "./validation";
import { isMenuLink } from "./shop-guard";

function isBanner(value: unknown): value is Banner {
  return isObject(value) && typeof value.title === "string" &&
    typeof value.text === "string" && typeof value.emoji === "string" &&
    isMenuLink(value.cta);
}

function isPromo(value: unknown): value is Promo {
  return isObject(value) && typeof value.text === "string" &&
    typeof value.emoji === "string" && typeof value.color === "string" &&
    typeof value.href === "string";
}

function isCarousel(value: unknown): value is Carousel {
  if (!isObject(value) || typeof value.id !== "string" ||
      typeof value.title !== "string" || typeof value.emoji !== "string") return false;
  if (value.source === "offers") return value.categoryId === undefined;
  return value.source === undefined && isId(value.categoryId);
}

export function isHome(value: unknown): value is Home {
  return isObject(value) && isBanner(value.hero) && isBanner(value.side) &&
    isList(value.promos) && value.promos.every(isPromo) &&
    isList(value.carousels) && value.carousels.every(isCarousel);
}
