import { useEffect } from "react";
import { useCartStore } from "../hooks/useCartStore.ts";
import { cartCount } from "../cart/totals.ts";
import { formatNumber } from "../format.ts";

const SHOP_NAME = "سارا مارکت";

export default function DocumentTitle() {
  const count = useCartStore((s) => cartCount(s.lines));
  useEffect(() => {
    document.title = count > 0 ? `${SHOP_NAME} (${formatNumber(count)})` : SHOP_NAME;
  }, [count]);

  return null;
}