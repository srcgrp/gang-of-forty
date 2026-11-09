import type { CartAction, CartItem } from "./shared/types/products";
import { SAMPLE, SAMPLE_OFFERS, SAMPLE_STOCK } from "./sample-data";

import { productImages } from "./features/products/data";
import {
  addCartItem,
  canIncreaseCartItem,
  getCartCount,
  getCartSubtotal,
} from "./features/cart/logic/items";
import { applyCartAction } from "./features/cart/logic/actions";
import { toCartRows } from "./features/cart/logic/view";

const productMap = new Map(SAMPLE.map((product) => [product.id, product]));

const offerMap = new Map(
  SAMPLE_OFFERS.map((offer) => [offer.productId, offer]),
);

export function addSampleProduct(cart: CartItem[], id: number): CartItem[] {
  const product = productMap.get(id);
  const available = SAMPLE_STOCK.items[id] ?? 0;

  if (!product || !canIncreaseCartItem(cart, id, available)) {
    return cart;
  }

  return addCartItem(cart, product);
}

export function changeSampleCart(
  cart: CartItem[],
  action: CartAction,
  id: number,
): CartItem[] {
  return applyCartAction(cart, action, id, SAMPLE_STOCK.items[id] ?? 0);
}

export function getSampleCartSummary(cart: CartItem[]) {
  const rows = toCartRows(
    cart,
    productMap,
    offerMap,
    productImages,
    SAMPLE_STOCK.items,
  );

  return {
    rows,
    count: getCartCount(cart),
    total: getCartSubtotal(rows),
  };
}
