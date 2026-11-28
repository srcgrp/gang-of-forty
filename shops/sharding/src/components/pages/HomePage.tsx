import { BANNER_IMAGES } from '../../shared/content'
import { useCatalog } from '../../hooks/useCatalog'
import { useUrlFilters } from '../../hooks/useUrlFilters'
import Hero from '../Hero'
import CategoryNav from '../CategoryNav'
import ProductsSection from '../ProductsSection'

export default function HomePage() {
  const catalog = useCatalog()
  const data = { ...catalog.data, res: catalog }
  const { filters, pickCategory } = useUrlFilters()
  const loading = catalog.status === 'loading'
  const activeCategory = data.categories.find((category) => category.slug === filters.category)

  function onCategoryPick(id: number | null): void {
    const category = data.categories.find((item) => item.id === id)?.slug ?? ''
    pickCategory(category)
  }

  return (
    <>
      <Hero banners={BANNER_IMAGES} loading={loading} home={data.home} />
      <CategoryNav
        categories={data.categories}
        activeId={activeCategory?.id ?? null}
        onPick={onCategoryPick}
        loading={loading}
      />
      <ProductsSection
        data={data}
        activeCategoryId={activeCategory?.id ?? null}
        query={filters.query}
        onRetry={catalog.retry}
      />
    </>
  )
}
