import type { Category } from '../types';
import AnnouncementBar from './Announcementbar';
import CategoryNav from './Categorynav';
import Header from './Header';

type TopBarProps = {
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
  const { onCartClick, query, onQuery } = props;
  const { categories, activeId, menuOpen, onToggleMenu, onPick } = props;

  return (
    <>
      <a href="#main-content" className="skip-link">پرش به محتوای اصلی</a>
      <AnnouncementBar />
      <div className="sticky-header">
        <Header
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