import { useState } from 'react'
import { useCatalog } from '../../hooks/useCatalog'
import { carouselProducts } from '../../catalog/products'
import CatalogStatus from '../CatalogStatus'
import CarouselRow from '../CarouselRow'
import CategoryNav from '../CategoryNav'
import ProductCard from '../ProductCard'
import SearchBox from '../SearchBox'
import SaleCountdown from '../SaleCountdown'

export default function HomePage() {
  const state = useCatalog()
  const [query, setQuery] = useState('')
  if (state.status !== 'success') return <CatalogStatus state={state} retry={state.retry} />
  const catalog = state.data
  const matches = catalog.products.filter((product) => product.name.includes(query.trim()))
  return <>
    <h1>سوپرمارکت Convention</h1>
    <CategoryNav categories={catalog.categories} />
    <label htmlFor="search">جستجوی محصولات</label>
    <SearchBox value={query} onChange={setQuery} />
    {query.trim() ? <section aria-label="نتایج جستجو">
      <h2>نتایج جستجو ({matches.length.toLocaleString('fa-IR')})</h2>
      <div className="product-grid">{matches.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      {matches.length === 0 && <p>محصولی با این نام پیدا نشد.</p>}
    </section> : <>
      <SaleCountdown />
      {catalog.carousels.map((carousel) => <CarouselRow key={carousel.id} carousel={carousel}
        products={carouselProducts(catalog, carousel.id) ?? []} />)}
    </>}
  </>
}
