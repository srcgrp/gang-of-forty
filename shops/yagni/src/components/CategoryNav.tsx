import type { Categories } from "../types";

interface CategoryNavProps {
  categories: Categories;
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <nav className="navbar" aria-label="دسته‌بندی محصولات">
      <input type="checkbox" id="nav-toggle" className="nav-toggle" />
      <div className="navbar-inner">
        <label htmlFor="nav-toggle" className="burger-btn" aria-label="نمایش دسته‌بندی‌ها">
          <svg className="burger-icon burger-icon--open" aria-hidden="true"><use href="/sprite.svg#hamburger-menu" /></svg>
          <svg className="burger-icon burger-icon--close" aria-hidden="true"><use href="/sprite.svg#close" /></svg>
        </label>
        <div className="navbar-content">
          <ul className="nav-list">
            <li className="has-dropdown">
              <a href="#categories" className="nav-link is-active" aria-haspopup="true">
                <svg className="icon" aria-hidden="true"><use href="/sprite.svg#dropDown" /></svg>
                همه دسته‌ها
              </a>
              <ul className="dropdown">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a className="dropdown-item" href={`#${category.slug}`}>
                      <span className="emoji">{category.emoji}</span>
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <a className="nav-link" href={`#${category.slug}`}>{category.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
