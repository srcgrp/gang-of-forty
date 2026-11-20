import type {Category, Offer, CartLine, LoadState, Product, Home } from '../types'
import { assertNever } from '../types'
import CategoryNav from './CategoryNav'
import ProductGrid from './ProductGrid'
import CartPanel from './CartPanel'
import Hero from './Hero'
type Props = {
  categories: Category[]
  categoryId: number | null
  onPick: (id: number | null) => void
  loadState: LoadState
  products: Product[]
  offers: Offer[]
  home: Home | null
  cart: CartLine[]
  total: number
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}
export default function ShopContent(props: Props) {
  const {
    categories, categoryId, onPick, loadState,
    products, offers, home, cart, total, onAdd, onRemove
  } = props

  const visible = categoryId === null
    ? products
    : products.filter(p => p.categoryId === categoryId)

  const special = products.filter(p =>
    offers.some(o => o.productId === p.id)
  )

  if (loadState.status === 'loading') {
    return <p>در حال دریافت اطلاعات...</p>
  }

  if (loadState.status === 'empty') {
    return <p>محصولی برای نمایش وجود ندارد.</p>
  }

  if (loadState.status === 'error') {
    return <p role="alert">خطا در دریافت اطلاعات: {loadState.message}</p>
  }

  if (loadState.status !== 'success') {
    return assertNever(loadState)
  }
  return (
    <>
      <CategoryNav
        categories={categories}
        activeCategoryId={categoryId}
        onPick={onPick}
      />
      <section className="wrap" id="best-selling">
        <h2 id="best-title">پیشنهاد ویژه</h2>
        <ProductGrid products={special} offers={offers} onAdd={onAdd} />
      </section>
      <Hero id="posters-2" home={home} />
      <section className="wrap" id="new-products">
        <h2 id="new-title">محصولات</h2>
        <ProductGrid products={visible} offers={offers} onAdd={onAdd} />
      </section>
      <CartPanel
        cart={cart}
        products={products}
        total={total}
        onRemove={onRemove}
      />
    </>
  )
}