
import { useState } from "react";
import type { CartRowView } from "../features/cart/logic/view";
import type { CartAction } from "../shared/types/products";
import CartPopover from "./CartPopover";

type Props = {
  count: number;
  rows: CartRowView[];
  total: number;
  onAction: (action: CartAction, id: number) => void;
  onClear: () => void;
};

function isDesktopHover(): boolean {
  return window.matchMedia(
    "(min-width: 769px) and (hover: hover) and (pointer: fine)",
  ).matches;
}

export default function CartPanel({
  count, rows, total, onAction, onClear,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

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
        onAction={onAction}
        onClear={onClear}
      />
    </div>
  );
}
