import { useId } from 'react'
import { useCartStore } from '../hooks/useCartStore.ts'
import type { Product } from '../types.ts'
import { describeProduct } from '../lib/format.ts'
import Price from './Price.tsx'

const TINTS = ['t-blue', 't-yellow', 't-green', 't-pink', 't-purple', 't-orange']

type ProductCardProps = {
  product: Product
  index: number
  inStock?: boolean
}

export default function ProductCard({ product, index, inStock = true }: ProductCardProps) {
  const add = useCartStore((s) => s.add)
  const nameId = useId()
  const tint = TINTS[index % TINTS.length]
  const badge = product.tags.includes('جدید') ? 'جدید' : undefined

  return (
    <li className={inStock ? 'card' : 'card is-out'}>
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
            onClick={() => add(product.id)}
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </article>
    </li>
  )
}