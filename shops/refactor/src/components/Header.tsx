
import type { Category, ShopInfo } from '../types'
import Icon from './Icon'
import Logo from './Logo'
import MainNav from './MainNav'
import SearchBox from './SearchBox'
import ThemeToggle from './ThemeToggle'
import { formatNumber } from './format'
import { cartCount } from '../features/cart/calculate'
import { useCartStore } from '../hooks/useCartStore'
import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'

type HeaderProps = {
  shop: Pick<ShopInfo, 'name' | 'notice' | 'slogan' | 'phone' | 'menu'>
  categories: Category[]
  query: string
  onQuery: (value: string) => void
  onOpenCart: () => void
  onPickCategory: (id: number | null) => void
}

export default function Header({ shop, categories, query, onQuery,
  onOpenCart, onPickCategory }: HeaderProps) {
  const count = formatNumber(useCartStore((s) => cartCount(s.items)))

   useEffect(() => {
    document.title = `${shop.name} · 🛒 ${count}`
  }, [shop.name, count])
  return (
   <header className="site-header">
      <div className="promo"><p id="shop-notice">{shop.notice}</p></div>
      <input type="checkbox" id="nav-toggle" className="nav-toggle sr-only"
        aria-label="باز و بسته کردن منو" aria-controls="main-nav" />
      <div className="header-top container">
        <a className="brand" href="#top" aria-label="ریفکتور؛ بازگشت به ابتدای صفحه">
          <Logo /><span id="shop-slogan" className="shop-slogan">{shop.slogan}</span>
        </a>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="icon-btn checkout-link" to="/checkout" aria-label="رفتن به صفحهٔ تسویه حساب">
            <Icon name="check" />
          </Link>
          <button type="button" className="icon-btn cart-toggle-btn" id="cart-count"
            onClick={onOpenCart} aria-label={`باز کردن سبد خرید، ${count} کالا`}>
            <Icon name="cart" /><span className="badge cart-badge" aria-hidden="true">{count}</span>
          </button>
          <label htmlFor="nav-toggle" className="nav-toggle-btn">
            <span className="sr-only">منو</span>
            <Icon name="menu" className="icon-open" /><Icon name="close" className="icon-close" />
          </label>
        </div>
        <SearchBox query={query} onQuery={onQuery} />
      </div>
      <MainNav menu={shop.menu} categories={categories} phone={shop.phone}
        onPickCategory={onPickCategory} />
    </header>
  )
}