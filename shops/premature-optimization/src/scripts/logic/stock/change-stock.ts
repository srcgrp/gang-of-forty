import type { Stock } from "../../types";
export function changeStock(
  stock: Stock,
  id: string,
  delta: number,
  updatedAt: string,
): Stock {
  const quantity = stock.items[id] ?? 0;
  if (quantity + delta < 0) return stock;
  return {
    ...stock,
    updatedAt,
    items: { ...stock.items, [id]: quantity + delta },
  };
}
