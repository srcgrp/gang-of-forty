import type { Category, Shop } from "../types";

interface MainNavProps {
  shop: Shop;
  categories: Category[];
}

const DEFAULT_LINKS = [
  { label: "خانه", href: "#main" },
  { label: "دسته‌بندی‌ها", href: "#categories" },
  { label: "پیشنهاد ویژه", href: "#special" },
  { label: "تمام محصولات", href: "#all-products" },
  { label: "تماس", href: "#contact" },
];

export function MainNav({ shop, categories }: MainNavProps) {
  const links = shop.menu && shop.menu.length > 0 ? shop.menu : DEFAULT_LINKS;

  return (
    <>
      <input
        type="checkbox"
        id="menu-toggle"
        className="menu-toggle-input"
        aria-hidden="true"
        tabIndex={-1}
      />
      <nav className="main-nav" aria-label="منوی اصلی">
        <div className="nav__wrapper">
          <label
            htmlFor="menu-toggle"
            className="menu-toggle"
            aria-label="باز و بسته کردن منو"
          >
            <span></span>
            <span></span>
            <span></span>
          </label>

          <div className="mega">
            <button
              type="button"
              className="mega__trigger"
              aria-haspopup="true"
            >
              <span className="mega__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  focusable="false"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>همه دسته‌ها</span>
            </button>
            <div className="mega__menu" role="menu" aria-label="دسته‌بندی‌ها">
              <ul className="mega__list">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <a href={`#cat-${cat.id}`} role="menuitem">
                      <span aria-hidden="true">{cat.emoji || "📦"}</span>
                      {" " + cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="nav__links">
            {links.map((item, i) => (
              <li key={i}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
