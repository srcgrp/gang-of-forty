import type { Card } from '../shared/types'
import ProductCard from './ProductCard'
import CarouselNav from './CarouselNav'
import { useCarousel } from '../hooks/useCarousel'

type ProductGridProps = {
  id: string
  title: string
  cards: Card[]
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function ProductGrid({ id, title, cards, onAdd, onRemove }: ProductGridProps) {
  const { trackRef } = useCarousel()
  const titleId = `${id}-title`
  const isOffers = id === 'shelf-offers'

  return (
    <section className="product-shelf" id={id} aria-labelledby={titleId} data-variant={isOffers ? 'offers' : undefined}>
      <div className="container">
        <div className="product-shelf__inner">
          <div className="product-shelf__main">
            <div className="product-shelf__head">
              <h2 id={titleId} className="product-shelf__title">{title}</h2>
              <CarouselNav startHref={`#${id}-start`} endHref={`#${id}-end`} label={title} />
            </div>

            <ul ref={trackRef} className="product-shelf__grid" id={`${id}-grid`} tabIndex={0} aria-label={title}>
              {cards.map((card, i) => {
                const cardId = i === 0 ? `${id}-start` : i === cards.length - 1 ? `${id}-end` : undefined
                return (
                  <ProductCard
                    key={card.id}
                    {...(cardId !== undefined ? { id: cardId } : {})}
                    card={card}
                    onAdd={onAdd}
                    onRemove={onRemove}
                  />
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}