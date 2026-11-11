import Topbar from './Topbar'
import SearchBox from './SearchBox'
import ThemeSwitch from './ThemeSwitch'
import MegaMenu from './MegaMenu'
import type { Theme, Product, Category } from '../shared/types'

type HeaderProps = {
  shopName: string
  cartCount: number
  theme: Theme
  onTheme: (next: Theme) => void
  onOpenCart: () => void
  onOpenMenu: () => void
  products: Product[]
  categories: Category[]
  query: string
  onQuery: (next: string) => void
  onAddToCart: (id: number) => void
}

export default function Header({
  shopName,
  cartCount,
  theme,
  onTheme,
  onOpenCart,
  onOpenMenu,
  products,
  categories,
  query,
  onQuery,
  onAddToCart,
}: HeaderProps) {
  return (
    <>
      <Topbar />
      <header className="header">
        <div className="container header__inner">
          <button
            type="button"
            className="icon-btn header__menu-btn"
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="باز کردن منو"
            onClick={onOpenMenu}
          >
            <svg className="icon-btn__icon" aria-hidden="true">
              <use href="./icons.svg#menu" />
            </svg>
          </button>

          <a href="#" className="identity" aria-label="بازگشت به بالای صفحه">
            <span className="identity__logo" aria-hidden="true">
              <img className="logo-img" src="./assets/images/logo/kiwi-fruit.svg" alt="" width="48" height="48" />
            </span>
            <span className="identity__text">
              <span className="identity__name">{shopName}</span>
              <span className="identity__tagline">تازه، سریع، ارزان</span>
            </span>
          </a>

          <SearchBox
            products={products}
            query={query}
            onQuery={onQuery}
            onAdd={onAddToCart}
          />

          <div className="header__actions">
            <a href="#" className="action action--location" aria-label="موقعیت مکانی">
              <svg className="action__icon" aria-hidden="true">
                <use href="./icons.svg#location" />
              </svg>
              <span className="action__label">موقعیت</span>
            </a>
            <a href="#" className="action action--account" aria-label="حساب کاربری">
              <svg className="action__icon" aria-hidden="true">
                <use href="./icons.svg#account" />
              </svg>
              <span className="action__label">حساب من</span>
            </a>
            <button
              type="button"
              className="action action--cart"
              onClick={onOpenCart}
              aria-label="سبد خرید"
            >
              <svg className="action__icon" aria-hidden="true">
                <use href="./icons.svg#cart" />
              </svg>
              <span className="action__label">سبد خرید</span>
              {cartCount > 0 && (
                <span className="badge" aria-label={`${cartCount} کالا در سبد`}>
                  {cartCount}
                </span>
              )}
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