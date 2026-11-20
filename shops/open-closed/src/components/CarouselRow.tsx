import { Link } from '@tanstack/react-router'
import { formatCount } from '../lib/format.ts'
import type { Carousel, Product } from '../types.ts'
import ProductCard from './ProductCard.tsx'

const HOME_LIMIT = 10

type CarouselRowProps = { carousel: Carousel; products: Product[] }

export default function CarouselRow({ carousel, products }: CarouselRowProps) {
  const titleId = `carousel-${carousel.id}-title`

  return (
    <section className="section" aria-labelledby={titleId}>
      <div className="section-head">
        <h2 className="section-title" id={titleId}>
          <span aria-hidden="true">{carousel.emoji}</span> {carousel.title}
        </h2>
        <Link className="btn" to="/plp/$carouselId" params={{ carouselId: carousel.id }}>
          مشاهده همه ({formatCount(products.length)})
        </Link>
      </div>
      {products.length === 0 ? (
        <p className="carousel-status">فعلاً محصولی در این بخش نیست.</p>
      ) : (
        <div className="carousel" role="region" aria-label={carousel.title} tabIndex={0}>
          <ul>
            {products.slice(0, HOME_LIMIT).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}