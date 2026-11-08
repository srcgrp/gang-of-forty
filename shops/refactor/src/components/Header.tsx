import type { Category, ShopInfo } from '../types'
import Icon from './Icon'
import Logo from './Logo'
import MainNav from './MainNav'
import { formatNumber } from './format'

type HeaderProps = {
  shop: Pick<ShopInfo, 'notice' | 'slogan' | 'phone' | 'menu'>
  categories: Category[]
  cartCount: number
  productCount: number
}

export default function Header({ shop, categories, cartCount, productCount }: HeaderProps) {
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
          <span className="icon-btn" id="cart-count" role="img" aria-label={`سبد خرید، ${count} کالا`}>
            <Icon name="cart" /><span className="badge cart-badge" aria-hidden="true">{count}</span>
          </span>
          <label htmlFor="nav-toggle" className="nav-toggle-btn">
            <span className="sr-only">منو</span>
            <Icon name="menu" className="icon-open" /><Icon name="close" className="icon-close" />
          </label>
        </div>
        <div className="search" role="search">
          <form id="search-form" action="." method="get">
            <div className="search-box">
              <label className="sr-only" htmlFor="q">جستجو در محصولات</label>
              <input id="q" type="search" name="q" autoComplete="off"
                placeholder={`جستجو در میان ${formatNumber(productCount)} کالا…`} />
              <button className="search-btn" type="submit" aria-label="جستجو"><Icon name="search" /></button>
            </div>
          </form>
        </div>
      </div>
      <MainNav menu={shop.menu} categories={categories} phone={shop.phone} />
    </header>
  )
}
