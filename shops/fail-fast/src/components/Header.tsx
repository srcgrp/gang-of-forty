import type { ReactNode } from 'react'

interface HeaderProps {
  cartCount: number
}

export default function Header({ cartCount }: HeaderProps): ReactNode {
  return (
    <header>
      <div className="top-bar">
        <p>ارسال رایگان برای سفارش‌های بالای ۷۰۰ هزار تومان</p>
        <span>•</span>
        <p>تنها سوپرمارکت ۷/۲۴ در ایران</p>
      </div>
      <div className="header">
        <input type="checkbox" id="menu" className="menu-input" />
        <label htmlFor="menu" className="menu-btn" aria-label="منوی اصلی">
          <i></i>
          <i></i>
          <i></i>
        </label>
        <a href="#top" className="logo">
          <img
            src="./src/images/space-market-logo.svg"
            width="120"
            height="50"
            alt="اسپیس مارکت"
          />
          <div>
            <strong>اسپیس مارکت</strong>
            <small>هر روز و هر ساعت</small>
          </div>
        </a>
        <div className="search-box" role="search">
          <label htmlFor="search" className="visually-hidden">
            جستجو در اسپیس مارکت
          </label>
          <input
            id="search"
            type="search"
            placeholder="جستجو در اسپیس مارکت..."
          />
          <span className="search-icon" id="search-icon" aria-hidden="true"></span>
        </div>
        <a href="#cart" className="cart" aria-label="سبد خرید">
          <span className="cart-icon" id="cart-icon" aria-hidden="true"></span>
          <span>سبد خرید</span>
          <b aria-live="polite">{cartCount}</b>
        </a>
      </div>
    </header>
  )
}
