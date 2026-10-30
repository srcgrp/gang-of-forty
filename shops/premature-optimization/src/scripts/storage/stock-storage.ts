import type { Stock } from "../types";
const KEY = "superino-stock";
export function readStock(stock: Stock): Stock {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return stock;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !("items" in parsed))
      return stock;
    const items = (parsed as { items: unknown }).items;
    if (!items || typeof items !== "object" || Array.isArray(items))
      return stock;
    const valid = Object.entries(items).filter(
      (e): e is [string, number] =>
        typeof e[1] === "number" && Number.isFinite(e[1]) && e[1] >= 0,
    );
    return {
      ...stock,
      items: { ...stock.items, ...Object.fromEntries(valid) },
    };
  } catch {
    return stock;
  }
}
export function saveStock(stock: Stock): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(stock));
    return true;
  } catch {
    return false;
  }
}
