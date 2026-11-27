import type { Categories } from "../types";

interface CategoryNavProps {
  categories: Categories;
  selectedCategoryId: number | null;
  onPick: (categoryId: number | null) => void;
}

export default function CategoryNav({ categories, selectedCategoryId, onPick }: CategoryNavProps) {
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
              <a href="#categories" className={`nav-link${selectedCategoryId === null ? " is-active" : ""}`} onClick={() => onPick(null)}>
                <svg className="icon" aria-hidden="true"><use href="/sprite.svg#dropDown" /></svg>
                همه دسته‌ها
              </a>
              <ul className="dropdown">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a className="dropdown-item" href={`#${category.slug}`} onClick={() => onPick(category.id)}>
                      <span className="emoji">{category.emoji}</span>{category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  className={`nav-link${selectedCategoryId === category.id ? " is-active" : ""}`}
                  href={`#${category.slug}`}
                  onClick={() => onPick(category.id)}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
