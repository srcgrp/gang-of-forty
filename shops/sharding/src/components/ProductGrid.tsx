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
  const { trackRef, isAtStart, isAtEnd, scrollPrev, scrollNext } = useCarousel(cards.length)
  const titleId = `${id}-title`
  const isOffers = id === 'offers'

  return (
    <section className="product-shelf" id={id} aria-labelledby={titleId} data-variant={isOffers ? 'offers' : undefined}>
      <div className="container">
        <div className="product-shelf__inner">
          <div className="product-shelf__main">
            <div className="product-shelf__head">
              <h2 id={titleId} className="product-shelf__title">{title}</h2>
              <CarouselNav
                isAtStart={isAtStart}
                isAtEnd={isAtEnd}
                onPrev={scrollPrev}
                onNext={scrollNext}
                label={title}
                sectionId={id}
              />
            </div>

            <ul ref={trackRef} className="product-shelf__grid" id={`${id}-grid`} tabIndex={0} aria-label={title}>
              {cards.map((card) => (
                <ProductCard
                  key={card.id}
                  card={card}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
