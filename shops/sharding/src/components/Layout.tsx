import { useState } from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import { CatalogContext, useLoadCatalog } from '../hooks/useCatalog'
import { useScrollToHash } from '../hooks/useScrollToHash'
import { useThemeStore } from '../hooks/useThemeStore'
import { useUrlFilters } from '../hooks/useUrlFilters'
import Header from './Header'
import Footer from './Footer'
import CartPanel from './CartPanel'
import MobileMenu from './MobileMenu'
import SlowNotice from './SlowNotice'

export default function Layout() {
  const catalog = useLoadCatalog()
  const data = { ...catalog.data, res: catalog }
  const { filters, setQuery } = useUrlFilters()
  const theme = useThemeStore((state) => state.theme)
  const cartPanel = useState(false)
  const [cartOpen, onCartOpen] = cartPanel
  const mobileMenu = useState(false)
  const [menuOpen, onMenuOpen] = mobileMenu
  const loading = catalog.status === 'loading'
  const activeCategory = data.categories.find((category) => category.slug === filters.category)
  useScrollToHash(!loading)

  return (
    <div className="app" data-theme={theme}>
      <Link
        to="."
        hash="main-content"
        search={true}
        resetScroll={false}
        className="skip-link"
        onClick={() => document.getElementById('main-content')?.focus({ preventScroll: true })}
      >
        <span className="container">پرش به محتوای اصلی</span>
      </Link>
      <Header
        data={data}
        activeCategoryId={activeCategory?.id ?? null}
        loading={loading}
        cartPanel={cartPanel}
        mobileMenu={mobileMenu}
        query={filters.query}
        onQuery={setQuery}
      />
      <main id="main-content" tabIndex={-1}>
        <CatalogContext value={catalog}>
          <Outlet />
        </CatalogContext>
      </main>
      <Footer shop={data.shop} />
      <SlowNotice loading={loading} />
      <CartPanel open={cartOpen} data={data} onClose={() => onCartOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => onMenuOpen(false)} menu={data.shop?.menu ?? []} />
    </div>
  )
}
