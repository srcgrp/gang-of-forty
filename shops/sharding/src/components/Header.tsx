import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import Topbar from './Topbar'
import SearchBox from './SearchBox'
import ThemeToggle from './ThemeToggle'
import HeaderNav from './HeaderNav'
import ShopIdentity from './ShopIdentity'
import CartButton from './CartButton'
import CartPanel from './CartPanel'
import type { AppState } from '../shared/types'
import { Icon } from './Icon'

type HeaderProps = {
  data: AppState
  loading: boolean
  mobileMenu: [boolean, (open: boolean) => void]
  activeCategoryId: number | null
  query: string
  onQuery: (next: string) => void
}

export default function Header({
  data, loading, mobileMenu, activeCategoryId, query, onQuery
}: HeaderProps) {
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = mobileMenu
  const name = data.shop?.name ?? 'فروشگاه'

  return (
    <>
      <Topbar notice={data.shop?.notice ?? ''} />
      <header className="header">
        <div className="container header__inner">
          <button type="button" className="icon-btn header__menu-btn" onClick={() => setMenuOpen(true)} aria-label="باز کردن منو" aria-expanded={menuOpen} aria-controls="mobile-menu">
            <Icon name="menu" className="icon-btn__icon" />
          </button>

          <ShopIdentity name={name} slogan={data.shop?.slogan ?? ''} loading={loading} />

          <SearchBox
            data={data}
            activeCategoryId={activeCategoryId}
            query={query}
            onQuery={onQuery}
          />

          <div className="header__actions">
            <CartButton shopName={name} open={cartOpen} onToggle={() => setCartOpen((open) => !open)} />
            <Link to="/checkout" className="action action--checkout" aria-label="تسویه‌حساب" onClick={() => setCartOpen(false)}>
              <Icon name="receipt" className="action__icon" />
              <span className="action__label">تسویه‌حساب</span>
            </Link>
          </div>

          <ThemeToggle />
        </div>

        <HeaderNav categories={data.categories} products={data.products} />
      </header>
      <CartPanel open={cartOpen} data={data} onClose={() => setCartOpen(false)} />
    </>
  )
}
