import Price from './Price'
import OfferBadge from './OfferBadge'
import type {Product} from '../types'

type ProductCardProps = {
  product: Product
  onAdd: (id: number) => void
  stock?: number
  discount?: number
}

export default function ProductCard({
  product,
  onAdd,
  stock,
  discount
}: ProductCardProps) {
  return (
    <li className="card" id={String(product.id)}>
      <article>
        <div className="img fruit-icon">
          <span aria-hidden="true">{product.emoji}</span>
        </div>

        <h3>{product.name}</h3>

       <p>
        <b>
           <Price value={product.price} />
        </b>
       </p>
         {discount !== undefined && (
        <OfferBadge discount={discount} />
         )}

        <button type="button"
        disabled={stock === 0}
        onClick={() => onAdd(product.id)}>
          افزودن
        </button>
      </article>
    </li>
  )
}
