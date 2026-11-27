import SiteLink from "./SiteLink";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCartStore } from "../hooks/useCartStore";
import { cartCount } from "../features/cart/logic/items";
import CartPanel from "./CartPanel";
import { formatNumber } from "../shared/format";
import type { Category, Shop, CardView, Stock } from "../shared/types";
import Brand from "./Brand";
import SearchBox from "./SearchBox";
import cartIcon from "../../icons/shopping-cart.svg";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

type Props = { suggestions: CardView[]; query: string; onQuery: (query: string) => void; shop: Shop; categories: Category[]; stock: Stock };
export default function Header({ suggestions, query, onQuery, shop, categories, stock }: Props) {
  const count = useCartStore((state) => cartCount(state.lines));
  useEffect(() => { document.title = "بت‌شاپ · " + count.toLocaleString("fa-IR") + " 🛒"; }, [count]);
  const [cartOpen, onCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const changeCart = (open: boolean): void => { if (open) setSearchOpen(false); onCartOpen(open); };
  const changeSearch = (open: boolean): void => { if (open) onCartOpen(false); setSearchOpen(open); };
  return (
    <>
      <div id="notice" className="announcement">{shop.notice}</div>
      <header className="site-header">
        <div className="header-top wrap">
          <Brand />
          <SearchBox open={searchOpen} onOpenChange={changeSearch} cards={suggestions} query={query} onQuery={onQuery} />
          <div className="cart-menu" onMouseEnter={() => changeCart(true)}
            onMouseLeave={() => onCartOpen(false)}
            onBlur={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) onCartOpen(false); }}
            onKeyDown={event => {
              if (event.key !== "Escape") return;
              onCartOpen(false);
              event.currentTarget.querySelector("button")?.focus();
            }}>
          <button className="cart-button" type="button" onClick={() => changeCart(!cartOpen)}
            aria-controls="cart" aria-expanded={cartOpen} aria-label={"سبد خرید، " + formatNumber(count) + " کالا"}>
            <img src={cartIcon} alt="" width="48" height="48" />
            <span>سبد خرید</span><b id="cart-count" aria-live="polite">{formatNumber(count)}</b>
          </button>
          <CartPanel stock={stock} open={cartOpen} onClose={() => onCartOpen(false)} />
          </div>
          <Link className="checkout-link" to="/checkout">تسویه‌حساب</Link>
          <ThemeToggle />
          <MobileMenu menu={shop.menu} />
        </div>
        <nav className="desktop-nav wrap" aria-label="منوی اصلی">
          <div className="category-menu">
            <button className="category-trigger" type="button">☰ همهٔ دسته‌ها</button>
            <div id="category-links" className="category-links">
              {categories.map(category => (
                <SiteLink key={category.id} href={"#" + category.slug}>{category.name}</SiteLink>
              ))}
            </div>
          </div>
          <div id="main-links" className="main-links">
            {shop.menu.map(link => <SiteLink key={link.href} href={link.href}>{link.label}</SiteLink>)}
          </div>
        </nav>
      </header>
    </>
  );
}
