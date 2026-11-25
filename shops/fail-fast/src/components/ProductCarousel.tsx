import type { ReactNode } from 'react'
import type { Product, Offer } from '../types'
import ProductCard from './ProductCard'
import { useCartStore } from '../hooks/useCartStore'

interface ProductCarouselProps {
  title: string
  emoji: string
  products: Product[]
  offers?: Offer[]
  viewAllHref?: string
}

export default function ProductCarousel({
  title,
  emoji,
  products,
  offers = [],
  viewAllHref = '#products',
}: ProductCarouselProps): ReactNode {
  const addToCart = useCartStore((state) => state.add)

  const getProductOffer = (productId: number): Offer | undefined =>
    offers.find((o) => o.productId === productId)

  return (
    <section className="section">
      <div className="section-title">
        <h2>
          {emoji} {title}
        </h2>
        <a href={viewAllHref}>مشاهده همه</a>
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
