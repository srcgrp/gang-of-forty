import type {
  Home,
  Banner,
  Promo,
  Carousel,
} from "../types";

import {
  isRecord,
  isArrayOf,
  isLink,
} from "./guard-basics";

function isBanner(x: unknown): x is Banner {
  return (
    isRecord(x) &&
    typeof x.title === "string" &&
    typeof x.text === "string" &&
    typeof x.emoji === "string" &&
    isLink(x.cta)
  );
}

function isPromo(x: unknown): x is Promo {
  return (
    isRecord(x) &&
    typeof x.text === "string" &&
    typeof x.emoji === "string" &&
    typeof x.color === "string" &&
    typeof x.href === "string"
  );
}

function isCarousel(x: unknown): x is Carousel {
  if (
    !isRecord(x) ||
    typeof x.id !== "string" ||
    typeof x.title !== "string" ||
    typeof x.emoji !== "string"
  ) {
    return false;
  }

  return (
    (typeof x.source === "string" &&
      !("categoryId" in x)) ||
    (typeof x.categoryId === "number" &&
      Number.isFinite(x.categoryId) &&
      !("source" in x))
  );
}

export function isHome(x: unknown): x is Home {
  if (!isRecord(x)) return false;

  return (
    isBanner(x.hero) &&
    isBanner(x.side) &&
    isArrayOf(x.promos, isPromo) &&
    isArrayOf(x.carousels, isCarousel)
  );
}