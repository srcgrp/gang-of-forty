import type { Home } from "../../types";
import { isRecord } from "../../validation/record";

export function isHome(x: unknown): x is Home {
  if (!isRecord(x)) return false;

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
    (value.source === undefined ||
      typeof value.source === "string") &&
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