import Topbar from './Topbar'
import SearchBox from './SearchBox'
import ThemeSwitch from './ThemeSwitch'
import HeaderNav from './HeaderNav'
import ShopIdentity from './ShopIdentity'
import type { Theme, Product, Category, Cart } from '../shared/types'

type HeaderProps = {
  shopName: string
  slogan: string
  notice: string
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
  shopName, slogan, notice, cartCount, theme, loading, onTheme, onOpenCart, onOpenMenu,
  products, categories, cart, query, onQuery, onAddToCart, onRemoveFromCart
}: HeaderProps) {
  return (
    <>
      <Topbar notice={notice} />
      <header className="header">
        <div className="container header__inner">
          <button type="button" className="icon-btn header__menu-btn" onClick={onOpenMenu} aria-label="باز کردن منو">
            <svg className="icon-btn__icon" aria-hidden="true"><use href="./icons.svg#menu" /></svg>
          </button>

          <ShopIdentity name={shopName} slogan={slogan} loading={loading} />

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

        <HeaderNav categories={categories} products={products} />
      </header>
    </>
  )
}