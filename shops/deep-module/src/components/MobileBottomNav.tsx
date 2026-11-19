import { Link } from "@tanstack/react-router";
import { useCartStore } from "../hooks/useCartStore";
import { useUiStore } from "../hooks/useUiStore";
import { cartCount } from "../cart/cart";
import { faNum } from "../shared/ui/format";
import { CartIcon, CategoriesIcon, HomeIcon, ProfileIcon } from "./MobileNavIcons";

export function MobileBottomNav() {
  const totalCount = useCartStore((s) => cartCount(s.items));
  const { cartOpen, userOpen, drawerOpen, setCartOpen, setUserOpen, setDrawerOpen } = useUiStore();

  return (
    <nav className="mobile-bottom-nav" aria-label="ناوبری پایین موبایل">
      <Link to="/" className="mobile-nav-item" activeProps={{ className: "mobile-nav-item is-active" }} activeOptions={{ exact: true }}>
        <HomeIcon />
        <span>خانه</span>
      </Link>
      <button type="button" className={`mobile-nav-item ${drawerOpen ? "is-active" : ""}`} onClick={() => setDrawerOpen(!drawerOpen)} aria-expanded={drawerOpen}>
        <CategoriesIcon />
        <span>دسته‌ها</span>
      </button>
      <button type="button" className={`mobile-nav-item ${cartOpen ? "is-active" : ""}`} onClick={() => setCartOpen(true)}>
        <span className="mobile-nav-icon-wrap">
          <CartIcon />
          {totalCount > 0 && <span className="mobile-nav-badge">{faNum(totalCount)}</span>}
        </span>
        <span>سبد خرید</span>
      </button>
      <button type="button" className={`mobile-nav-item ${userOpen ? "is-active" : ""}`} onClick={() => setUserOpen(true)}>
        <ProfileIcon />
        <span>پروفایل</span>
      </button>
    </nav>
  );
}
