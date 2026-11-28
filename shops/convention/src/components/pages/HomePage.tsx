import { useCatalog } from '../../hooks/useCatalog'
import { useSearchStore } from '../../hooks/useSearchStore'
import { carouselProducts } from '../../catalog/products'
import CatalogStatus from '../CatalogStatus'
import CarouselRow from '../CarouselRow'
import CategoryNav from '../CategoryNav'
import ProductCard from '../ProductCard'
import Hero from '../Hero'
import SaleCountdown from '../SaleCountdown'

export default function HomePage() {
  const state = useCatalog()
  const query = useSearchStore((store) => store.query)
  if (state.status !== 'success') return <CatalogStatus state={state} retry={state.retry} />
  const catalog = state.data
  const matches = catalog.products.filter((product) => product.name.includes(query.trim()))
  return query.trim() ? <section aria-label="نتایج جستجو">
    <h1>نتایج جستجو ({matches.length.toLocaleString('fa-IR')})</h1>
    <div className="product-grid">{matches.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    {matches.length === 0 && <p>محصولی با این نام پیدا نشد.</p>}
  </section> : <>
    <Hero />
    <CategoryNav categories={catalog.categories} />
    <div id="products">
      <SaleCountdown />
      {catalog.carousels.map((carousel) => <CarouselRow key={carousel.id} carousel={carousel}
        products={carouselProducts(catalog, carousel.id) ?? []} />)}
    </div>
  </>
}
