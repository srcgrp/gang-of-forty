
type HeaderProps = {
  cartCount: number
}

export default function Header({ cartCount }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container header-content">
        <a href="/" className="logo">
          <span className="logo-icon">🛒</span>
          <span>Convention</span>
        </a>

        <div className="search-box">
          <label htmlFor="search">جستجوی محصولات</label>
          <input
            id="search"
            type="search"
            placeholder="جستجوی محصولات..."
          />
          <button type="button">جستجو</button>
        </div>

        <a href="#cart" className="cart-link">
          🛍️ سبد خرید ({cartCount})
        </a>
      </div>
    </header>
  )
}
