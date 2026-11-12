import type { Product } from '../types.ts'

type ProductCardProps = {
  product: Product
}

const BACKGROUNDS = ['#fde3dc', '#e2eefc', '#fff0cc', '#e3f1e7'] as const

export default function ProductCard({ product }: ProductCardProps) {
  const bg = BACKGROUNDS[product.id % BACKGROUNDS.length] ?? BACKGROUNDS[0]
  return (
    <article className="card">
      <div className="pic" style={{ background: bg }}>
        {product.emoji}
      </div>
      <h3>{product.name}</h3>
      <p className="unit">{product.unit}</p>
      <div className="price-row">
        <strong className="price">{`${product.price.toLocaleString('fa-IR')} تومان`}</strong>
        <button className="add" type="button">
          +
        </button>
      </div>
    </article>
  )
}
