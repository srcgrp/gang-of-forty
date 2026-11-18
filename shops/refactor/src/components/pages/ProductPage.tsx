import { Link, useParams } from '@tanstack/react-router'
import { useCartStore } from '../../hooks/useCartStore'
import { useCatalog } from '../../hooks/useCatalog'
import { formatNumber } from '../format'
import Icon from '../Icon'
import OfferBadge from '../OfferBadge'
import Price from '../Price'
import Status from '../Status'

export default function ProductPage() {
  const { state, retry } = useCatalog()
  const { productId } = useParams({from: '/product/$productId' })
  const add = useCartStore((s) => s.add)

  if (state.status !== 'success') {
    return <Status state={state} onRetry={retry} />
  }

  const id = Number(productId)
  const product = Number.isFinite(id)
    ? state.data.products.find((entry) => entry.id === id)
    : undefined

  if (!product) {
    return (
      <main id="content" tabIndex={-1} className="container">
        <h1 className="section-title">محصول پیدا نشد</h1>
        <p className="empty-message">کالایی با شناسهٔ «{productId}» در فروشگاه نیست؛ از صفحهٔ اصلی یکی را انتخاب کن.</p>
        <Link className="sale-show-btn" to="/" search={{ q: '', category: undefined }}>بازگشت به خانه</Link>
      </main>
    )
  }

  const inStock = product.stock > 0
  const discounted = product.percent > 0

  return (
    <main id="content" tabIndex={-1} className="container">
      <div className="section-head">
        <h1 className="section-title">
          <span aria-hidden="true">{product.emoji}</span> {product.name}
        </h1>
        <Link className="sale-show-btn" to="/" search={{ q: '', category: undefined }}>بازگشت به خانه</Link>
      </div>
      <article className={`product-page${inStock ? '' : ' product-page--out'}`}>
        <div className="product-media">
          <span className="card-emoji" aria-hidden="true">{product.emoji}</span>
          {discounted && <OfferBadge percent={product.percent} />}
          {!inStock && <span className="chip-out">ناموجود</span>}
        </div>
        <div className="product-info">
          <p className="card-weight">واحد: {product.unit}</p>
          <Price price={product.price} originalPrice={product.originalPrice} discounted={discounted} />
          <p className="product-stock">
            {inStock ? `${formatNumber(product.stock)} عدد در انبار موجود است` : 'فعلاً ناموجود است'}
          </p>
          <button type="button" className="btn" disabled={!inStock}
            aria-label={`افزودن ${product.name} به سبد خرید`}
            onClick={() => add(product.id)}>
            <Icon name="cart" /> افزودن به سبد
          </button>
        </div>
      </article>
    </main>
  )
}
