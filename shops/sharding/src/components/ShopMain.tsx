import type { AppState, CartChange, UrlFilters } from '../shared/types'
import { BANNER_IMAGES } from '../shared/content'
import Hero from './Hero'
import CategoryNav from './CategoryNav'
import ProductsSection from './ProductsSection'

type ShopMainProps = {
  data: AppState
  filters: UrlFilters
  onFilters: (filters: UrlFilters, mode?: 'push' | 'replace') => void
  onCartChange: (id: number, change: CartChange) => void
  onRetry: () => void
}

export default function ShopMain({ data, filters, onFilters, onCartChange, onRetry }: ShopMainProps) {
  const loading = data.res.status === 'loading'
  const activeCategory = data.categories.find((category) => category.slug === filters.category)

  function pickCategory(id: number | null): void {
    const category = data.categories.find((item) => item.id === id)?.slug ?? ''
    onFilters({ ...filters, category }, 'push')
    requestAnimationFrame(() => {
      const target = (category && document.getElementById(category)) || document.querySelector('.product-shelf')
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <Hero banners={BANNER_IMAGES} loading={loading} home={data.home} />
      <CategoryNav
        categories={data.categories}
        activeId={activeCategory?.id ?? null}
        onPick={pickCategory}
        loading={loading}
      />
      <ProductsSection
        data={data}
        cart={data.cart}
        activeCategoryId={activeCategory?.id ?? null}
        query={filters.query}
        onRetry={onRetry}
        onAdd={(id) => onCartChange(id, 'add')}
        onRemove={(id) => onCartChange(id, 'remove')}
      />
    </main>
  )
}
