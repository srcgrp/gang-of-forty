import { useEffect } from 'react'
import { cartCount } from '../features/cart/logic/cart'
import { useCartStore } from '../hooks/useCartStore'
import Topbar from './Topbar'
import SearchBox from './SearchBox'
import ThemeToggle from './ThemeToggle'
import HeaderNav from './HeaderNav'
import ShopIdentity from './ShopIdentity'
import type { AppState } from '../shared/types'

type HeaderProps = {
  data: AppState
  loading: boolean
  cartPanel: [boolean, (open: boolean) => void]
  mobileMenu: [boolean, (open: boolean) => void]
  activeCategoryId: number | null
  query: string
  onQuery: (next: string) => void
}

export default function Header({
  data, loading, cartPanel, mobileMenu, activeCategoryId, query, onQuery
}: HeaderProps) {
  const [cartOpen, setCartOpen] = cartPanel
  const [menuOpen, setMenuOpen] = mobileMenu
  const count = useCartStore((state) => cartCount(state.lines))
  const name = data.shop?.name ?? 'فروشگاه'

  useEffect(() => {
    document.title = count > 0 ? `${name} · ${count.toLocaleString('fa-IR')} 🛒` : name
  }, [name, count])

  return (
    <>
      <Topbar notice={data.shop?.notice ?? ''} />
      <header className="header">
        <div className="container header__inner">
          <button type="button" className="icon-btn header__menu-btn" onClick={() => setMenuOpen(true)} aria-label="باز کردن منو" aria-expanded={menuOpen} aria-controls="mobile-menu">
            <svg className="icon-btn__icon" aria-hidden="true"><use href="./icons.svg#menu" /></svg>
          </button>

          <ShopIdentity name={name} slogan={data.shop?.slogan ?? ''} loading={loading} />

          <SearchBox
            data={data}
            activeCategoryId={activeCategoryId}
            query={query}
            onQuery={onQuery}
          />

          <div className="header__actions">
            <button type="button" className="action action--cart" onClick={() => setCartOpen(!cartOpen)} aria-label="سبد خرید" aria-expanded={cartOpen} aria-controls="cart-panel">
              <svg className="action__icon" aria-hidden="true"><use href="./icons.svg#cart" /></svg>
              <span className="action__label">سبد خرید</span>
              {count > 0 && <span className="badge">{count.toLocaleString('fa-IR')}</span>}
            </button>
          </div>

          <ThemeToggle />
        </div>

        <HeaderNav categories={data.categories} products={data.products} />
      </header>
    </>
  )
}
