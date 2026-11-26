import { useEffect } from "react";
import { cartCount } from "../cart/cart-lines.ts";
import { formatNumber } from "../format/formatting.ts";
import { useCartStore } from "./useCartStore.ts";

export function useCartTitle(): void {
  const count = useCartStore((s) => cartCount(s.lines));

  useEffect(() => {
    document.title = `پرتقال - ${formatNumber(count)} 🛒`;
  }, [count]);
}