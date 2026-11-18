import { useMemo } from "react";
import type { CartLine, Offer, Product } from "../scripts/types";
import { getPricedLines } from "../scripts/logic/cart/cart-lines.ts";
import { useCartStore } from "./useCartStore.ts";

export function usePricedCartLines(
  products: Product[],
  offers: Offer[],
): CartLine[] {
  const cart = useCartStore((state) => state.cart);

  return useMemo(
    () => getPricedLines(cart, products, offers),
    [cart, products, offers],
  );
}
