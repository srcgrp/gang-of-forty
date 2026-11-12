import type { PricedItem } from '../catalog/offers.ts'
import ProductCard from './ProductCard.tsx'

export type ProductGridProps = {
  title: string
  items: PricedItem[]
  onAdd: (id: number) => void
}

export default function ProductGrid({ title, items, onAdd }: ProductGridProps) {
  if (items.length === 0) {
    return (
      <section className="section">
        <h2>{title}</h2>
        <p>محصولی پیدا نشد.</p>
      </section>
    )
  }
  return (
    <section className="section">
      <div className="row-head">
        <h2>{title}</h2>
      </div>
      <div className="car">
        {items.map((item) => (
          <ProductCard
            key={item.product.id}
            product={item.product}
            price={item.price}
            oldPrice={item.oldPrice}
            percent={item.percent}
            soldOut={item.soldOut}
            onAdd={onAdd}
          />
        ))}
      </div>
    </section>
  )
}
