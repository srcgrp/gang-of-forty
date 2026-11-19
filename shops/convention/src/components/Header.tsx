
import { useCartStore } from '../hooks/useCartStore'
import { getCartCount } from '../cart/cart'
import SearchBox from './SearchBox'
import ThemeToggle from './ThemeToggle'

type HeaderProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function Header({
  searchTerm,
  onSearchChange,
}: HeaderProps) {
  const cartCount = useCartStore((state) => getCartCount(state.lines))
  return (
    <header className="site-header">
      <div className="container header-content">
        <a href="/" className="logo">
          <span className="logo-icon">🛒</span>
          <span>Convention</span>
        </a>

        <div className="search-box">
          <label htmlFor="search">جستجوی محصولات</label>

          <SearchBox
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>

        <a href="#cart" className="cart-link">
          🛍️ سبد خرید ({cartCount})
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}
