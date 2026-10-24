import type { Category } from "../types/product.ts";
import { keepList } from "./list.ts";

export function loadCategories(raw: unknown) {
  return keepList(raw, isCategory, "categories");
}

export function isCategory(x: unknown): x is Category {
  if (typeof x !== "object" || x === null) return false;
  if (!("id" in x) || typeof x.id !== "number") return false;
  if (!("slug" in x) || typeof x.slug !== "string") return false;
  if (!("name" in x) || typeof x.name !== "string") return false;
  if (!("emoji" in x) || typeof x.emoji !== "string") return false;
  if (!("color" in x) || typeof x.color !== "string") return false;
  return true;
}
