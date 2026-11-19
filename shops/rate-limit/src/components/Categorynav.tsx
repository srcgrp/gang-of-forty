import type { MouseEvent } from 'react';
import { Link } from '@tanstack/react-router';
import type { Category } from '../types';

type CategoryNavProps = {
  categories: Category[];
  open: boolean;
  onToggle: (open: boolean) => void;
};

// With hash routing a plain "#contact" link would change the route.
const toContact = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

export default function CategoryNav({ categories, open, onToggle }: CategoryNavProps) {
  const close = () => onToggle(false);

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
            <Link to="/plp/$carouselId" params={{ carouselId: 'offers' }}>پیشنهادات ویژه 🔥</Link>
          </li>
          <li><Link to="/plp/$carouselId" params={{ carouselId: 'fruits' }}>میوه و سبزی</Link></li>
          <li><Link to="/plp/$carouselId" params={{ carouselId: 'dairy' }}>لبنیات</Link></li>
          <li><Link to="/plp/$carouselId" params={{ carouselId: 'bakery' }}>نان تازه</Link></li>
          <li><a href="#/" onClick={toContact}>تماس با ما</a></li>
        </ul>
      </nav>
      <label className="menu-close-overlay" htmlFor="category-toggle" aria-hidden="true" />
      <div className="category-dropdown">
        <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: 'is-active' }} onClick={close}>
          همه محصولات
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            to="/plp/$carouselId"
            params={{ carouselId: c.slug }}
            activeProps={{ className: 'is-active' }}
            onClick={close}
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
