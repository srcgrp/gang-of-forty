import type { MouseEvent } from 'react';
import type { Category } from '../types';
import AnnouncementBar from './Announcementbar';
import CategoryNav from './Categorynav';
import Header from './Header';

type TopBarProps = {
  onCartClick: () => void;
  categories: Category[];
  menuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
};

// With hash routing a plain "#main-content" link would change the route.
const skipToMain = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById('main-content')?.focus();
};

export default function TopBar({ onCartClick, categories, menuOpen, onToggleMenu }: TopBarProps) {
  return (
    <>
      <a href="#/" className="skip-link" onClick={skipToMain}>پرش به محتوای اصلی</a>
      <AnnouncementBar />
      <div className="sticky-header">
        <Header onCartClick={onCartClick} />
        <CategoryNav categories={categories} open={menuOpen} onToggle={onToggleMenu} />
      </div>
    </>
  );
}
