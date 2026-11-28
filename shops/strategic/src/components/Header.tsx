import { Link } from '@tanstack/react-router';
import type { ShopData } from '../types';
import CardQuantityControls from './CardQuantityControls';
import CartMenu from './CartMenu';
import { stripEmoji } from './shop-content';
import { useEffect } from 'react';
import { useCartStore } from '../hooks/useCartStore';
import { cartCount } from '../features/cart/cart';
import CartPanel from './CartPanel';
import type { CategoryListProps } from './CategoryLink';
import Brand from './Brand';
import MainNav from './MainNav';
import SearchBox from './SearchBox';
import ThemeToggle from './ThemeToggle';

type HeaderProps = CategoryListProps & {
  productCount: number;
  query: string;
  onSearch: (text: string) => void;
  shop: ShopData;
  onHome: boolean;
};

export default function Header({ categories, categoryId, productCount, query, onSearch, shop, onHome }: HeaderProps) {
  const count = useCartStore((state) => cartCount(state.lines));
  useEffect(() => { document.title = `سوپرمارکت آرمین · ${count.toLocaleString('fa-IR')} 🛒`; }, [count]);
  return (
    <>
      <Link className="skip" to="." hash="main" search={true}>پرش به محتوای اصلی</Link>
      <section className="header-banner" id="notice" aria-label="اطلاعیه">
        <svg className="icon icon--mirror" aria-hidden="true" focusable="false"><use href="#i-truck" /></svg>
        <span>{stripEmoji(shop.notice)}</span>
      </section>
      <header className="site-header">
        <div className="bar">
          <Brand />
          <SearchBox productCount={productCount} query={query} onSearch={onSearch} />
          <CartMenu key={`${categoryId}:${query}:${onHome}`} count={count}><CartPanel /></CartMenu>
          <ThemeToggle />
          <MainNav menu={shop.menu} categories={categories} categoryId={categoryId} />
        </div>
      </header>
      <CardQuantityControls />
    </>
  );
}