import { useCatalog } from '../../hooks/useCatalog'
import { useSearchStore } from '../../hooks/useSearchStore'
import { carouselProducts } from '../../catalog/products'
import CatalogStatus from '../CatalogStatus'
import CarouselRow from '../CarouselRow'
import CategoryNav from '../CategoryNav'
import SearchResults from '../SearchResults'
import Hero from '../Hero'
import SaleCountdown from '../SaleCountdown'

export default function HomePage() {
  const state = useCatalog()
  const query = useSearchStore((store) => store.query)
  if (state.status !== 'success') return <CatalogStatus state={state} retry={state.retry} />
  const catalog = state.data
  if (query.trim()) return <SearchResults catalog={catalog} query={query.trim()} />
  return <>
    <Hero />
    <CategoryNav categories={catalog.categories} />
    <div id="products">
      <SaleCountdown />
      {catalog.carousels.map((carousel) => <CarouselRow key={carousel.id} carousel={carousel}
        products={carouselProducts(catalog, carousel.id) ?? []} />)}
    </div>
  </>
}
