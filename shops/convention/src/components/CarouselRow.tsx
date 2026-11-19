import { Link } from '@tanstack/react-router'
import type { Carousel, Product } from '../types'
import ProductCard from './ProductCard'

type Props = { carousel: Carousel; products: Product[] }
export default function CarouselRow({ carousel, products }: Props) {
  return <section className="products-section" aria-label={carousel.title}>
    <div className="section-header">
      <h2>{carousel.emoji} {carousel.title}</h2>
      <Link to="/plp/$carouselId" search={{ sort: 'default' }} params={{ carouselId: carousel.id }}>
        مشاهده همه ({products.length.toLocaleString('fa-IR')})
      </Link>
    </div>
    <div className="products-carousel">
      {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
    {products.length === 0 && <p>این فهرست خالی است.</p>}
  </section>
}
