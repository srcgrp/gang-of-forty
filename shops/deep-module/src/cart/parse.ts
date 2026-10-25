import type { CartItem } from "../types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseCartItem(value: unknown): CartItem | null {
  if (!isRecord(value)) return null;
  const id = Number(value.id);
  const price = Number(value.price);
  const quantity = Number(value.quantity);
  if (!Number.isInteger(id) || id <= 0) return null;
  if (typeof value.name !== "string" || !value.name) return null;
  if (!Number.isFinite(price) || price < 0) return null;
  if (!Number.isInteger(quantity) || quantity < 1) return null;

  return {
    id,
    name: value.name.slice(0, 100),
    emoji: typeof value.emoji === "string" ? value.emoji.slice(0, 8) : "📦",
    unit: typeof value.unit === "string" ? value.unit.slice(0, 50) : "",
    price,
    quantity: Math.min(quantity, 99),
  };
}

export function parseCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const result: CartItem[] = [];
  for (const item of value) {
    const parsed = parseCartItem(item);
    if (parsed) result.push(parsed);
  }
  return result;
}