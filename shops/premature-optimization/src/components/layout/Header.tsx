import type { Category, Offer, Product, Shop } from "../../scripts/types";
import CartPanel from "../cart/CartPanel.tsx";
import { Search } from "../shared/Search.tsx";
import ThemeToggle from "./ThemeToggle.tsx";
import { Link } from "@tanstack/react-router";
import DataLink from "../shared/DataLink.tsx";
import PlpLink from "../shared/PlpLink.tsx";

type HeaderProps = {
  shop: Shop;
  categories: Category[];
  products: Product[];
  offers: Offer[];
};

export default function Header({
  shop,
  categories,
  products,
  offers,
}: HeaderProps) {
  return (
    <header id="page-header">
      <div className="announcement">
        <span className="announcement-icon"></span>
        <p id="shop-notice">{shop.notice}</p>
      </div>
      <div className="header-part">
        <Link className="brand brand-link" to="/">
          <svg className="logo" focusable="false">
            <use href="./svgs/logo.svg" />
          </svg>
          <div className="page-brand">
            <h1 className="page-title" id="shop-name">
              {shop.name}
            </h1>
            <span className="page-description" id="shop-slogan">
              {shop.slogan}
            </span>
          </div>
        </Link>
        <Search total={products.length} />
        <div className="left-header-part">
          <CartPanel products={products} offers={offers} />
          <ThemeToggle />
        </div>
      </div>
      <input
        className="mobile-menu-toggle"
        type="checkbox"
        id="mobile-menu-toggle"
      />
      <label className="mobile-menu-button" htmlFor="mobile-menu-toggle">
        <span>☰</span>
        <span>منو</span>
      </label>
      <nav className="navigation" id="main-navigation">
        <div className="menu-categories">
          <span className="menu-categories-span">☷ همه دسته‌ها</span>
          <div className="hidden-content" id="category-menu-links">
            {categories.map((c) => (
              <PlpLink
                key={c.id}
                carouselId={c.slug}
                className="hidden-content-links"
              >
                {c.emoji} {c.name}
              </PlpLink>
            ))}
          </div>
        </div>
        <div id="shop-menu-links" className="shop-menu-links">
          {shop.menu.map((item) => (
            <DataLink key={item.href} className="menu-texts" href={item.href}>
              {item.label}
            </DataLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
