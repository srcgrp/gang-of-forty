import { useEffect, useRef, useState } from "react";
import type { CartLine } from "../../scripts/types";
import CartLineItem from "./CartLineItem.tsx";
import Price from "../shared/Price.tsx";

const format = new Intl.NumberFormat("fa-IR");

type CartPanelProps = {
  lines: CartLine[];
  count: number;
  total: number;
  onRemove: (id: number) => void;
};

export default function CartPanel({
  lines,
  count,
  total,
  onRemove,
}: CartPanelProps) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOutside(event: MouseEvent) {
      if (event.target instanceof Node && !wrap.current?.contains(event.target))
        setOpen(false);
    }
    document.addEventListener("click", closeOutside);
    return () => document.removeEventListener("click", closeOutside);
  }, []);

  return (
    <div
      className={open ? "cart-dropdown-wrap is-open" : "cart-dropdown-wrap"}
      ref={wrap}
    >
      <button
        className="cart-button"
        id="cart-button"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="cart-icon">🛒</span>
        <span className="cart-text">سبد خرید </span>
        <span className="cart-notification" id="cart-count">
          {format.format(count)}
        </span>
      </button>
      <div className="cart-dropdown" id="cart-dropdown">
        <div className="cart-dropdown-items" id="cart-dropdown-items">
          {lines.length === 0 ? (
            <p className="cart-empty">سبد خرید شما خالی است</p>
          ) : (
            <>
              {lines.map((line) => (
                <CartLineItem key={line.id} line={line} onRemove={onRemove} />
              ))}
              <div className="cart-dropdown-total">
                <span>جمع:</span>
                <Price value={total} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
