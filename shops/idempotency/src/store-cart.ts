import type {
  CartAction,
  CartItem,
  Offer,
  Product,
  Stock,
} from "./shared/types/products";
import { productImages } from "./features/products/data";
import {
  addCartItem,
  canIncreaseCartItem,
  getCartCount,
  getCartSubtotal,
} from "./features/cart/logic/items";
import { applyCartAction } from "./features/cart/logic/actions";
import { toCartRows } from "./features/cart/logic/view";

export function addStoreProduct(
  cart: CartItem[],
  id: number,
  products: Product[],
  stock: Stock,
): CartItem[] {
  const product = products.find((item) => item.id === id);
  const available = stock.items[id] ?? 0;

  return product && canIncreaseCartItem(cart, id, available)
    ? addCartItem(cart, product)
    : cart;
}

export function changeStoreCart(
  cart: CartItem[],
  action: CartAction,
  id: number,
  stock: Stock,
): CartItem[] {
  return applyCartAction(cart, action, id, stock.items[id] ?? 0);
}

export function getStoreCartSummary(
  cart: CartItem[],
  products: Product[],
  offers: Offer[],
  stock: Stock,
) {
  const productsById = new Map(products.map((p) => [p.id, p]));
  const offersById = new Map(offers.map((o) => [o.productId, o]));

  const rows = toCartRows(
    cart,
    productsById,
    offersById,
    productImages,
    stock.items,
  );

  return {
    rows,
    count: getCartCount(cart),
    total: getCartSubtotal(rows),
  };
}
