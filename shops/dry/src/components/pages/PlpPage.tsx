import { Link, useParams } from '@tanstack/react-router'
import { carouselProducts } from '../../features/products/catalog/carousels.ts'
import { formatNumber } from '../../features/products/catalog/format.ts'
import { useCatalog } from '../../hooks/useCatalog.ts'
import ProductCard from '../ProductCard.tsx'
import Status from '../Status.tsx'

export default function PlpPage() {
  const { carouselId } = useParams({ from: '/plp/$carouselId' })
  const { state, retry } = useCatalog()
  if (state.status !== 'success') return <Status state={state} onRetry={retry} />

  const carousel = carouselProducts(state, carouselId)
  if (carousel === null) {
    return (
      <section className="plp">
        <p className="status">این فهرست پیدا نشد.</p>
        <Link to="/">بازگشت به صفحه اصلی</Link>
      </section>
    )
  }

  return (
    <section className="plp">
      <Link to="/">← بازگشت به صفحه اصلی</Link>
      <h1>{carousel.title}</h1>
      <p>{formatNumber(carousel.cards.length)} محصول</p>
      <div className="plp-grid">
        {carousel.cards.map((card) => <ProductCard key={card.id} card={card} />)}
      </div>
    </section>
  )
}