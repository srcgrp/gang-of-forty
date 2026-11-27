import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import type { Product, Offer } from '../types'
import ProductCard from './ProductCard'
import { useCartStore } from '../hooks/useCartStore'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface ProductCarouselProps {
  carouselId: string
  title: string
  emoji: string
  products: Product[]
  offers?: Offer[]
}

export default function ProductCarousel({
  carouselId,
  title,
  emoji,
  products,
  offers = [],
}: ProductCarouselProps): ReactNode {
  const addToCart = useCartStore((state) => state.add)
  const revealRef = useScrollReveal<HTMLElement>()

  const getProductOffer = (productId: number): Offer | undefined =>
    offers.find((o) => o.productId === productId)

  return (
    <section ref={revealRef} className="section scroll-reveal">
      <div className="section-title">
        <h2>
          {emoji} {title}
        </h2>
        <Link to="/plp/$carouselId" params={{ carouselId }}>
          مشاهده همه ({products.length})
        </Link>
      </div>
      <div className="popular-products" tabIndex={0}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            offer={getProductOffer(product.id)}
            onAdd={addToCart}
          />
        ))}
      </div>
    </section>
  )
}
