import { useState } from 'react'
import Topbar from './Topbar'
import SearchBox from './SearchBox'
import ThemeToggle from './ThemeToggle'
import HeaderNav from './HeaderNav'
import ShopIdentity from './ShopIdentity'
import CartButton from './CartButton'
import CartPanel from './CartPanel'
import type { AppState } from '../shared/types'

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
            <svg className="icon-btn__icon" aria-hidden="true"><use href="./icons.svg#menu" /></svg>
          </button>

          <ShopIdentity name={name} slogan={data.shop?.slogan ?? ''} loading={loading} />

          <SearchBox
            data={data}
            activeCategoryId={activeCategoryId}
            query={query}
            onQuery={onQuery}
          />

          <CartButton shopName={name} open={cartOpen} onToggle={() => setCartOpen((open) => !open)} />

          <ThemeToggle />
        </div>

        <HeaderNav categories={data.categories} products={data.products} />
      </header>
      <CartPanel open={cartOpen} data={data} onClose={() => setCartOpen(false)} />
    </>
  )
}
