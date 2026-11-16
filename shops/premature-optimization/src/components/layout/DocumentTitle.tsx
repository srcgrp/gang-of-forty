import { useEffect } from "react";
import { useCartStore } from "../../hooks/useCartStore.ts";
import { cartCount } from "../../scripts/logic/cart/cart-lines.ts";

export default function DocumentTitle({ name }: { name: string }) {
  const count = useCartStore((s) => cartCount(s.cart));

  useEffect(() => {
    document.title = `${name} (${count.toLocaleString("fa-IR")}) 🛒`;
  }, [name, count]);

  return null;
}
