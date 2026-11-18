import type { AppState } from '../shared/types'
import { buildShelves } from '../features/products/logic/shelves'
import { searchProducts } from '../features/products/logic/filters'
import ProductGrid from './ProductGrid'
import ProductSkeleton from './ProductSkeleton'
import ProductStatus from './ProductStatus'

type ProductsSectionProps = {
  data: AppState
  activeCategoryId: number | null
  query: string
  onRetry: () => void
}

export default function ProductsSection({ data, activeCategoryId, query, onRetry }: ProductsSectionProps) {
  switch (data.res.status) {
    case 'loading':
      return <ProductSkeleton />
    case 'empty':
      return <ProductStatus variant="empty" title="محصولی یافت نشد" text="به‌زودی محصولات تازه اضافه می‌شوند." />
    case 'error':
      return <ProductStatus variant="error" title="بارگذاری محصولات ناموفق بود" text={data.res.message} onRetry={onRetry} />
    case 'success': {
      const products = searchProducts(data.products, query)
      const shelves = buildShelves({ ...data, products })
      const visible = activeCategoryId === null ? shelves : shelves.filter(
        ({ shelf }) => shelf.categoryId === activeCategoryId,
      )
      if (query.trim() && visible.every(({ cards }) => cards.length === 0)) {
        return <ProductStatus variant="empty" title="نتیجه‌ای یافت نشد" text="عبارت یا دسته‌بندی دیگری را امتحان کنید." />
      }
      return (
        <>
          {visible.filter(({ cards }) => !query.trim() || cards.length > 0).map(({ shelf, cards }) => (
            <ProductGrid key={shelf.id} id={shelf.id} title={shelf.title} cards={cards} />
          ))}
        </>
      )
    }
    default: {
      const unreachable: never = data.res
      return unreachable
    }
  }
}
