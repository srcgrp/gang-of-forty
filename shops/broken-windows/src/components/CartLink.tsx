import { Link } from "@tanstack/react-router";
import { formatNumber } from "../format";
import { useCartDrawerStore } from "../hooks/useCartDrawerStore";
import type { MouseEvent } from "react";

type Props = { count: number };
const MOBILE_QUERY = "(max-width: 768px), (hover: none)";
export default function CartLink({ count }: Props) {
  const openDrawer = useCartDrawerStore((s) => s.open);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia(MOBILE_QUERY).matches) {
      e.preventDefault(); // stay on the page and open the drawer instead
      openDrawer();
    }
  }
  return (
    <Link to="/checkout" className="cart" aria-label={`سبد خرید، ${count} کالا`} onClick={handleClick}>
      <span className="cart-icon"><svg aria-hidden="true" className="cart-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg></span>
      <span className="cart-label">سبد خرید</span>
      <span className="cart-count">{formatNumber(count)}</span>
    </Link>
  );
}