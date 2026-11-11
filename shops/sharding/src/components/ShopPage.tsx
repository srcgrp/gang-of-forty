import type { AppState, CartChange, Theme, UrlFilters } from '../shared/types'
import { BANNER_IMAGES } from '../shared/content'
import { useScrollToHash } from '../hooks/useScrollToHash'
import Header from './Header'
import Hero from './Hero'
import CategoryNav from './CategoryNav'
import ProductsSection from './ProductsSection'
import Footer from './Footer'
import CartPanel from './CartPanel'
import MobileMenu from './MobileMenu'
import SlowNotice from './SlowNotice'
import SalePromotion from './SalePromotion'

type ShopPageProps = {
  data: AppState
  filters: UrlFilters
  onFilters: (filters: UrlFilters, mode?: 'push' | 'replace') => void
  theme: Theme
  onTheme: (theme: Theme) => void
  count: number
  onCartChange: (id: number, change: CartChange) => void
  cartOpen: boolean
  onCartOpen: (open: boolean) => void
  menuOpen: boolean
  onMenuOpen: (open: boolean) => void
  onRetry: () => void
}

export default function ShopPage({ data, filters, onFilters, theme, onTheme, count,
  onCartChange, cartOpen, onCartOpen, menuOpen, onMenuOpen, onRetry }: ShopPageProps) {
  const loading = data.res.status === 'loading'
  const activeCategory = data.categories.find((category) => category.slug === filters.category)
  useScrollToHash(!loading)

  function pickCategory(id: number | null): void {
    const category = data.categories.find((item) => item.id === id)?.slug ?? ''
    onFilters({ ...filters, category }, 'push')
    requestAnimationFrame(() => {
      const target = category ? document.getElementById(category) : document.querySelector('.product-shelf')
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <>
      <a href="#main-content" className="skip-link"><span className="container">پرش به محتوای اصلی</span></a>
      <Header shopName={data.shop?.name ?? 'فروشگاه'} slogan={data.shop?.slogan ?? ''} notice={data.shop?.notice ?? ''} cartCount={count} theme={theme}
        loading={loading} onTheme={onTheme} onOpenCart={() => onCartOpen(true)}
        onOpenMenu={() => onMenuOpen(true)} products={data.products} categories={data.categories}
        cart={data.cart} query={filters.query} onQuery={(query) => onFilters({ ...filters, query })}
        onAddToCart={(id) => onCartChange(id, 'add')} onRemoveFromCart={(id) => onCartChange(id, 'remove')} />
      <main id="main-content" tabIndex={-1}>
        <Hero banners={BANNER_IMAGES} loading={loading} home={data.home} />
        <SalePromotion />
        <CategoryNav categories={data.categories} activeId={activeCategory?.id ?? null} onPick={pickCategory} loading={loading} />
        <ProductsSection data={data} cart={data.cart} activeCategoryId={activeCategory?.id ?? null} query={filters.query} onRetry={onRetry}
          onAdd={(id) => onCartChange(id, 'add')} onRemove={(id) => onCartChange(id, 'remove')} />
      </main>
      <Footer shop={data.shop} />
      <SlowNotice loading={loading} />
      <CartPanel open={cartOpen} cart={data.cart} products={data.products} offerMap={data.offerMap}
        onClose={() => onCartOpen(false)} onRemoveLine={(id) => onCartChange(id, 'remove-line')} />
      <MobileMenu open={menuOpen} onClose={() => onMenuOpen(false)} menu={data.shop?.menu ?? []}
        theme={theme} onTheme={onTheme} />
    </>
  )
}
