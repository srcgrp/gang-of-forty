import type { Product } from '../types.ts'
import ProductCard from './ProductCard.tsx'

type ProductGridProps = {
  title: string
  products: Product[]
}

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className="section">
      <div className="row-head">
        <h2>{title}</h2>
      </div>
      <div className="car">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
