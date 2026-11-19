import { Link } from '@tanstack/react-router'
import { useCartStore } from '../../hooks/useCartStore'
import { useCatalog } from '../../hooks/useCatalog'
import CatalogStatus from '../CatalogStatus'
import CheckoutForm from '../CheckoutForm'

export default function CheckoutPage() {
  const lines = useCartStore((state) => state.lines)
  const state = useCatalog()
  if (!lines.length) return <section><h1>تسویه حساب</h1><p>سبد خرید شما خالی است.</p><Link to="/">بازگشت به فروشگاه</Link></section>
  if (state.status !== 'success') return <CatalogStatus state={state} retry={state.retry} />
  const total = lines.reduce((sum, line) => sum + (state.data.products.find((product) => product.id === line.productId)?.price ?? 0) * line.quantity, 0)
  return <section><h1>تسویه حساب</h1>
    <p>مجموع سفارش: {total.toLocaleString('fa-IR')} تومان</p>
    <CheckoutForm />
  </section>
}
