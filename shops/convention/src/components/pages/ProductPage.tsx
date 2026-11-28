import { Link, useParams } from '@tanstack/react-router'
import { useCatalog } from '../../hooks/useCatalog'
import { useCartStore } from '../../hooks/useCartStore'
import CatalogStatus from '../CatalogStatus'
import ProductCard from '../ProductCard'

export default function ProductPage() {
  const { productId } = useParams({ from: '/product/$productId' })
  const state = useCatalog()
  const add = useCartStore((store) => store.add)
  if (state.status !== 'success') return <CatalogStatus state={state} retry={state.retry} />
  const id = Number(productId)
  const product = Number.isSafeInteger(id) && id > 0
    ? state.data.products.find((item) => item.id === id) : undefined
  return <section>
    <Link to="/">بازگشت به خانه</Link>
    {product ? <>
      <h1>{product.name}</h1><p className="detail-emoji" aria-hidden="true">{product.emoji}</p>
      <p>واحد: {product.unit}</p><p>{product.price.toLocaleString('fa-IR')} تومان</p>
      <button type="button" className="add-to-cart-btn" onClick={() => add(product.id)}>افزودن به سبد خرید</button>
      <h2>محصولات مرتبط</h2>
      <div className="product-grid">{state.data.products.filter((item) => item.categoryId === product.categoryId && item.id !== product.id)
        .slice(0, 4).map((item) => <ProductCard key={item.id} product={item} />)}</div>
    </> : <h1>محصول پیدا نشد</h1>}
  </section>
}
