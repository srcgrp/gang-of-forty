import type { ApiFile, Product, Stock, Offer, Category } from "../types";
export function isProduct(p: unknown): p is Product {
  return(typeof p === "object" &&
    p !== null &&
    "id" in p &&
    typeof p.id === "number" &&
    "categoryId" in p &&
    typeof p.categoryId === "number" &&
    "name" in p &&
    typeof p.name === "string" &&
    "emoji" in p &&
    typeof p.emoji === "string" &&
    "unit" in p &&
    typeof p.unit === "string" &&
    "price" in p &&
    typeof p.price === "number" &&
    "tags" in p &&
    Array.isArray(p.tags)&&
    p.tags.every((tag) => typeof tag === "string"))
}
export function isStock(s: unknown): s is Stock {
  return(typeof s === "object" &&
    s !== null &&
    "updatedAt" in s &&
    typeof s.updatedAt === "string" &&
    "items" in s &&
    typeof s.items === "object" &&
    s.items !== null &&
    Object.values(s.items).every((count) => typeof count === "number"))
}
export function isOffer(o: unknown): o is Offer {
  return(typeof o === "object" &&
    o !== null &&
    "productId" in o &&
    typeof o.productId === "number" &&
    "percent" in o &&
    typeof o.percent === "number" &&
    "label" in o &&
    typeof o.label === "string")
}
export function isCategory(c: unknown): c is Category {
  return(typeof c === "object" &&
    c !== null &&
    "id" in c &&
    typeof c.id === "number" &&
    "slug" in c &&
    typeof c.slug === "string" &&
    "name" in c &&
    typeof c.name === "string" &&
    "emoji" in c &&
    typeof c.emoji === "string" &&
    "color" in c &&
    typeof c.color === "string")
}
export async function getJSON(fileName: ApiFile): Promise<unknown> {
  const res = await fetch(`../../api/${fileName}.json`);
  if (!res.ok) {
    throw new Error(`${fileName}: HTTP ${res.status}`);
  }
  return await res.json();
}