import { useCartStore } from "./useCartStore.ts";

export function useIsSoldOut(productId: number, stock: number): boolean {
  return useCartStore((s) => stock - (s.cart[String(productId)] ?? 0) <= 0);
}
