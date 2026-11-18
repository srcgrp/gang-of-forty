import { useCartStore } from "./useCartStore.ts";

export function useIsSoldOut(productId: number, stock: number): boolean {
  const inCart = useCartStore((s) => s.cart[String(productId)] ?? 0);
  return stock - inCart <= 0;
}
