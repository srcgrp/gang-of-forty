import ProductCard from './ProductCard.tsx'
import type { Card } from '../shared/types.ts'
import { Link } from '@tanstack/react-router'
import { formatNumber } from '../features/products/catalog/format.ts'

type ProductGridProps = {
  id: string
  title: string
  prefix: string
  carouselId?: string
  cards: Card[]
}

export default function ProductGrid({ id, title, prefix, cards, carouselId }: ProductGridProps) {
  const scrollTo = (n: number) =>
  document.getElementById(`${prefix}-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  return (
    <section className="products" id={id}>
      <div className="section-title">
        <h2>{title}</h2>
        {carouselId && (
      <Link className="view-all" to="/plp/$carouselId" params={{ carouselId }} search={{ sort: 'default' }}>
    مشاهده همه ({formatNumber(cards.length)})
  </Link>
)}
<div className="carousel-nav">
  <button type="button" onClick={() => scrollTo(1)} aria-label="ابتدای کاروسل">→</button>
  <button type="button" onClick={() => scrollTo(cards.length)} aria-label="انتهای کاروسل">←</button>
</div>
      </div>

            {cards.length === 0 ? (
        <p className="status">محصولی برای نمایش وجود ندارد.</p>
      ) : (
                <div className="carousel" tabIndex={0} aria-label={title}>
          {cards.map((card, i) => (
            <ProductCard
              key={card.id}
              card={card}
              anchorId={`${prefix}-${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}