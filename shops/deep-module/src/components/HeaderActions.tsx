import { Link } from "@tanstack/react-router";
import { useCartStore } from "../hooks/useCartStore";
import { useWishlistStore } from "../hooks/useWishlistStore";
import { useUiStore } from "../hooks/useUiStore";
import { cartCount } from "../cart/cart";
import { faNum } from "../shared/ui/format";
import { ThemeToggle } from "./ThemeToggle";

export function HeaderActions() {
  const totalCount = useCartStore((s) => cartCount(s.items));
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const setWishlistOpen = useUiStore((s) => s.setWishlistOpen);
  const setUserOpen = useUiStore((s) => s.setUserOpen);

  return (
    <div className="header__actions">
      <ThemeToggle />
      <button type="button" className="header-action-btn" onClick={() => setUserOpen(true)} aria-label="ورود یا ثبت‌نام">
        <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" />
        </svg>
        <span className="action-btn__text"><small>حساب</small></span>
      </button>
      <button type="button" className="header-action-btn" onClick={() => setWishlistOpen(true)} aria-label="علاقه‌مندی‌ها">
        <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        {wishlistCount > 0 && <span className="cart-badge">{faNum(wishlistCount)}</span>}
      </button>
      <button type="button" className="header-action-btn" onClick={() => setCartOpen(true)} aria-label="سبد خرید">
        <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 6h15l-2 9H8L6 6zm0 0L5 3H2" />
          <circle cx="9" cy="20" r="1.5" fill="currentColor" />
          <circle cx="18" cy="20" r="1.5" fill="currentColor" />
        </svg>
        {totalCount > 0 && <span className="cart-badge">{faNum(totalCount)}</span>}
      </button>
      {totalCount > 0 && (
        <Link to="/checkout" className="btn btn--primary btn--sm">تسویه</Link>
      )}
    </div>
  );
}
