import type { ShopMenuItem } from '../types';
import { safeHref, stripEmoji } from './shop-content';
import type { CategoryListProps } from './CategoryLink';
import CategoryNav from './CategoryNav';

export default function MainNav({ categories, categoryId, onPick, menu, onHome }: CategoryListProps & { menu: readonly ShopMenuItem[]; onHome: boolean }) {
  return (
    <>
        <input className="sr-only menu-toggle" type="checkbox" id="menu-toggle" aria-controls="primary-nav" />
        <label className="burger" htmlFor="menu-toggle">
          <span className="sr-only">باز و بسته کردن منوی اصلی</span>
          <span className="bars" />
        </label>
        <label className="scrim" htmlFor="menu-toggle" aria-hidden="true" />
        <nav className="main-nav" id="primary-nav" aria-label="منوی اصلی">
          <ul id="nav-list">
            <li className="mega">
              <a href={onHome ? '#categories' : './#categories'}>
                <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-menu" /></svg>
                {" همه دسته‌ها"}
              </a>
              <CategoryNav menu categories={categories} categoryId={categoryId} onPick={onPick} />
            </li>
            {menu.map(item => {
              const href = safeHref(item.href);
              const target = !onHome && href.startsWith('#') && href !== '#contact' ? './' + href : href;
              return <li key={item.label}><a href={target}>{stripEmoji(item.label)}</a></li>;
            })}
          </ul>
        </nav>
    </>
  );
}
