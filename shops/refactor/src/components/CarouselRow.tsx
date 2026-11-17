import { Link } from '@tanstack/react-router'
import { carouselProducts } from '../features/catalog/carousel'
import { formatNumber } from './format'
import ProductCard from './ProductCard'
import type { Carousel, ProductView } from '../types'

type CarouselRowProps = {
  carousels: Carousel[]
  carousel: Carousel
  products: ProductView[]
}

const CAROUSEL_LIMIT = 10

export default function CarouselRow({ carousels, carousel, products }: CarouselRowProps) {
  const items = carouselProducts(carousels, products, carousel.id) ?? []
  return (
    <section className="catalog-section container" aria-labelledby={`carousel-${carousel.id}`}>
      <div className="section-head">
        <h2 className="section-title" id={`carousel-${carousel.id}`}>
          <span aria-hidden="true">{carousel.emoji}</span> {carousel.title}
          <span> ({formatNumber(items.length)} کالا)</span>
        </h2>
        <Link className="sale-show-btn" to="/plp/$carouselId" params={{ carouselId: carousel.id }}>مشاهده همه</Link>
      </div>
      {items.length === 0 ? (
        <p className="empty-message">فعلاً کالایی در این کاروسل نیست.</p>
      ) : (
        <ul className="catalog-grid">
          {items.slice(0, CAROUSEL_LIMIT).map((product) => (
            <ProductCard key={product.id} product={product} inStock={product.stock > 0}
              discount={product.percent > 0 ? product.percent : undefined} />
          ))}
        </ul>
      )}
    </section>
  )
}