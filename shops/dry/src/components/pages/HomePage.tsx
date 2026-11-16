import { useCatalog } from '../../hooks/useCatalog.ts'
import { useFilterStore } from '../../hooks/useFilterStore.ts'
import Blog from '../Blog.tsx'
import Catalog from '../Catalog.tsx'
import CategoryGrid from '../CategoryGrid.tsx'
import CategoryNav from '../CategoryNav.tsx'
import Hero from '../Hero.tsx'
import PromoBanners from '../PromoBanners.tsx'
import SaleSection from '../SaleSection.tsx'

export default function HomePage() {
  const { state, retry } = useCatalog()
  const categoryId = useFilterStore((s) => s.categoryId)
  const query = useFilterStore((s) => s.query)
  const setCategory = useFilterStore((s) => s.setCategory)

  return (
    <>
      <CategoryNav state={state} selected={categoryId} onPick={setCategory} />
      <Hero />
      <SaleSection />
      <CategoryGrid state={state} />
      <Catalog state={state} categoryId={categoryId} query={query} onRetry={retry} />
      <PromoBanners />
      <Blog />
    </>
  )
}