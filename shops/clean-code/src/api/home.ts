import type { Home } from "../types/shop.ts";

function isCta(x: unknown): x is { label: string; href: string } {
  return (
    typeof x === "object" &&
    x !== null &&
    "label" in x &&
    typeof x.label === "string" &&
    "href" in x &&
    typeof x.href === "string"
  );
}

function isBanner(x: unknown): boolean {
  return (
    typeof x === "object" &&
    x !== null &&
    "title" in x &&
    typeof x.title === "string" &&
    "text" in x &&
    typeof x.text === "string" &&
    "emoji" in x &&
    typeof x.emoji === "string" &&
    "cta" in x &&
    isCta(x.cta)
  );
}

function isPromo(x: unknown): boolean {
  return (
    typeof x === "object" &&
    x !== null &&
    "text" in x &&
    typeof x.text === "string" &&
    "emoji" in x &&
    typeof x.emoji === "string" &&
    "color" in x &&
    typeof x.color === "string" &&
    "href" in x &&
    typeof x.href === "string"
  );
}

function isCarousel(x: unknown): boolean {
  if (typeof x !== "object" || x === null) return false;
  if (!("id" in x) || typeof x.id !== "string") return false;
  if (!("title" in x) || typeof x.title !== "string") return false;
  if (!("emoji" in x) || typeof x.emoji !== "string") return false;
  if ("source" in x) return x.source === "offers";
  return "categoryId" in x && typeof x.categoryId === "number";
}

export function isHome(x: unknown): x is Home {
  if (typeof x !== "object" || x === null) return false;
  if (!("hero" in x) || !isBanner(x.hero)) return false;
  if (!("side" in x) || !isBanner(x.side)) return false;
  if (!("promos" in x) || !Array.isArray(x.promos)) return false;
  if (!x.promos.every(isPromo)) return false;
  if (!("carousels" in x) || !Array.isArray(x.carousels)) return false;
  return x.carousels.every(isCarousel);
}
