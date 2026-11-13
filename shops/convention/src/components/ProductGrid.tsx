
import ProductCard from './ProductCard'
import type { Product, LoadState } from '../types'

type ProductGridProps = {
  state: LoadState<Product[]>
  products: Product[]
  onAdd: (id: number) => void
  onRetry: () => void
}

export default function ProductGrid({
  state,
  products,
  onAdd,
  onRetry,
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
            <div>
                <p>خطا در دریافت محصولات: {state.message}</p>
                <button className="retry-button" onClick={onRetry}>
                     تلاش مجدد
                </button>
            </div>
          )}

          {state.status === 'empty' && (
            <p>محصولی برای نمایش وجود ندارد.</p>
          )}

          {state.status === 'success' && products.length === 0 && (
            <p>محصولی با این نام پیدا نشد.</p>
          )}

          {state.status === 'success' &&
            products.map((product) => (
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
