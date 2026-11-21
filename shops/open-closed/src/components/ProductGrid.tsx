import type { LoadState } from '../types.ts'
import { statusText } from '../lib/statusText.ts'
import ProductCard from './ProductCard.tsx'
import Skeleton from './Skeleton.tsx'

const SKELETON_IDS = ['a', 'b', 'c', 'd', 'e', 'f']

type ProductGridProps = {
  state: LoadState
  categoryId: number | null
  onAdd: (id: number) => void
}

export default function ProductGrid({ state, categoryId, onAdd }: ProductGridProps) {
  const products =
    state.status === 'success'
      ? state.products.filter((p) => categoryId === null || p.categoryId === categoryId)
      : []
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
        {statusText(state, products.length)}
      </div>
      <section
        className="carousel"
        aria-label="محصولات"
        tabIndex={0}
        aria-busy={state.status === 'loading'}
      >
        <ul>
          {state.status === 'loading' && SKELETON_IDS.map((id) => <Skeleton key={id} />)}
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onAdd={onAdd}
              badge={p.tags.includes('جدید') ? 'جدید' : undefined}
            />
          ))}
        </ul>
      </section>
    </section>
  )
}
