import type { Category, Product, Shop } from "../types";
import { SearchBox } from "./SearchBox";
import { TopBar } from "./TopBar";
import { MainNav } from "./MainNav";
import { ThemeIcon } from "./ThemeIcon";
import { Logo } from "./Logo";
import { useTheme } from "../hooks/useTheme";

interface SiteHeaderProps {
  shop: Shop;
  categories: Category[];
  cartCount: number;
  wishlistCount: number;
  onOpenWishlist: () => void;
  query: string;
  onQuery: (q: string) => void;
  suggestions: Product[];
  onPickProduct: (p: Product) => void;
  onOpenCart: () => void;
}

export function SiteHeader({
  shop,
  categories,
  cartCount,
  wishlistCount,
  onOpenWishlist,
  query,
  onQuery,
  suggestions,
  onPickProduct,
  onOpenCart,
}: SiteHeaderProps) {
  const { mode, toggle } = useTheme();

  return (
    <>
      <TopBar notice={shop.notice} />
      <header className="site-header">
        <div className="header__wrapper">
          <a href="#main" className="brand" aria-label="صفحه اصلی">
            <span className="brand__icon" aria-hidden="true">
              <Logo size={46} />
            </span>
            <span className="brand__name">
              <strong>{shop.name || "سبزکاله"}</strong>
              <small>{shop.slogan || "تازه، روز، به‌روز"}</small>
            </span>
          </a>

          <SearchBox
            query={query}
            onQuery={onQuery}
            suggestions={suggestions}
            onPickProduct={onPickProduct}
          />

          <div className="header__actions">
            <button
              type="button"
              className="theme-btn"
              onClick={toggle}
              aria-label="تغییر حالت روشن و تاریک"
              aria-pressed={mode === "dark"}
            >
              <span className="theme-btn__icon">
                <ThemeIcon dark={mode === "dark"} />
              </span>
            </button>

            <button
              type="button"
              className="action-btn action-btn--wishlist"
              onClick={onOpenWishlist}
              aria-label="علاقه‌مندی‌ها"
            >
              <span className="action-btn__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </span>
              {wishlistCount > 0 && (
                <span className="action-btn__badge">
                  {wishlistCount.toLocaleString("fa-IR")}
                </span>
              )}
              <span className="action-btn__text">
                <small>علاقه‌مندی</small>
              </span>
            </button>

            <span className="header__divider" aria-hidden="true"></span>

            <button
              type="button"
              className="action-btn action-btn--cart"
              aria-label="سبد خرید"
              onClick={onOpenCart}
            >
              <span className="action-btn__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  focusable="false"
                >
                  <path
                    d="M6 6h15l-2 9H8L6 6zm0 0L5 3H2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                  <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                </svg>
              </span>
              {cartCount > 0 && (
                <span className="action-btn__badge">
                  {cartCount.toLocaleString("fa-IR")}
                </span>
              )}
              <span className="action-btn__text">
                <small>سبد خرید</small>
              </span>
            </button>
          </div>
        </div>
      </header>

      <MainNav shop={shop} categories={categories} />
    </>
  );
}
