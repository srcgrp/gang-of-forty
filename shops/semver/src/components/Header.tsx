import CategoryNav from './CategoryNav';
import CartPanel from './CartPanel';
import type { CartLine, Category, Product } from '../types';
import { formatCount } from '../ui/format';

type HeaderProps = {
  cartCount: number;
  cartOpen: boolean;
  onCartClick: () => void;
  cart: CartLine[];
  products: Product[];
  cartTotal: number;
  onCartRemove: (productId: number) => void;
  categories: Category[];
  activeCategoryId: number | null;
  onCategoryPick: (categoryId: number | null) => void;
};

export default function Header({
  cartCount,
  cartOpen,
  onCartClick,
  cart,
  products,
  cartTotal,
  onCartRemove,
  categories,
  activeCategoryId,
  onCategoryPick,
}: HeaderProps) {
  return (
    <header>
      <article>
        <section id="news-section">
          <p id="news">
            <span id="highlight">ارسال رایگان </span>با خرید بالای 500 هزارتومان
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
              <p id="tagline">دقیـق مثـل مترونـوم</p>
            </section>
          </div>
          <input
            id="search-input"
            type="search"
            aria-label="جستجوی محصولات"
            placeholder="جستجـو کنیـد ..."
          />
          <div id="user-actions">
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
                onClick={onCartClick}
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
                cart={cart}
                products={products}
                total={cartTotal}
                onRemove={onCartRemove}
              />
            </div>
          </div>
        </section>
      </nav>
      <CategoryNav
        categories={categories}
        activeCategoryId={activeCategoryId}
        onPick={onCategoryPick}
      />
      <section className="hero-container">
        <div id="hero-right">
          <div id="hero-title1">
            <h1 id="hero-h1"></h1>
            <p id="hero-p"></p>
            <a href="#" id="cta">
              <span id="cta-label"></span>
              <i className="ph ph-arrow-left ph-lg"></i>
            </a>
          </div>
        </div>
      </section>
    </header>
  );
}
