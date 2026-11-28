import type { Cart, Stock } from "../../types";

export function availableStock(stock: Stock, cart: Cart): Stock {
  return {
    ...stock,
    items: Object.fromEntries(
      Object.entries(stock.items).map(([id, quantity]) => [
        id,
        quantity - (cart[id] ?? 0),
      ]),
    ),
  };
}
