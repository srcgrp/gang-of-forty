import { Link, useParams } from '@tanstack/react-router'
import { carouselProducts, catalogProducts, findCarousel } from '../../catalog/catalog.ts'
import { useCatalog } from '../../hooks/useCatalog.ts'
import { formatCount } from '../../lib/format.ts'
import CartPanel from '../CartPanel.tsx'
import LoadStatus from '../LoadStatus.tsx'
import ProductCard from '../ProductCard.tsx'

export default function PlpPage() {
  const { carouselId } = useParams({ from: '/plp/$carouselId' })
  const state = useCatalog()

  if (state.status !== 'success') return <LoadStatus state={state} />

  const carousel = findCarousel(state.data, carouselId)
  const products = carouselProducts(state.data, carouselId)

  if (carousel === undefined || products === null) {
    return (
      <section className="section">
        <p className="carousel-status" role="status">این فهرست پیدا نشد.</p>
        <Link className="btn back-link" to="/">بازگشت به صفحه اصلی</Link>
      </section>
    )
  }

  return (
    <>
      <section className="section" aria-labelledby="plp-title">
        <div className="section-head">
          <h1 className="section-title" id="plp-title">
            <span aria-hidden="true">{carousel.emoji}</span> {carousel.title}
          </h1>
          <p>{formatCount(products.length)} محصول</p>
        </div>
        <ul className="plp-grid">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </ul>
        <Link className="btn back-link" to="/">بازگشت به صفحه اصلی</Link>
      </section>
      <CartPanel products={catalogProducts(state)} />
    </>
  )
}