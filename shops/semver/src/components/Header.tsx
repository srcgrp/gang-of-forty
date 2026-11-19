import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import logo from '../../image/pomegranate-logo-02.svg';
import CategoryNav from './CategoryNav';
import CartPanel from './CartPanel';
import SearchBox from './SearchBox';
import ThemeToggle from './ThemeToggle';
import type { Category, Product, ProductLoadState, Shop } from '../types';
import { countCartItems } from '../cart/cart';
import { useCartStore } from '../hooks/useCartStore';
import { SHOP_PROFILE } from '../shop-profile';
import { formatCount } from '../utils/format';

type HeaderProps = {
  products: Product[];
  categories: Category[];
  activeCategoryId: number | null;
  onCategoryPick: (categoryId: number | null) => void;
  shop: Shop | null;
  query: string;
  onQueryChange: (query: string) => void;
  searchState: ProductLoadState;
  onRetry: () => void;
};

export default function Header({
  products,
  categories,
  activeCategoryId,
  onCategoryPick,
  shop,
  query,
  onQueryChange,
  searchState,
  onRetry,
}: HeaderProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useCartStore((state) => countCartItems(state.lines));
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const root = document.documentElement;
    const updateHeight = () => root.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty('--site-header-height');
    };
  }, []);

  useEffect(() => {
    document.title = `${SHOP_PROFILE.name} | 🛒 ${formatCount(cartCount)}`;
  }, [cartCount]);

  return (
    <header className="site-header" ref={headerRef}>
      <article>
        <section id="news-section">
          <p id="news">
            {shop?.notice ?? (
              <>
                <span id="highlight">ارسال رایگان </span>
                با خرید بالای 500 هزارتومان
              </>
            )}
          </p>
          <i className="ph ph-package"></i>
        </section>
      </article>
      <nav>
        <section id="nav-section">
          <div id="site-brand">
            <img
              id="logo"
              src={logo}
              alt={`لوگوی ${SHOP_PROFILE.name}`}
            />
            <section id="site-name">
              <p id="title">{SHOP_PROFILE.name}</p>
              <p id="tagline">{shop?.slogan ?? "تازه، نزدیک، به‌صرفه"}</p>
            </section>
          </div>
          <SearchBox
            query={query}
            onQueryChange={onQueryChange}
            state={searchState}
            onRetry={onRetry}
          />
          <div id="user-actions">
            <ThemeToggle />
            <i className="ph ph-bell"></i>
            <div id="cart-action">
              <button
                id="shopping-cart-button"
                type="button"
                aria-label={
                  cartCount === 0
                    ? 'مشاهده سبد خرید'
                    : `سبد خرید، ${formatCount(cartCount)} کالا`
                }
                aria-controls="cart-panel"
                aria-expanded={cartOpen}
                onClick={() => setCartOpen((open) => !open)}
              >
                سبد خرید
                <span
                  id="cart-count"
                  className="cart-count"
                  hidden={cartCount === 0}
                >
                  {formatCount(cartCount)}
                </span>
                <i className="ph ph-shopping-cart-simple"></i>
              </button>
              <CartPanel
                open={cartOpen}
                products={products}
                onCheckout={() => setCartOpen(false)}
              />
            </div>
          </div>
        </section>
      </nav>
      <CategoryNav
        categories={categories}
        activeCategoryId={activeCategoryId}
        onPick={onCategoryPick}
        menu={shop?.menu ?? []}
      />
    </header>
  );
}
