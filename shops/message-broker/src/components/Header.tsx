 
import type { Category, Shop } from '../types'
 

type HeaderProps = {
  itemCount: number
  categories: Category[]
  shop: Shop | null
}

export default function Header({ itemCount, categories, shop }: HeaderProps) {
  return (
    <header className="site-header" id="top">
      <a className="skip" href="#main">پرش به محتوای اصلی</a>
      <div className="top-bar">
        <p id="notice">{shop?.notice}</p>
      </div>

      <input type="checkbox" id="menu-toggle" aria-label="باز و بسته کردن منو" />

      <div className="bar">
        <a href="#top" className="logo" aria-label="بازگشت به ابتدای صفحه">
        
          <span className="logo-text">
            <strong>سوپرمارکت نمونه</strong>
            <small>تازه، نزدیک، به‌صرفه</small>
          </span>
        </a>

        <form className="search" role="search" action="#">
          <input type="search" placeholder="جستجو در میان هزاران کالا" aria-label="جستجوی محصولات" />
          <button type="submit" aria-label="جستجو">🔍</button>
        </form>

        <button className="cart" type="button" aria-label="سبد خرید">
          🛍️ سبد خرید <b id="cart-count">{itemCount.toLocaleString('fa-IR')}</b>
        </button>
        <label htmlFor="menu-toggle" className="burger" aria-hidden="true">☰</label>
      </div>

      <nav className="nav" aria-label="منوی اصلی">
        <ul className="menu" id="main-menu">
          <li className="has-sub">
            <a href="#categories">همه دسته‌ها ▾</a>
            <ul className="submenu" id="submenu">
              {categories.map(category => (
                <li key={category.id}>
                  <a href="#categories">{category.emoji} {category.name}</a>
                </li>
              ))}
            </ul>
          </li>
          {shop?.menu.map(item => (
            <li key={item.href}><a href={item.href}>{item.label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
