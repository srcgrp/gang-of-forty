import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Offer, Product } from "../../scripts/types";
import { selectCartCount, useCartStore } from "../../hooks/useCartStore.ts";
import { formatNumber } from "../../lib/formatNumber.ts";
import CartLines from "./CartLines.tsx";

type CartPanelProps = { products: Product[]; offers: Offer[] };

export default function CartPanel({ products, offers }: CartPanelProps) {
  const itemCount = useCartStore(selectCartCount);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      const clickedOutside =
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target);
      if (clickedOutside) setIsOpen(false);
    }

    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, []);

  const closeDropdown = () => setIsOpen(false);

  return (
    <div
      className={isOpen ? "cart-dropdown-wrap is-open" : "cart-dropdown-wrap"}
      ref={containerRef}
    >
      <button
        className="cart-button"
        id="cart-button"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <span className="cart-icon">🛒</span>
        <span className="cart-text">سبد خرید </span>
        <span className="cart-notification" id="cart-count">
          {formatNumber(itemCount)}
        </span>
      </button>
      <div className="cart-dropdown" id="cart-dropdown">
        <div className="cart-dropdown-items" id="cart-dropdown-items">
          {itemCount > 0 && (
            <Link
              className="cart-checkout-link"
              to="/checkout"
              onClick={closeDropdown}
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