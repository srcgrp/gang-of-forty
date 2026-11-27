import { useState } from "react";
import type { StoreData } from "../features/products/api/store-data";
import type { CartAction } from "../shared/types/products";
import { getStoreCartSummary } from "../store-cart";
import { useCartStore } from "../hooks/useCartStore";
import { useCartEffects } from "../features/cart/hooks/useCartEffects";
import { showCartStockLimitToast } from "../features/cart/ui/toast";
import CartPopover from "./CartPopover";

type Props = { data: StoreData | null };

function isDesktopHover(): boolean {
  return window.matchMedia(
    "(min-width: 769px) and (hover: hover) and (pointer: fine)",
  ).matches;
}

export default function CartPanel({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const lines = useCartStore((state) => state.lines);
  const change = useCartStore((state) => state.change);
  useCartEffects(lines);
  const { rows, count, total } = data
    ? getStoreCartSummary(lines, data.products, data.offers, data.stock)
    : { rows: [], count: 0, total: 0 };

  function handleAction(action: CartAction, id: number): void {
    if (!data) return;
    const changed = change(action, id, data.stock.items[id] ?? 0);
    if (!changed && action === "increase") showCartStockLimitToast();
  }

  return (
    <div
      className={`cart-summary${isOpen ? " is-open" : ""}`}
      id="cart-widget"
      onMouseEnter={() => {
        if (isDesktopHover()) setIsOpen(true);
      }}
      onMouseLeave={() => {
        if (isDesktopHover()) setIsOpen(false);
      }}
    >
      <button
        type="button"
        className="cart-trigger"
        id="cart-trigger"
        aria-controls="cart-popover"
        aria-expanded={isOpen}
        onClick={(event) => {
          if (!isDesktopHover() || event.detail === 0) {
            setIsOpen((open) => !open);
          }
        }}
      >
        <img className="cart-icon" src="./asset/icons/cart.svg" alt="" />
        <span>سبد خرید</span>
        <span className="cart-count">
          {count.toLocaleString("fa-IR")}
        </span>
      </button>

      <CartPopover
        rows={rows}
        total={total}
        onAction={handleAction}
      />
    </div>
  );
}
