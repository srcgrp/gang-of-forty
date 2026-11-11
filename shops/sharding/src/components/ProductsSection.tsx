import type { AppState, LoadState, Cart } from '../shared/types'
import { buildShelves } from '../features/products/logic/shelves'
import { cardOf } from '../features/products/logic/to-card'
import ProductGrid from './ProductGrid'
import ProductStatus from './ProductStatus'

type ProductsSectionProps = {
  data: AppState
  cart: Cart
  activeCategoryId: number | null
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

function assertNever(x: never): never {
  throw new Error(`Unhandled state: ${JSON.stringify(x)}`)
}

export default function ProductsSection({ data, cart, activeCategoryId, onAdd, onRemove }: ProductsSectionProps) {
  switch (data.res.status) {
    case 'loading':
      return <ProductStatus variant="loading" title="در حال بارگذاری…" text="کمی صبر کنید." />
    case 'empty':
      return (
        <ProductStatus
          variant="empty"
          title="هنوز محصولی برای نمایش نداریم"
          text="به‌زودی محصولات تازه اضافه می‌شوند."
        />
      )
    case 'error':
      return (
        <ProductStatus
          variant="error"
          title="بارگذاری محصولات ناموفق بود"
          text={data.res.message}
          onRetry={() => window.location.reload()}
        />
      )
    case 'success': {
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
    default:
      return assertNever(data.res)
  }
}