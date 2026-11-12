import type { Category, ShopInfo } from '../types'
import Icon from './Icon'
import Logo from './Logo'
import MainNav from './MainNav'
import SearchBox from './SearchBox'
import { formatNumber } from './format'

type HeaderProps = {
  shop: Pick<ShopInfo, 'notice' | 'slogan' | 'phone' | 'menu'>
  categories: Category[]
  cartCount: number
  productCount: number
  query: string
  onQuery: (value: string) => void
  onOpenCart: () => void
}

export default function Header({ shop, categories, cartCount, query, onQuery, onOpenCart }: HeaderProps) {
  const count = formatNumber(cartCount)
  return (
    <header className="site-header">
      <div className="promo"><p id="shop-notice">{shop.notice}</p></div>
      <input type="checkbox" id="nav-toggle" className="nav-toggle sr-only"
        aria-label="باز و بسته کردن منو" aria-controls="main-nav" />
      <div className="header-top container">
        <a className="brand" href="#top" aria-label="ریفکتور؛ بازگشت به ابتدای صفحه">
          <Logo />
          <span id="shop-slogan" className="shop-slogan">{shop.slogan}</span>
        </a>
        <div className="header-actions">
             <button
            type="button"
            className="icon-btn cart-toggle-btn"
            id="cart-count"
            onClick={onOpenCart}
            aria-label={`باز کردن سبد خرید، ${count} کالا`}
          >
            <Icon name="cart" />
            <span className="badge cart-badge" aria-hidden="true">{count}</span>
          </button>
          
          <label htmlFor="nav-toggle" className="nav-toggle-btn">
            <span className="sr-only">منو</span>
            <Icon name="menu" className="icon-open" /><Icon name="close" className="icon-close" />
          </label>
        </div>
         <SearchBox query={query} onQuery={onQuery} />
      </div>
      <MainNav menu={shop.menu} categories={categories} phone={shop.phone} />
    </header>
  )
}