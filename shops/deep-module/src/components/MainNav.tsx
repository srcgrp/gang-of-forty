import type { Category, Shop } from "../types";

interface MainNavProps {
  shop: Shop;
  categories: Category[];
}

export function MainNav({ shop, categories }: MainNavProps) {
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
            <span></span><span></span><span></span>
          </label>

          <div className="mega">
            <button
              type="button"
              className="mega__trigger"
              aria-haspopup="true"
            >
              <span className="mega__icon" aria-hidden="true">☰</span>
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
            {(shop.menu || []).map((item, i) => (
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