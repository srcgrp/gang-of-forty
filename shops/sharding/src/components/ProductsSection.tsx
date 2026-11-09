import type { LoadState, Product, Cart, Stock } from '../shared/types'
import ProductGrid from './ProductGrid'
import ProductStatus from './ProductStatus'

type ProductsSectionProps = {
  res: LoadState
  products: Product[]
  cart: Cart
  stock: Stock | null
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

function assertNever(x: never): never {
  throw new Error(`Unhandled state: ${JSON.stringify(x)}`)
}

export default function ProductsSection(props: ProductsSectionProps) {
  switch (props.res.status) {
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
          text={props.res.message}
          onRetry={() => window.location.reload()}
        />
      )
    case 'success':
      return (
        <ProductGrid
          title="همه محصولات"
          products={props.products}
          cart={props.cart}
          stock={props.stock}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
        />
      )
    default:
      return assertNever(props.res)
  }
}