
import SearchBox from './SearchBox'

type HeaderProps = {
  cartCount: number
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function Header({
  cartCount,
  searchTerm,
  onSearchChange,
}: HeaderProps) {
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
      </div>
    </header>
  )
}
