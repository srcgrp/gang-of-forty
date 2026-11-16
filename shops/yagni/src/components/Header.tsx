import { Link } from "@tanstack/react-router";
import SearchBox from "./SearchBox";
import { useThemeStore } from "../hooks/useThemeStore";
import { countCartItems, totalCartPrice } from "../cart/cart-logic";
import { useCartStore } from "../hooks/useCartStore";

interface HeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export default function Header({
  searchQuery,
  onSearch,
}: HeaderProps) {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);
  const cartCount = useCartStore((s) => countCartItems(s.lines));
  const totalPrice = useCartStore((s) => totalCartPrice(s.lines));

  return (
    <header className="header" id="top">
      <div className="header__container">
        <Link
          to="/"
          className="header__logo"
          aria-label="مینا-فروشگاه همیشه سبز"
        >
          <span className="header__logo-mark">
            <svg aria-hidden="true">
              <use href="/sprite.svg#logo" />
            </svg>
          </span>
          <div className="header__brand">
            <strong>مینا</strong>
            <small>فروشگاه همیشه سبز</small>
          </div>
        </Link>

        <SearchBox query={searchQuery} onQuery={onSearch} />

        {/* Theme Toggle */}
        <button
          type="button"
          className="header__theme-toggle"
          onClick={toggle}
          aria-label={
            theme === "dark" ? "فعال کردن تم روشن" : "فعال کردن تم تاریک"
          }
          title={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
        >
          {theme === "dark" ? (
            <svg aria-hidden="true">
              <use href="/sprite.svg#sun" />
            </svg>
          ) : (
            <svg aria-hidden="true">
              <use href="/sprite.svg#moon" />
            </svg>
          )}
        </button>

        <Link
          to="/cart"
          className="header__cart"
          aria-label="باز کردن سبد خرید"
        >
          <span className="header__cart-icon">
            <svg aria-hidden="true">
              <use href="/sprite.svg#basket" />
            </svg>
            <span className="header__cart-count">
              {cartCount.toLocaleString("fa-IR")}
            </span>
          </span>
          <span className="header__cart-content">
            <small>سبد خرید</small>
            <strong>{totalPrice.toLocaleString("fa-IR")} تومان</strong>
          </span>
        </Link>
      </div>
    </header>
  );
}
