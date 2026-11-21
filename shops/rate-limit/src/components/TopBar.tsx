import type { Category } from '../types';
import AnnouncementBar from './AnnouncementBar';
import CategoryNav from './CategoryNav';
import Header from './Header';

type TopBarProps = {
  count: number;
  darkMode: boolean;
  onToggleTheme: (checked: boolean) => void;
  onCartClick: () => void;
  categories: Category[];
  activeId: number | null;
  menuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
  onPick: (id: number | null) => void;
  query: string;
  onQuery: (query: string) => void;
};

export default function TopBar(props: TopBarProps) {
  const { count, darkMode, onToggleTheme, onCartClick, query, onQuery } = props;
  const { categories, activeId, menuOpen, onToggleMenu, onPick } = props;

  return (
    <>
      <a href="#main-content" className="skip-link">پرش به محتوای اصلی</a>
      <AnnouncementBar />
      <div className="sticky-header">
        <Header
          cartCount={count}
          darkMode={darkMode}
          onToggleTheme={onToggleTheme}
          onCartClick={onCartClick}
          query={query}
          onQuery={onQuery}
        />
        <CategoryNav
          categories={categories}
          activeId={activeId}
          open={menuOpen}
          onToggle={onToggleMenu}
          onPick={onPick}
        />
      </div>
    </>
  );
}