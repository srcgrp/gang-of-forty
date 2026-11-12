import ProductCard from './ProductCard'
import type { Product, LoadState } from '../types'

type ProductGridProps = {
  state: LoadState<Product[]>
  onAdd: (id: number) => void
}

export default function ProductGrid({
  state,
  onAdd,
}: ProductGridProps) {
  return (
    <section className="products-section">
      <div className="container">
        <div className="section-header">
          <h2>محصولات ویژه</h2>
        </div>

        <div className="products-carousel">
          {state.status === 'loading' && (
            <p>در حال دریافت محصولات...</p>
          )}

          {state.status === 'error' && (
            <p>خطا در دریافت محصولات: {state.message}</p>
          )}

          {state.status === 'empty' && (
            <p>محصولی برای نمایش وجود ندارد.</p>
          )}

          {state.status === 'success' &&
            state.data.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={onAdd}
              />
            ))}
        </div>
      </div>
    </section>
  )
}