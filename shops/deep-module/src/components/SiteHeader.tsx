import type { Shop } from "../types";
import { SearchBox } from "./SearchBox";

interface SiteHeaderProps {
  shop: Shop;
  cartCount: number;
  query: string;
  onQuery: (q: string) => void;
}

export function SiteHeader({
  shop,
  cartCount,
  query,
  onQuery,
}: SiteHeaderProps) {
  return (
    <>
      <div className="topbar" role="region" aria-label="اطلاع‌رسانی">
        <div className="topbar__inner">
          <span>
            {shop.notice || "ارسال رایگان برای خرید بالای ۵۰۰ هزار تومان"}
          </span>
        </div>
      </div>
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
              </svg>
            </span>
            <span className="brand__name">
              <strong>{shop.name || "سبزکاله"}</strong>
              <small>{shop.slogan || "تازه، روز، به‌روز"}</small>
            </span>
          </a>

          <SearchBox query={query} onQuery={onQuery} />

          <div className="header__actions">
            <button type="button" className="theme-btn" aria-label="تغییر حالت">
              <span className="theme-btn__icon" aria-hidden="true">
                🌙
              </span>
            </button>
            <a href="#login" className="action-btn">
              <span className="action-btn__icon" aria-hidden="true">
                👤
              </span>
              <span className="action-btn__text">
                <small>ورود | ثبت‌نام</small>
              </span>
            </a>
            <span className="header__divider" aria-hidden="true"></span>
            <a
              href="#cart"
              className="action-btn action-btn--cart"
              aria-label="سبد خرید"
            >
              <span className="action-btn__icon" aria-hidden="true">
                🛒
              </span>
              <span className="action-btn__badge">
                {cartCount.toLocaleString("fa-IR")}
              </span>
              <span className="action-btn__text">
                <small>سبد خرید</small>
              </span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
