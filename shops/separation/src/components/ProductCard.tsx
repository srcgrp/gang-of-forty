import type { Product } from '../types.ts'

export type ProductCardProps = {
  product: Product
  price: number
  oldPrice?: number | undefined
  percent?: number | undefined
  soldOut?: boolean | undefined
  onAdd: (id: number) => void
}

export default function ProductCard({ product, price, oldPrice, percent, soldOut, onAdd }: ProductCardProps) {
  const bgById = ['#fde3dc', '#e2eefc', '#fff0cc', '#e3f1e7'] as const
  const bg = bgById[product.id % bgById.length] ?? bgById[0]
  return (
    <article className={soldOut === true ? 'card soldout' : 'card'}>
      {percent !== undefined ? <span className="badge">{`${percent.toLocaleString('fa-IR')}٪`}</span> : null}
      <div className="pic" style={{ background: bg }}>
        {product.emoji}
      </div>
      <h3>{product.name}</h3>
      <p className="unit">{product.unit}</p>
      {oldPrice !== undefined ? <p className="old">{`${oldPrice.toLocaleString('fa-IR')} تومان`}</p> : null}
      <div className="price-row">
        <strong className="price">{`${price.toLocaleString('fa-IR')} تومان`}</strong>
        <button className="add" type="button" disabled={soldOut === true} onClick={() => onAdd(product.id)}>
          {soldOut === true ? 'ناموجود' : '+'}
        </button>
      </div>
    </article>
  )
}
