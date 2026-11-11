import Topbar from './Topbar'
import SearchBox from './SearchBox'
import ThemeSwitch from './ThemeSwitch'
import MegaMenu from './MegaMenu'
import type { Theme, Product, Category, Cart } from '../shared/types'

type HeaderProps = {
  shopName: string
  cartCount: number
  theme: Theme
  loading: boolean
  onTheme: (next: Theme) => void
  onOpenCart: () => void
  onOpenMenu: () => void
  products: Product[]
  categories: Category[]
  cart: Cart
  query: string
  onQuery: (next: string) => void
  onAddToCart: (id: number) => void
  onRemoveFromCart: (id: number) => void
}

export default function Header({
  shopName, cartCount, theme, loading, onTheme, onOpenCart, onOpenMenu,
  products, categories, cart, query, onQuery, onAddToCart, onRemoveFromCart
}: HeaderProps) {
  return (
    <>
      <Topbar />
      <header className="header">
        <div className="container header__inner">
          <button type="button" className="icon-btn header__menu-btn" onClick={onOpenMenu} aria-label="باز کردن منو">
            <svg className="icon-btn__icon" aria-hidden="true"><use href="./icons.svg#menu" /></svg>
          </button>

          <a href="#" className="identity" aria-label="بازگشت به بالای صفحه">
            <span className="identity__logo" aria-hidden="true">
              <img className="logo-img" src="./assets/images/logo/kiwi-fruit.svg" alt="" width="48" height="48" />
            </span>
            <span className="identity__text">
              <span className={`identity__name ${loading ? 'skeleton skeleton--brand' : ''}`}>
                {loading ? ' ' : shopName}
              </span>
              <span className={`identity__tagline ${loading ? 'skeleton skeleton--tagline' : ''}`}>
                {loading ? ' ' : 'تازه، سریع، ارزان'}
              </span>
            </span>
          </a>

          <SearchBox
            products={products}
            cart={cart}
            query={query}
            onQuery={onQuery}
            onAdd={onAddToCart}
            onRemove={onRemoveFromCart}
          />

          <div className="header__actions">
            <button type="button" className="action action--cart" onClick={onOpenCart} aria-label="سبد خرید">
              <svg className="action__icon" aria-hidden="true"><use href="./icons.svg#cart" /></svg>
              <span className="action__label">سبد خرید</span>
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>

          <ThemeSwitch value={theme} onChange={onTheme} />
        </div>

        <nav className="header-nav" aria-label="ناوبری اصلی">
          <div className="container header-nav__inner">
            <MegaMenu categories={categories} products={products} />
            <ul className="nav" id="nav-list">
              <li><a href="#">خانه</a></li>
              <li><a href="#">پیشنهاد ویژه</a></li>
              <li><a href="#">تازه‌ها</a></li>
              <li><a href="#">تماس با ما</a></li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}