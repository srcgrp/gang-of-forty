import type { CardInfo, Product } from '../types'
import Badge from './Badge'
import Price from './Price'

type ProductCardProps = {
  product: Product
  info?: CardInfo | undefined
  id?: string | undefined
  onAdd: (id: number) => void
}

export default function ProductCard({ product, info = {}, id, onAdd }: ProductCardProps) {
  const { percent, label, finalPrice, inStock = true } = info
  const titleId = `product-${product.id}`

  return (
    <li id={id}>
      <article className={inStock ? 'product-card' : 'product-card out-of-stock'}>
        <span className="product-img" aria-hidden="true">{product.emoji}</span>
        {!inStock && <Badge text="ناموجود" readerText="ناموجود" className="stock-badge" />}
        {inStock && label !== undefined && percent !== undefined && (
          <Badge text={`${percent.toLocaleString('fa-IR')} ٪`} readerText={label} className="discount-badge" />
        )}
        <h3 id={titleId}>{product.name}</h3>
        <p>{product.unit}</p>
        <div className="card-footer">
          <Price price={product.price} finalPrice={finalPrice} />
          <button type="button" aria-describedby={titleId} disabled={!inStock} onClick={() => onAdd(product.id)}>
            <span aria-hidden="true">+</span>
            <span className="visually-hidden">افزودن به سبد خرید</span>
          </button>
        </div>
      </article>
    </li>
  )
}