import { useState } from 'react'
import type { AppState } from '../shared/types'
import { useCatalog } from '../hooks/useCatalog'
import { useScrollToHash } from '../hooks/useScrollToHash'
import { useCategoryLinks } from '../hooks/useCategoryLinks'
import { useThemeStore } from '../hooks/useThemeStore'
import { useUrlFilters } from '../hooks/useUrlFilters'
import Header from './Header'
import ShopMain from './ShopMain'
import Footer from './Footer'
import CartPanel from './CartPanel'
import MobileMenu from './MobileMenu'
import SlowNotice from './SlowNotice'

export default function ShopPage() {
  const { data: catalog, retry, ...res } = useCatalog()
  const data: AppState = { ...catalog, res }
  const [filters, onFilters] = useUrlFilters()
  const theme = useThemeStore((state) => state.theme)
  const cartPanel = useState(false)
  const [cartOpen, onCartOpen] = cartPanel
  const mobileMenu = useState(false)
  const [menuOpen, onMenuOpen] = mobileMenu
  const loading = data.res.status === 'loading'
  const activeCategory = data.categories.find((category) => category.slug === filters.category)
  useScrollToHash(!loading)
  const navigateCategory = useCategoryLinks(data.categories, filters, onFilters)

  return (
    <div className="app" data-theme={theme}>
      <a href="#main-content" className="skip-link"><span className="container">پرش به محتوای اصلی</span></a>
      <Header
        data={data}
        activeCategoryId={activeCategory?.id ?? null}
        loading={loading}
        cartPanel={cartPanel}
        mobileMenu={mobileMenu}
        query={filters.query}
        onQuery={(query) => onFilters({ ...filters, query })}
      />
      <ShopMain data={data} filters={filters} onCategoryPick={navigateCategory} onRetry={retry} />
      <Footer shop={data.shop} />
      <SlowNotice loading={loading} />
      <CartPanel
        open={cartOpen}
        data={data}
        onClose={() => onCartOpen(false)}
      />
      <MobileMenu
        open={menuOpen}
        onClose={() => onMenuOpen(false)}
        menu={data.shop?.menu ?? []}
      />
    </div>
  )
}
