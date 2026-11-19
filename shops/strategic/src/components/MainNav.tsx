import { useRef, useState } from 'react';
import type { ShopMenuItem } from '../types';
import { Link } from '@tanstack/react-router';
import StoreLink from './StoreLink';
import { stripEmoji } from './shop-content';
import type { CategoryListProps } from './CategoryLink';
import CategoryNav from './CategoryNav';

export default function MainNav({ categories, categoryId, menu }: CategoryListProps & { menu: readonly ShopMenuItem[] }) {
  const toggle = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const [dismissed, setDismissed] = useState(false);
  function close(restoreFocus = false) {
    const mobileOpen = toggle.current?.checked;
    if (toggle.current) toggle.current.checked = false;
    if (restoreFocus) {
      if (mobileOpen) toggle.current?.focus();
      else trigger.current?.focus();
    }
    setDismissed(true);
  }
  return (
    <>
        <input ref={toggle} className="sr-only menu-toggle" type="checkbox" id="menu-toggle" aria-controls="primary-nav" />
        <label className="burger" htmlFor="menu-toggle">
          <span className="sr-only">باز و بسته کردن منوی اصلی</span>
          <span className="bars" />
        </label>
        <label className="scrim" htmlFor="menu-toggle" aria-hidden="true" />
        <nav onClick={(event) => { if (event.target instanceof Element && event.target.closest('a')) close(Boolean(event.target.closest('.mega-panel'))); }} onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); close(true); } }} className="main-nav" id="primary-nav" aria-label="منوی اصلی">
          <ul id="nav-list">
            <li className="mega" data-dismissed={dismissed || undefined}
              onMouseEnter={() => setDismissed(false)}
              onFocus={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setDismissed(false);
              }}>
              <Link ref={trigger} activeOptions={{ exact: true, includeHash: true }} to="/" hash="categories" search={{}}>
                <svg className="icon" aria-hidden="true" focusable="false"><use href="#i-menu" /></svg>
                {" همه دسته‌ها"}
              </Link>
              <CategoryNav menu categories={categories} categoryId={categoryId} />
            </li>
            {menu.map(item => <li key={item.label}><StoreLink list href={item.href}>{stripEmoji(item.label)}</StoreLink></li>)}
          </ul>
        </nav>
    </>
  );
}
