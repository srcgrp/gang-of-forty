import type { Product } from '../types.ts'
import { describeProduct } from '../lib/format.ts'
import Price from './Price.tsx'

const TINTS = ['t-blue', 't-yellow', 't-green', 't-pink', 't-purple', 't-orange']

type ProductCardProps = {
  product: Product
  index: number
  onAdd: (id: number) => void
  badge?: string
  inStock?: boolean
}

export default function ProductCard({
  product,
  index,
  onAdd,
  badge,
  inStock = true,
}: ProductCardProps) {
  const nameId = `d-${product.id}-n`
  const tint = TINTS[index % TINTS.length]

  return (
    <li className={inStock ? 'card' : 'card is-out'} id={`d-${product.id}`}>
      <article className={tint} aria-labelledby={nameId}>
        <div className="media">
          <span className="ico" aria-hidden="true">{product.emoji}</span>
          {badge && <span className="badge">{badge}</span>}
        </div>
        <h3 className="name" id={nameId}>{product.name}</h3>
        <p className="amount">{product.unit}</p>
        <div className="buy">
          <Price value={product.price} />
          <button
            className="add"
            type="button"
            disabled={!inStock}
            aria-label={`افزودن ${describeProduct(product)} به سبد خرید`}
            onClick={() => onAdd(product.id)}
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </article>
    </li>
  )
}
