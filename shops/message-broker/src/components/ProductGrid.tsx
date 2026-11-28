
import type { Product, Offer } from '../types'
import ProductCard from './ProductCard'
import { finalPrice } from '../cart/cart'

type ProductGridProps = {
  products: Product[]
  offers: Offer[]
}

export default function ProductGrid({
  products,
  offers
}: ProductGridProps) {
  const offerMap = new Map(
    offers.map(offer => [offer.productId, offer])
  )

  return (
    <ul className="carousel" aria-label="کاروسل محصولات">
      {products.map(product => {
        const offer = offerMap.get(product.id)

        return (
          <ProductCard
            key={product.id}
            product={product}
            finalPrice={finalPrice(product.price, offer)}
            discount={offer?.percent ?? 0}
          />
        )
      })}
    </ul>
  )
}
