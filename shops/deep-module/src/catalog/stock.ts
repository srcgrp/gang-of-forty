import type { StockData, StockMap } from "../types";

export interface StockLabel {
  text: string;
  type: "out" | "low" | "ok" | "unknown";
  count: number;
}

export function availableStock(stock: StockData, productId: number): number {
  const count = stock.items[productId];
  return Number.isFinite(count) ? Math.max(0, count) : Number.POSITIVE_INFINITY;
}

export function stockLabel(stock: StockData, productId: number): StockLabel {
  const count = availableStock(stock, productId);
  if (count === Number.POSITIVE_INFINITY) {
    return { text: "", type: "unknown", count: -1 };
  }
  if (count === 0) return { text: "ناموجود", type: "out", count: 0 };
  if (count <= 5) {
    return {
      text: `فقط ${count.toLocaleString("fa-IR")} عدد باقی مانده`,
      type: "low",
      count,
    };
  }
  return {
    text: `${count.toLocaleString("fa-IR")} عدد در انبار`,
    type: "ok",
    count,
  };
}

export function mergeStock(
  raw: StockData,
  consumed: Record<number, number>,
): StockData {
  const items: StockMap = {};
  for (const [k, v] of Object.entries(raw.items)) {
    const id = Number(k);
    const qty = Number(v);
    if (Number.isFinite(id) && id > 0 && Number.isFinite(qty)) {
      items[id] = Math.max(0, qty - (consumed[id] ?? 0));
    }
  }
  return { items };
}
