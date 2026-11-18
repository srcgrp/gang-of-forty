import { useEffect } from "react";
import { useCartStore } from "../../hooks/useCartStore.ts";
import { formatNumber } from "../../lib/formatNumber.ts";
import { cartCount } from "../../scripts/logic/cart/cart-lines.ts";

export default function DocumentTitle({ name }: { name: string }) {
  const count = useCartStore((s) => cartCount(s.cart));

  useEffect(() => {
    document.title = `${name} (${formatNumber(count)}) 🛒`;
  }, [name, count]);

  return null;
}
