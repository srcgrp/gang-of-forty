import type { CartLine, Category, Shop } from "../../scripts/types";
import CartPanel from "../cart/CartPanel.tsx";
import { Search } from "../shared/Search.tsx";

type HeaderProps = {
  shop: Shop;
  categories: Category[];
  cartLines: CartLine[];
  count: number;
  total: number;
  productCount: number;
  query: string;
  onQuery: (query: string) => void;
  onRemove: (id: number) => void;
};

export default function Header({
  shop,
  categories,
  cartLines,
  count,
  total,
  productCount,
  query,
  onQuery,
  onRemove,
}: HeaderProps) {
  return (
    <header id="page-header">
      <div className="announcement">
        <span className="announcement-icon"></span>
        <p id="shop-notice">{shop.notice}</p>
      </div>
      <div className="header-part">
        <a className="brand brand-link" href="#top">
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
        </a>
        <Search total={productCount} query={query} onQuery={onQuery} />
        <CartPanel
          lines={cartLines}
          count={count}
          total={total}
          onRemove={onRemove}
        />
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
              <a
                key={c.id}
                className="hidden-content-links"
                href={`#${c.slug}`}
              >
                {c.emoji} {c.name}
              </a>
            ))}
          </div>
        </div>
        <div id="shop-menu-links" className="shop-menu-links">
          {shop.menu.map((item) => (
            <a key={item.href} className="menu-texts" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
