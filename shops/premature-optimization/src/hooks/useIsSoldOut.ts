import { getCartQuantity } from "../scripts/logic/cart/cart-lines.ts";
import { useCartStore } from "./useCartStore.ts";

export function useIsSoldOut(productId: number, stock: number): boolean {
  return useCartStore(
    (state) => stock - getCartQuantity(state.cart, productId) <= 0,
  );
}
