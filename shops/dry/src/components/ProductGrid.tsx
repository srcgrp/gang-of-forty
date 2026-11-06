import ProductCard from './ProductCard.tsx'
import type { Card } from '../shared/types.ts'

type ProductGridProps = {
  id: string
  title: string
  prefix: string
  cards: Card[]
  onAdd: (id: number) => void
}

export default function ProductGrid({ id, title, prefix, cards, onAdd }: ProductGridProps) {
  return (
    <section className="products" id={id}>
      <div className="section-title">
        <h2>{title}</h2>
        <div className="carousel-nav">
          <a href={`#${prefix}-1`} aria-label="ابتدای کاروسل">→</a>
          <a href={`#${prefix}-${cards.length}`} aria-label="انتهای کاروسل">←</a>
        </div>
      </div>

            {cards.length === 0 ? (
        <p className="status">محصولی برای نمایش وجود ندارد.</p>
      ) : (
        <div className="carousel">
          {cards.map((card, i) => (
            <ProductCard
              key={card.id}
              card={card}
              onAdd={onAdd}
              anchorId={`${prefix}-${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}