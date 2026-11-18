import { Link, useNavigate } from '@tanstack/react-router'
import { cartLines, cartTotal } from '../../features/cart/calculate'
import { useCartStore } from '../../hooks/useCartStore'
import { useCatalog } from '../../hooks/useCatalog'
import { formatNumber } from '../format'
import CheckoutForm from '../CheckoutForm'
import Status from '../Status'

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
  const delivery = total === 0 || total >= shop.freeDeliveryOver ? 0 : shop.deliveryFee

  if (lines.length === 0) {
    return (
      <main id="content" tabIndex={-1} className="container">
        <h1 className="section-title">سبد خرید خالی است</h1>
        <p className="empty-message">برای تسویه، اول از فهرست کالاها چیزی به سبد اضافه کن.</p>
        <Link className="sale-show-btn" to="/" search={{ q: '', category: undefined }}>بازگشت به خانه</Link>
      </main>
    )
  }

  const onSuccess = () => {
    clear()
    navigate({ to: '/', search: { q: '', category: undefined }, replace: true })
  }

  return (
    <main id="content" tabIndex={-1} className="container">
      <div className="section-head">
        <h1 className="section-title">تسویه حساب</h1>
        <Link className="sale-show-btn" to="/" search={{ q: '', category: undefined }}>بازگشت به خانه</Link>
      </div>
      <p className="checkout-summary">
        {formatNumber(lines.length)} کالا · جمع سبد: <strong>{formatNumber(total)} تومان</strong>
        {' · '}هزینهٔ ارسال: {delivery === 0 ? 'رایگان' : `${formatNumber(delivery)} تومان`}
      </p>
      <CheckoutForm onSuccess={onSuccess} />
    </main>
  )
}
