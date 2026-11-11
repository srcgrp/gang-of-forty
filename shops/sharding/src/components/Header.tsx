import Topbar from './Topbar'
import SearchBox from './SearchBox'
import ThemeSwitch from './ThemeSwitch'
import HeaderNav from './HeaderNav'
import ShopIdentity from './ShopIdentity'
import type { AppState, Theme } from '../shared/types'

type HeaderProps = {
  data: AppState
  cartCount: number
  theme: Theme
  loading: boolean
  onTheme: (next: Theme) => void
  cartPanel: [boolean, (open: boolean) => void]
  mobileMenu: [boolean, (open: boolean) => void]
  activeCategoryId: number | null
  query: string
  onQuery: (next: string) => void
  onAddToCart: (id: number) => void
  onRemoveFromCart: (id: number) => void
}

export default function Header({
  data, cartCount, theme, loading, onTheme, cartPanel, mobileMenu,
  activeCategoryId, query, onQuery, onAddToCart, onRemoveFromCart
}: HeaderProps) {
  const [cartOpen, setCartOpen] = cartPanel
  const [menuOpen, setMenuOpen] = mobileMenu
  return (
    <>
      <Topbar notice={data.shop?.notice ?? ''} />
      <header className="header">
        <div className="container header__inner">
          <button type="button" className="icon-btn header__menu-btn" onClick={() => setMenuOpen(true)} aria-label="باز کردن منو" aria-expanded={menuOpen} aria-controls="mobile-menu">
            <svg className="icon-btn__icon" aria-hidden="true"><use href="./icons.svg#menu" /></svg>
          </button>

          <ShopIdentity name={data.shop?.name ?? 'فروشگاه'} slogan={data.shop?.slogan ?? ''} loading={loading} />

          <SearchBox
            data={data}
            activeCategoryId={activeCategoryId}
            query={query}
            onQuery={onQuery}
            onAdd={onAddToCart}
            onRemove={onRemoveFromCart}
          />

          <div className="header__actions">
            <button type="button" className="action action--cart" onClick={() => setCartOpen(true)} aria-label="سبد خرید" aria-expanded={cartOpen} aria-controls="cart-panel">
              <svg className="action__icon" aria-hidden="true"><use href="./icons.svg#cart" /></svg>
              <span className="action__label">سبد خرید</span>
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>

          <ThemeSwitch value={theme} onChange={onTheme} />
        </div>

        <HeaderNav categories={data.categories} products={data.products} />
      </header>
    </>
  )
}
