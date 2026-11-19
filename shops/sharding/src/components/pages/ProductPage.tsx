import { Link, useParams } from '@tanstack/react-router'
import { cardOf } from '../../features/products/logic/to-card'
import { useCartStore } from '../../hooks/useCartStore'
import { useCatalog } from '../../hooks/useCatalog'
import Price from '../Price'
import ProductImage from '../ProductImage'
import ProductQuantity from '../ProductQuantity'
import ProductSkeleton from '../ProductSkeleton'
import ProductStatus from '../ProductStatus'

export default function ProductPage() {
  const { productId } = useParams({ from: '/product/$productId' })
  const id = Number(productId)
  const state = useCatalog()
  const qty = useCartStore((cart) => cart.lines[id] ?? 0)
  const add = useCartStore((cart) => cart.add)
  const remove = useCartStore((cart) => cart.remove)

  if (state.status === 'loading') return <ProductSkeleton />
  if (state.status === 'error') {
    return <ProductStatus variant="error" title="بارگذاری محصول ناموفق بود" text={state.message} onRetry={state.retry} />
  }

  const product = state.data.products.find((item) => item.id === id)
  if (!product) {
    return <ProductStatus variant="empty" title="محصول پیدا نشد" text="این محصول در فهرست فروشگاه وجود ندارد." />
  }

  const card = cardOf(product, state.data)
  const addOne = () => add(card.id, card.stockQty)

  return (
    <section className="product-shelf" aria-labelledby="product-title">
      <div className="container">
        <div className="product-shelf__inner">
          <div className="product-shelf__main product-details">
            <ProductImage card={card} loading="eager" />
            <div className="product-details__info">
              <h1 id="product-title">{card.name}</h1>
              <p>واحد فروش {card.unit}</p>
              <Price value={card.price} {...(card.oldPrice !== undefined ? { oldValue: card.oldPrice } : {})} />
              {qty > 0 ? (
                <ProductQuantity
                  name={card.name}
                  quantity={qty}
                  max={card.stockQty}
                  onAdd={addOne}
                  onRemove={() => remove(card.id, card.name)}
                />
              ) : (
                <button type="button" className="product-details__add" onClick={addOne} disabled={!card.inStock}>
                  افزودن به سبد
                </button>
              )}
              <Link to="/" search={true} className="catalog-link">
                <svg width="16" height="16" fill="currentColor" aria-hidden="true">
                  <use href="./icons.svg#arrowForward" />
                </svg>
                بازگشت به خانه
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
