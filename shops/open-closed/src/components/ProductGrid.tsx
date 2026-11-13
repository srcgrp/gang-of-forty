import type { Product } from '../types.ts'
import ProductCard from './ProductCard.tsx'

type ProductGridProps = {
  products: Product[]
  onAdd: (id: number) => void
}

export default function ProductGrid({ products, onAdd }: ProductGridProps) {
  const first = products[0]
  const last = products[products.length - 1]

  return (
    <section className="section" id="dairy" aria-labelledby="dairy-title">
      <div className="section-head">
        <h2 className="section-title" id="dairy-title">
          <span aria-hidden="true">🛍️</span> محصولات
        </h2>
        <div className="carousel-nav">
          <a
            className="carousel-btn"
            href={first ? `#d-${first.id}` : '#dairy'}
            aria-label="رفتن به اولین محصول"
          >
            <span aria-hidden="true">→</span>
          </a>
          <a
            className="carousel-btn"
            href={last ? `#d-${last.id}` : '#dairy'}
            aria-label="رفتن به آخرین محصول"
          >
            <span aria-hidden="true">←</span>
          </a>
        </div>
      </div>
      <div className="carousel-status" role="status" aria-live="polite">
        {products.length === 0 && 'فعلاً محصولی در این دسته نیست.'}
      </div>
      <section className="carousel" aria-label="محصولات" tabIndex={0} aria-busy="false">
        <ul>
          {products.map((p, i) => {
            const isNew = p.tags.includes('جدید')
            return (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                onAdd={onAdd}
                badge={isNew ? 'جدید' : undefined}
              />
            )
          })}
        </ul>
      </section>
    </section>
  )
}
