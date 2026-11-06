import type { Category, Product, Shop } from "../types";
import { SearchBox } from "./SearchBox";
import { TopBar } from "./TopBar";
import { MainNav } from "./MainNav";
import { ThemeIcon } from "./ThemeIcon";
import { useTheme } from "../hooks/useTheme";

interface SiteHeaderProps {
  shop: Shop;
  categories: Category[];
  cartCount: number;
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
              <svg viewBox="0 0 64 64" focusable="false">
                <circle cx="32" cy="32" r="30" fill="#d7ff00" />
                <path
                  d="M32 12 C 18 20, 14 36, 24 48 C 34 56, 46 50, 48 38 C 50 26, 44 16, 32 12 Z"
                  fill="#111318"
                />
                <circle cx="40" cy="20" r="3" fill="#fff" opacity="0.9" />
              </svg>
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

            <a href="#login" className="action-btn">
              <span className="action-btn__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  focusable="false"
                >
                  <path
                    d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 20c0-4 4-6 8-6s8 2 8 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="action-btn__text">
                <small>ورود | ثبت‌نام</small>
              </span>
            </a>

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
