import type { AppState, UrlFilters } from '../shared/types'
import { BANNER_IMAGES } from '../shared/content'
import Hero from './Hero'
import CategoryNav from './CategoryNav'
import ProductsSection from './ProductsSection'

type ShopMainProps = {
  data: AppState
  filters: UrlFilters
  onCategoryPick: (category: string) => void
  onRetry: () => void
}

export default function ShopMain({ data, filters, onCategoryPick, onRetry }: ShopMainProps) {
  const loading = data.res.status === 'loading'
  const activeCategory = data.categories.find((category) => category.slug === filters.category)

  function pickCategory(id: number | null): void {
    const category = data.categories.find((item) => item.id === id)?.slug ?? ''
    onCategoryPick(category)
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
        activeCategoryId={activeCategory?.id ?? null}
        query={filters.query}
        onRetry={onRetry}
      />
    </main>
  )
}
