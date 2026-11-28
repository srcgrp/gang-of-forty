import { Link } from '@tanstack/react-router'
import { useCartStore } from '../hooks/useCartStore'
import { useSearchStore } from '../hooks/useSearchStore'
import { getCartCount } from '../cart/cart'
import ThemeToggle from './ThemeToggle'
import HeaderSearch from './HeaderSearch'
import StoreNav from './StoreNav'

export default function Header() {
  const count = useCartStore((state) => getCartCount(state.lines))
  const setQuery = useSearchStore((state) => state.setQuery)
  return <header className="site-header">
    <div className="container header-content">
      <Link to="/" className="logo" aria-label="Convention - صفحه اصلی" onClick={() => setQuery('')}>
        <span className="logo-icon" aria-hidden="true">🛒</span><span>Convention</span>
      </Link>
      <HeaderSearch />
      <Link to="/checkout" className="cart-link" aria-live="polite">🛍️ سبد خرید ({count.toLocaleString('fa-IR')})</Link>
      <ThemeToggle />
    </div>
    <StoreNav />
  </header>
}
