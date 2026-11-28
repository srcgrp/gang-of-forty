
import { useNavigate } from '@tanstack/react-router'
import { cartLines, cartTotal } from '../../features/cart/calculate'
import { useCartStore } from '../../hooks/useCartStore'
import { useCatalog } from '../../hooks/useCatalog'
import CheckoutHeader from '../checkout/CheckoutHeader'
import CheckoutForm from '../CheckoutForm'
import Status from '../Status'
import CheckoutSummary from '../checkout/CheckoutSummary'
import CheckoutEmpty from '../checkout/CheckoutEmpty'

export default function CheckoutPage() {
  const { state, retry } = useCatalog()
  const items = useCartStore((s) => s.items)
  const clear = useCartStore((s) => s.clear)
  const navigate = useNavigate()

  if (state.status !== 'success') {
    return <Status state={state} onRetry={retry} />
  }

  const lines = cartLines(items, state.data.products)
  const total = cartTotal(lines)
  const shop = state.data.shop
  const delivery = total === 0 || total >= shop.freeDeliveryOver
    ? 0
    : shop.deliveryFee

  if (!lines.length) {
    return <CheckoutEmpty />
  }

  const onSuccess = () => {
    clear()
    navigate({
      to: '/',
      search: { q: '', category: undefined },
      replace: true,
    })
  }

  return (
    <main id="content" tabIndex={-1} className="container co">
      <CheckoutHeader />

      <div className="co-layout">
        <section className="co-main" aria-label="فرم تسویه حساب">
          <div className="co-card">
            <div className="co-card__head">
              <span className="co-step">۱</span>
              <h2 className="co-card__title">اطلاعات ارسال</h2>
            </div>
            <CheckoutForm onSuccess={onSuccess} />
          </div>
        </section>

        <CheckoutSummary
          count={lines.length}
          total={total}
          delivery={delivery}
          remaining={Math.max(0, shop.freeDeliveryOver - total)}
        />
      </div>
    </main>
  )
}