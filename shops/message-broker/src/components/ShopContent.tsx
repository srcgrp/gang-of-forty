
import type { Category, Offer, Product, CartLine, LoadState } from '../types'
import CategoryNav from './CategoryNav'
import ProductGrid from './ProductGrid'
import CartPanel from './CartPanel'

type ShopContentProps = {
  categories: Category[]
  categoryId: number | null
  onPick: (id: number | null) => void
  loadState: LoadState
  products: Product[]
  offers: Offer[]
  cart: CartLine[]
  total: number
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function ShopContent({
  categories,
  categoryId,
  onPick,
  loadState,
  products,
  offers,
  cart,
  total,
  onAdd,
  onRemove
}: ShopContentProps) {
  const filteredProducts = products.filter(product =>
    categoryId === null || product.categoryId === categoryId
  )

  return (
    <section>
      <CategoryNav
        categories={categories}
        activeCategoryId={categoryId}
        onPick={onPick}
      />

      {loadState.status === 'loading' && <p>در حال دریافت محصولات...</p>}

      {loadState.status === 'error' && <p>{loadState.message}</p>}

      {loadState.status === 'empty' && <p>محصولی برای نمایش وجود ندارد.</p>}

      {loadState.status === 'success' && (
        <ProductGrid
          products={filteredProducts}
          offers={offers}
          onAdd={onAdd}
        />
      )}

      <CartPanel
        cart={cart}
        products={products}
        total={total}
        onRemove={onRemove}
      />
    </section>
  )
}
