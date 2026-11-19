import { useEffect, useState } from 'react';
import CategoryNav from './CategoryNav';
import CartPanel from './CartPanel';
import SearchBox from './SearchBox';
import ThemeToggle from './ThemeToggle';
import type { Category, Home, Product, ProductLoadState, Shop } from '../types';
import { countCartItems } from '../cart/cart';
import { useCartStore } from '../hooks/useCartStore';
import { formatCount } from '../utils/format';

type HeaderProps = {
  products: Product[];
  categories: Category[];
  activeCategoryId: number | null;
  onCategoryPick: (categoryId: number | null) => void;
  shop: Shop | null;
  home: Home | null;
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
  home,
  query,
  onQueryChange,
  searchState,
  onRetry,
}: HeaderProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useCartStore((state) => countCartItems(state.lines));

  useEffect(() => {
    document.title = `سوپرمارکت ناردونه | 🛒 ${formatCount(cartCount)}`;
  }, [cartCount]);

  return (
    <header>
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
              src="./image/pomegranate-logo-02.svg"
              alt="لوگوی فروشگاه مترون"
            />
            <section id="site-name">
              <p id="title">سوپرمارکت ناردونه</p>
              <p id="tagline">{shop?.slogan ?? "دقیـق مثـل مترونـوم"}</p>
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
      <section className="hero-container">
        <div id="hero-right">
          <div id="hero-title1">
            <h1 id="hero-h1">{home?.hero.title}</h1>
            <p id="hero-p">{home?.hero.text}</p>
            <a href={home?.hero.cta.href ?? "#"} id="cta">
              <span id="cta-label">{home?.hero.cta.label}</span>
              <i className="ph ph-arrow-left ph-lg"></i>
            </a>
          </div>
        </div>
        
      </section>
    </header>
  );
}
