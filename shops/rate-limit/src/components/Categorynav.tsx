import type { Category } from '../types';

type CategoryNavProps = {
  categories: Category[];
  open: boolean;
  onToggle: (open: boolean) => void;
  onSelect: (categoryId: string) => void;
};

export default function CategoryNav({ categories, open, onToggle, onSelect }: CategoryNavProps) {
  return (
    <div className="nav-area">
      <input
        type="checkbox"
        className="category-toggle"
        id="category-toggle"
        checked={open}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <nav>
        <ul>
          <li className="category-item">
            <label className="category-button" htmlFor="category-toggle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span>دسته بندی ها</span>
            </label>
          </li>
          <li id="special-offer-button">
            <a href="#special-offers">پیشنهادات ویژه 🔥</a>
          </li>
          <li><a href="#fruits">میوه و سبزی</a></li>
          <li><a href="#dairy">لبنیات</a></li>
          <li><a href="#bakery">نان تازه</a></li>
          <li><a href="#contact">تماس با ما</a></li>
        </ul>
      </nav>
      <label className="menu-close-overlay" htmlFor="category-toggle" aria-hidden="true" />
      <div className="category-dropdown">
        {categories.map((c) => (
          <a key={c.id} href={`#${c.slug}`} onClick={() => onSelect(c.id)}>
            {c.name}
          </a>
        ))}
      </div>
    </div>
  );
}