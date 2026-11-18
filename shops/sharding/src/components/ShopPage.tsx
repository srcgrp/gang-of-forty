import type { AppState, CartChange, UrlFilters } from '../shared/types'
import { cartCount } from '../features/cart/logic/cart'
import { useScrollToHash } from '../hooks/useScrollToHash'
import { useCategoryLinks } from '../hooks/useCategoryLinks'
import { useThemeStore } from '../hooks/useThemeStore'
import Header from './Header'
import ShopMain from './ShopMain'
import Footer from './Footer'
import CartPanel from './CartPanel'
import MobileMenu from './MobileMenu'
import SlowNotice from './SlowNotice'

type ShopPageProps = {
  data: AppState
  filters: [UrlFilters, (filters: UrlFilters, mode?: 'push' | 'replace') => void]
  onCartChange: (id: number, change: CartChange) => void
  cartPanel: [boolean, (open: boolean) => void]
  mobileMenu: [boolean, (open: boolean) => void]
  onRetry: () => void
}

export default function ShopPage({ data, filters: filterState,
  onCartChange, cartPanel, mobileMenu, onRetry }: ShopPageProps) {
  const [filters, onFilters] = filterState
  const theme = useThemeStore((state) => state.theme)
  const [cartOpen, onCartOpen] = cartPanel
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
        cartCount={cartCount(data.cart)}
        loading={loading}
        cartPanel={cartPanel}
        mobileMenu={mobileMenu}
        query={filters.query}
        onQuery={(query) => onFilters({ ...filters, query })}
        onAddToCart={(id) => onCartChange(id, 'add')}
        onRemoveFromCart={(id) => onCartChange(id, 'remove')}
      />
      <ShopMain data={data} filters={filters} onCategoryPick={navigateCategory} onCartChange={onCartChange} onRetry={onRetry} />
      <Footer shop={data.shop} />
      <SlowNotice loading={loading} />
      <CartPanel
        open={cartOpen}
        data={data}
        onClose={() => onCartOpen(false)}
        onCartChange={onCartChange}
      />
      <MobileMenu
        open={menuOpen}
        onClose={() => onMenuOpen(false)}
        menu={data.shop?.menu ?? []}
      />
    </div>
  )
}
