import { Link, useParams } from '@tanstack/react-router'
import { cardById } from '../../features/products/catalog/product.ts'
import { showToast } from '../../features/toast/toastStore.ts'
import { useCartStore } from '../../hooks/useCartStore.ts'
import { useCatalog } from '../../hooks/useCatalog.ts'
import { useFavorites } from '../../hooks/useFavorites.ts'
import Status from '../Status.tsx'

export default function ProductPage() {
  const { productId } = useParams({ from: '/product/$productId' })
  const { state, retry } = useCatalog()
  const add = useCartStore((s) => s.add)
  const { favorites, toggle } = useFavorites()
  if (state.status !== 'success') return <Status state={state} onRetry={retry} />

  const card = cardById(state, Number(productId))
  if (card === null) {
    return (
      <section className="plp">
        <p className="status">محصول پیدا نشد.</p>
        <Link className="back-link" to="/">بازگشت به صفحه اصلی</Link>
      </section>
    )
  }

  const liked = favorites.includes(card.id)

  return (
    <section className="plp">
      <Link className="back-link" to="/">← بازگشت به صفحه اصلی</Link>
      <article className="product-detail">
        <div className="product-detail-media">
          {card.image ? <img src={card.image} alt="" /> : <span aria-hidden="true">{card.emoji}</span>}
        </div>
        <div className="product-detail-info">
          <h1>{card.title}</h1>
          <p>{card.unit}</p>
          <p className="price">{card.price}</p>
          <div className="detail-actions">
            <button
              type="button"
              className="detail-add"
              disabled={!card.inStock}
              onClick={() => {
                add(card.id)
                showToast(`${card.title} به سبد اضافه شد`)
              }}
            >
              {card.inStock ? 'افزودن به سبد' : 'ناموجود'}
            </button>
            <button
              type="button"
              className="detail-fav"
              aria-pressed={liked}
              onClick={() => {
                toggle(card.id)
                showToast(liked
                  ? `${card.title} از علاقه‌مندی‌ها حذف شد`
                  : `${card.title} به علاقه‌مندی‌ها اضافه شد`)
              }}
            >
              {liked ? '♥ حذف از علاقه‌مندی‌ها' : '♡ افزودن به علاقه‌مندی‌ها'}
            </button>
          </div>
        </div>
      </article>
    </section>
  )
}