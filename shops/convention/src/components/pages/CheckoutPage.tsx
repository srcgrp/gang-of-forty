import { Link } from '@tanstack/react-router'
import { useCartStore } from '../../hooks/useCartStore'
import { useCatalog } from '../../hooks/useCatalog'
import CatalogStatus from '../CatalogStatus'
import CheckoutForm from '../CheckoutForm'
import CartPanel from '../CartPanel'

export default function CheckoutPage() {
  const lines = useCartStore((state) => state.lines)
  const state = useCatalog()
  if (!lines.length) return <section><h1>تسویه حساب</h1><p>سبد خرید شما خالی است.</p><Link to="/">بازگشت به فروشگاه</Link></section>
  if (state.status !== 'success') return <CatalogStatus state={state} retry={state.retry} />
  return <section><h1>تسویه حساب</h1>
    <CartPanel />
    <CheckoutForm />
  </section>
}
