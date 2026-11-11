import type { ReactNode } from 'react'

export default function Header(): ReactNode {
  return (
    <header>
      <div className="top-bar">
        <p>ارسال رایگان برای سفارش‌های بالای ۷۰۰ هزار تومان</p>
        <span>•</span>
        <p>تنها سوپرمارکت ۷/۲۴ در ایران</p>
      </div>
      <div className="header">
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
        </div>
        <a href="#cart" className="cart" aria-label="سبد خرید">
          <span>سبد خرید</span>
          <b id="cart-count" aria-live="polite">0</b>
        </a>
      </div>
    </header>
  )
}
