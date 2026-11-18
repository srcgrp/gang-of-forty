import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Offer, Product } from "../../scripts/types";
import { useCartStore } from "../../hooks/useCartStore.ts";
import { cartCount } from "../../scripts/logic/cart/cart-lines.ts";
import CartLines from "./CartLines.tsx";

const format = new Intl.NumberFormat("fa-IR");

type CartPanelProps = { products: Product[]; offers: Offer[] };

export default function CartPanel({ products, offers }: CartPanelProps) {
  const count = useCartStore((s) => cartCount(s.cart));
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
          {count > 0 && (
            <Link
              className="cart-checkout-link"
              to="/checkout"
              onClick={() => setOpen(false)}
            >
              تسویه حساب
            </Link>
          )}
          <CartLines products={products} offers={offers} />
        </div>
      </div>
    </div>
  );
}
