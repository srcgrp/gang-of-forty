import type { ShopData } from '../types';
import CartMenu, { type CartMode } from './CartMenu';
import { stripEmoji } from './shop-content';
import type { ReactNode } from 'react';
import type { CategoryListProps } from './CategoryLink';
import Brand from './Brand';
import MainNav from './MainNav';
import SearchBox from './SearchBox';

type HeaderProps = CategoryListProps & {
  productCount: number;
  query: string;
  onSearch: (text: string) => void;
  cartCount: number;
  cartOpen: CartMode;
  shop: ShopData;
  onHome: boolean;
  onCartMode: (mode: CartMode) => void;
  cartPanel: ReactNode;
};

export default function Header({ categories, categoryId, onPick, productCount, query, onSearch, cartCount, cartOpen, onCartMode, cartPanel, shop, onHome }: HeaderProps) {
  return (
    <>
      <a className="skip" href="#main">پرش به محتوای اصلی</a>
      <section className="header-banner" id="notice" aria-label="اطلاعیه">
        <svg className="icon icon--mirror" aria-hidden="true" focusable="false"><use href="#i-truck" /></svg>
        <span>{stripEmoji(shop.notice)}</span>
      </section>
      <header className="site-header">
        <div className="bar">
          <Brand />
          <SearchBox productCount={productCount} query={query} onSearch={onSearch} />
          <CartMenu count={cartCount} mode={cartOpen} onMode={onCartMode}>{cartPanel}</CartMenu>
          <MainNav menu={shop.menu} onHome={onHome} categories={categories} categoryId={categoryId} onPick={onPick} />
        </div>
      </header>
    </>
  );
}