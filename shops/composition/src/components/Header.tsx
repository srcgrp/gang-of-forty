import type { Category, Shop } from "../shared/types";
import Brand from "./Brand";
import cartIcon from "../../icons/shopping-cart.svg";
import moonIcon from "../../icons/moon.svg";
import menuIcon from "../../icons/menu-2.svg";

type Props = { shop: Shop; categories: Category[] };
export default function Header({ shop, categories }: Props) {
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
          <button className="cart-button" type="button" aria-label="سبد خرید، صفر کالا" disabled>
            <img src={cartIcon} alt="" width="48" height="48" />
            <span>سبد خرید</span><b id="cart-count">۰</b>
          </button>
          <button className="theme-toggle" type="button" aria-label="فعال کردن تم تیره" disabled>
            <img src={moonIcon} alt="" width="24" height="24" />
          </button>
          <details className="mobile-menu">
            <summary aria-label="باز و بسته کردن منوی اصلی">
              <img src={menuIcon} alt="" width="48" height="48" />
            </summary>
            <nav id="mobile-links" aria-label="منوی موبایل">
              {shop.menu.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
            </nav>
          </details>
        </div>
        <nav className="desktop-nav wrap" aria-label="منوی اصلی">
          <div className="category-menu">
            <button className="category-trigger" type="button">☰ همهٔ دسته‌ها</button>
            <div id="category-links" className="category-links">
              {categories.map(category => (
                <a key={category.id} href={"#" + category.slug}>{category.name}</a>
              ))}
            </div>
          </div>
          <div id="main-links" className="main-links">
            {shop.menu.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
          </div>
        </nav>
      </header>
    </>
  );
}
