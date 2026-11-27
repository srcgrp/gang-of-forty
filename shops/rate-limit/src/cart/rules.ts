import type { Cart, CatalogItem } from "../types";

export const quantityOf = (cart: Cart, id: number): number =>
  cart[id]?.quantity ?? 0;

export const canAdd = (cart: Cart, item: CatalogItem): boolean =>
  quantityOf(cart, item.id) < item.stock;

export const countItems = (cart: Cart): number =>
  Object.values(cart).reduce((sum, line) => sum + line.quantity, 0);

export function addItem(cart: Cart, item: CatalogItem): Cart {
  if (!canAdd(cart, item)) return cart;
  const line = {
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: quantityOf(cart, item.id) + 1,
  };
  return { ...cart, [item.id]: line };
}
