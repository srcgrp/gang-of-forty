import { useCartStore } from '../hooks/useCartStore'
import type { CardInfo, Product } from '../types'
import Badge from './Badge'
import Price from './Price'
import { Link } from '@tanstack/react-router'

type ProductCardProps = {
  product: Product
  info?: CardInfo | undefined
  anchorId?: string | undefined
}

export default function ProductCard({ product, info = {}, anchorId }: ProductCardProps) {
  const { percent, label, finalPrice, inStock = true } = info
  const titleId = `product-${product.id}`
  const add = useCartStore((s) => s.add)

  return (
    <li id={anchorId}>
      <article className={inStock ? 'product-card' : 'product-card out-of-stock'}>
        <span className="product-img" aria-hidden="true">{product.emoji}</span>
        {!inStock && <Badge text="ناموجود" readerText="ناموجود" className="stock-badge" />}
        {inStock && label !== undefined && percent !== undefined && (
          <Badge text={`${percent.toLocaleString('fa-IR')} ٪`} readerText={label} className="discount-badge" />
        )}
        <h3 id={titleId}>
          <Link to="/product/$productId" params={{ productId: String(product.id) }}>
            {product.name}
          </Link>
        </h3>
        <p>{product.unit}</p>
        <div className="card-footer">
          <Price price={product.price} finalPrice={finalPrice} />
          <button type="button" aria-describedby={titleId} disabled={!inStock} onClick={() => add(product)}>
            <span aria-hidden="true">+</span>
            <span className="visually-hidden">افزودن به سبد خرید</span>
          </button>
        </div>
      </article>
    </li>
  )
}