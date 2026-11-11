import type { AppState, Cart } from '../shared/types'
import { buildShelves } from '../features/products/logic/shelves'
import { cardOf } from '../features/products/logic/to-card'
import ProductGrid from './ProductGrid'
import ProductSkeleton from './ProductSkeleton'

type ProductsSectionProps = {
  data: AppState
  cart: Cart
  activeCategoryId: number | null
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function ProductsSection({ data, cart, activeCategoryId, onAdd, onRemove }: ProductsSectionProps) {
  if (data.res.status === 'loading') return <ProductSkeleton />
  
  if (data.res.status === 'empty') return (
    <section className="product-shelf" aria-labelledby="status-title">
      <div className="container">
        <div className="product-shelf__inner">
          <div className="product-shelf__main">
            <div className="product-shelf__head">
              <h2 id="status-title" className="product-shelf__title">محصولی یافت نشد</h2>
            </div>
            <div className="product-shelf__status" data-variant="empty" role="status" aria-live="polite">
              <p className="product-shelf__status-title">هنوز محصولی برای نمایش نداریم</p>
              <p className="product-shelf__status-text">به‌زودی محصولات تازه اضافه می‌شوند.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  if (data.res.status === 'error') return (
    <section className="product-shelf" aria-labelledby="status-title">
      <div className="container">
        <div className="product-shelf__inner">
          <div className="product-shelf__main">
            <div className="product-shelf__head">
              <h2 id="status-title" className="product-shelf__title">خطا</h2>
            </div>
            <div className="product-shelf__status" data-variant="error" role="status" aria-live="polite">
              <p className="product-shelf__status-title">بارگذاری محصولات ناموفق بود</p>
              <p className="product-shelf__status-text">{data.res.message}</p>
              <button type="button" className="product-shelf__status-retry" onClick={() => window.location.reload()}>
                تلاش دوباره
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const currentState = { ...data, cart }

  if (activeCategoryId !== null) {
    const filtered = data.products.filter((p) => p.categoryId === activeCategoryId)
    return (
      <ProductGrid
        id="shelf-filtered"
        title="محصولات دسته‌بندی"
        cards={filtered.map((p) => cardOf(p, currentState))}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    )
  }

  const shelves = buildShelves(currentState)
  return (
    <>
      {shelves.map((shelfView) => (
        <ProductGrid
          key={shelfView.shelf.id}
          id={`shelf-${shelfView.shelf.id}`}
          title={shelfView.shelf.title}
          cards={shelfView.cards}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </>
  )
}