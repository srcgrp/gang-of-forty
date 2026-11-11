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
  if (data.res.status === 'empty') return <div style={{ padding: '40px', textAlign: 'center' }}><h2>محصولی یافت نشد</h2></div>
  if (data.res.status === 'error') return <div style={{ padding: '40px', textAlign: 'center' }}><h2>خطا</h2><button onClick={() => window.location.reload()}>تلاش دوباره</button></div>

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