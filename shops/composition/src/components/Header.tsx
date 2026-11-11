import type { ReactNode } from "react";
import { formatNumber } from "../shared/format";
import type { Category, Shop } from "../shared/types";
import Brand from "./Brand";
import cartIcon from "../../icons/shopping-cart.svg";
import ThemeToggle from "./ThemeToggle";
import menuIcon from "../../icons/menu-2.svg";

type Props = { dark: boolean; onToggleTheme: () => void; shop: Shop; categories: Category[]; count: number; cartOpen: boolean; onCartOpen: (open: boolean) => void; children: ReactNode; onPick: (id: number | null) => void };
export default function Header({ shop, categories, count, onPick, cartOpen, onCartOpen, dark, onToggleTheme, children }: Props) {
  return (
    <>
      <div id="notice" className="announcement">{shop.notice}</div>
      <header className="site-header">
        <div className="header-top wrap">
          <Brand />
          <div className="search-box">
            <label htmlFor="product-search">جست‌وجوی محصولات</label>
            <input id="product-search" type="search" placeholder="دنبال چی می‌گردی؟" disabled />
          </div>
          <div className="cart-menu" onMouseEnter={() => onCartOpen(true)}
            onMouseLeave={() => onCartOpen(false)}
            onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) onCartOpen(false); }}
            onKeyDown={event => {
              if (event.key === "Escape") {
                onCartOpen(false);
                event.currentTarget.querySelector("button")?.focus();
              }
            }}>
          <button className="cart-button" type="button" onClick={() => onCartOpen(!cartOpen)}
            aria-controls="cart" aria-expanded={cartOpen} aria-label={"سبد خرید، " + formatNumber(count) + " کالا"}>
            <img src={cartIcon} alt="" width="48" height="48" />
            <span>سبد خرید</span><b id="cart-count" aria-live="polite">{formatNumber(count)}</b>
          </button>
          {children}
          </div>
          <ThemeToggle dark={dark} onToggle={onToggleTheme} />
          <details className="mobile-menu">
            <summary aria-label="باز و بسته کردن منوی اصلی">
              <img src={menuIcon} alt="" width="48" height="48" />
            </summary>
            <nav id="mobile-links" aria-label="منوی موبایل">
              {shop.menu.map(link => <a key={link.href} href={link.href} onClick={() => onPick(null)}>{link.label}</a>)}
            </nav>
          </details>
        </div>
        <nav className="desktop-nav wrap" aria-label="منوی اصلی">
          <div className="category-menu">
            <button className="category-trigger" type="button">☰ همهٔ دسته‌ها</button>
            <div id="category-links" className="category-links">
              {categories.map(category => (
                <a key={category.id} href={"#" + category.slug} onClick={() => onPick(category.id)}>{category.name}</a>
              ))}
            </div>
          </div>
          <div id="main-links" className="main-links">
            {shop.menu.map(link => <a key={link.href} href={link.href} onClick={() => onPick(null)}>{link.label}</a>)}
          </div>
        </nav>
      </header>
    </>
  );
}
