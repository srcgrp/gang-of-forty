import { Link, useParams, useSearch } from '@tanstack/react-router'
import { carouselProducts } from '../../features/products/catalog/carousels.ts'
import { formatNumber } from '../../features/products/catalog/format.ts'
import { useCatalog } from '../../hooks/useCatalog.ts'
import ProductCard from '../ProductCard.tsx'
import Status from '../Status.tsx'

export default function PlpPage() {
  const { carouselId } = useParams({ from: '/plp/$carouselId' })
  const { sort } = useSearch({ from: '/plp/$carouselId' })
  const { state, retry } = useCatalog()
  if (state.status !== 'success') return <Status state={state} onRetry={retry} />

  const carousel = carouselProducts(state, carouselId, sort)
  if (carousel === null) {
    return (
      <section className="plp">
        <p className="status">این فهرست پیدا نشد.</p>
        <Link className="back-link" to="/">بازگشت به صفحه اصلی</Link>
      </section>
    )
  }

  return (
    <section className="plp">
      <Link className="back-link" to="/">← بازگشت به صفحه اصلی</Link>
      <h1>{carousel.title}</h1>
      <p>{formatNumber(carousel.cards.length)} محصول</p>
      <nav className="plp-sort" aria-label="مرتب‌سازی">
        <Link to="/plp/$carouselId" params={{ carouselId }} search={{ sort: 'default' }}
          aria-current={sort === 'default' ? 'true' : undefined}>پیش‌فرض</Link>
        <Link to="/plp/$carouselId" params={{ carouselId }} search={{ sort: 'price' }}
          aria-current={sort === 'price' ? 'true' : undefined}>ارزان‌ترین</Link>
      </nav>
      <div className="plp-grid">
        {carousel.cards.map((card) => <ProductCard key={card.id} card={card} />)}
      </div>
    </section>
  )
}