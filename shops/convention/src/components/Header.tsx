import { Link } from '@tanstack/react-router'
import { useCartStore } from '../hooks/useCartStore'
import { getCartCount } from '../cart/cart'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const count = useCartStore((state) => getCartCount(state.lines))
  return <header className="site-header">
    <nav className="container header-content" aria-label="ناوبری اصلی">
      <Link to="/" className="logo">🛒 Convention</Link>
      <Link to="/">خانه</Link>
      <Link to="/checkout" className="cart-link" aria-live="polite">🛍️ سبد خرید ({count.toLocaleString('fa-IR')})</Link>
      <ThemeToggle />
    </nav>
  </header>
}
