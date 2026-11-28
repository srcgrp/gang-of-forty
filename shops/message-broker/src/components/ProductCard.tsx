import { useCartStore } from '../hooks/useCartStore'
import type { Product } from '../types'
import Price from './Price'
import OfferBadge from './OfferBadge'

type ProductCardProps = {
  product: Product
  finalPrice: number
  discount: number
}

export default function ProductCard({
  product,
  finalPrice,
  discount,
}: ProductCardProps) {
   const add = useCartStore((s) => s.add)
   
  return (
    <li className="card" id={`product-${product.id}`}>
      <article>
        <div className="img fruit-icon">
          <span aria-hidden="true">{product.emoji}</span>
        </div>

        <h3>{product.name}</h3>

        <p>
          {discount > 0 && (
            <s>{product.price.toLocaleString('fa-IR')}</s>
          )}
          {' '}
          <b>
            <Price value={finalPrice} />
          </b>
        </p>

        <OfferBadge discount={discount} />

        <button type="button" onClick={() => add(product.id)}>
         افزودن
        </button> 
      </article>
    </li>
  )
}
