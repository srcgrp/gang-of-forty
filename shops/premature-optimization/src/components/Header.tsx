import CartPanel from "./CartPanel.tsx";
import SearchBox from "./Search.tsx";
import { CATEGORIES, SHOP } from "./sampleData.ts";

export default function Header() {
  return (
    <header id="page-header">
      <div className="announcement">
        <span className="announcement-icon"></span>
        <p id="shop-notice">{SHOP.notice}</p>
      </div>
      <div className="header-part">
        <a className="brand brand-link" href="#top">
          <svg className="logo" focusable="false">
            <use href="./svgs/logo.svg" />
          </svg>
          <div className="page-brand">
            <h1 className="page-title" id="shop-name">
              {SHOP.name}
            </h1>
            <span className="page-description" id="shop-slogan">
              {SHOP.slogan}
            </span>
          </div>
        </a>
        <SearchBox />
        <CartPanel />
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
            {CATEGORIES.map((c) => (
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
          {SHOP.menu.map((item) => (
            <a key={item.href} className="menu-texts" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
