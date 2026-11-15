import SearchBox from "./SearchBox";
import { useThemeStore } from "../hooks/useThemeStore";

interface HeaderProps {
  cartCount: number;
  totalPrice: number;
  searchQuery: string;
  onOpenCart: () => void;
  onSearch: (query: string) => void;
}

export default function Header({
  cartCount,
  totalPrice,
  searchQuery,
  onOpenCart,
  onSearch,
}: HeaderProps) {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <header className="header" id="top">
      <div className="header__container">
        <a
          href="#top"
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
        </a>

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

        <button
          type="button"
          className="header__cart"
          onClick={onOpenCart}
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
        </button>
      </div>
    </header>
  );
}
