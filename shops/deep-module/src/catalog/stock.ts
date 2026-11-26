import type { Offer, StockData } from "../types";

export function getOfferPercent(
  offers: Offer[],
  productId: number,
): number | undefined {
  return offers.find((o) => o.productId === productId)?.percent;
}

export function getEffectiveStock(
  stock: StockData,
  consumed: Record<number, number>,
): StockData {
  const items: Record<number, number> = {};
  for (const [k, v] of Object.entries(stock.items)) {
    const id = Number(k);
    items[id] = Math.max(0, v - (consumed[id] ?? 0));
  }
  return { items };
}
