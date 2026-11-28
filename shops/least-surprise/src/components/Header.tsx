import { useThemeStore } from '../hooks/useThemeStore'
import { useCartStore } from '../hooks/useCartStore'
import { Link } from '@tanstack/react-router'

export default function Header() {
  const theme = useThemeStore((state) => state.theme)
  const toggle = useThemeStore((state) => state.toggle)
  const totalCount = useCartStore((state) => state.totalCount())

  return (
    <header className="shop-header">
      <h1>سوپرمارکت Least Surprise</h1>
      <div>
        <button onClick={toggle} type="button" aria-label="تغییر تم">
          {theme === 'light' ? '🌙 تم تاریک' : '☀️ تم روشن'}
        </button>
        <Link to="/checkout">تسویه‌حساب</Link>
        <div className="cart-badge">
          سبد خرید: {totalCount} کالا
        </div>
      </div>
    </header>
  )
}