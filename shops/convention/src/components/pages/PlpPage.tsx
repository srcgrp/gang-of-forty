import { Link, useParams, useSearch } from '@tanstack/react-router'
import { useCatalog } from '../../hooks/useCatalog'
import { carouselProducts, sortProducts } from '../../catalog/products'
import CatalogStatus from '../CatalogStatus'
import ProductCard from '../ProductCard'

export default function PlpPage() {
  const { carouselId } = useParams({ from: '/plp/$carouselId' })
  const { sort } = useSearch({ from: '/plp/$carouselId' })
  const state = useCatalog()
  if (state.status !== 'success') return <CatalogStatus state={state} retry={state.retry} />
  const products = carouselProducts(state.data, carouselId)
  const title = state.data.carousels.find((item) => item.id === carouselId)?.title ??
    state.data.categories.find((item) => item.slug === carouselId)?.name
  return <section>
    <Link to="/">بازگشت به خانه</Link>
    {products === null ? <h1>این فهرست پیدا نشد</h1> : <>
      <h1>{title}</h1><p>{products.length.toLocaleString('fa-IR')} محصول</p>
      <nav className="sort-links" aria-label="مرتب‌سازی محصولات">
        <Link to="/plp/$carouselId" params={{ carouselId }} search={{ sort: 'default' }} aria-current={sort === 'default' ? 'page' : undefined}>پیش‌فرض</Link>
        <Link to="/plp/$carouselId" params={{ carouselId }} search={{ sort: 'price' }} aria-current={sort === 'price' ? 'page' : undefined}>ارزان‌ترین</Link>
      </nav>
      <div className="product-grid">{sortProducts(products, sort).map((product) => <ProductCard key={product.id} product={product} />)}</div>
      {products.length === 0 && <p>این فهرست خالی است.</p>}
    </>}
  </section>
}
