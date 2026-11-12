import { useMemo } from "react";
import type { StockData } from "../types";

export function useEffectiveStock(
  stock: StockData,
  consumed: Record<number, number>,
): StockData {
  return useMemo(() => {
    const items: Record<number, number> = {};
    for (const [k, v] of Object.entries(stock.items)) {
      const id = Number(k);
      items[id] = Math.max(0, v - (consumed[id] ?? 0));
    }
    return { items };
  }, [stock, consumed]);
}
