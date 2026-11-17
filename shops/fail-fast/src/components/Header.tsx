import type { ReactNode } from 'react'
import type { Category } from '../types'
import logoImg from '../images/space-market-logo.svg'

interface HeaderProps {
  cartCount: number
  categories: Category[]
  selectedCategoryId: number | null
  onCategoryPick: (categoryId: number) => void
}

export default function Header({
  cartCount,
  categories,
  selectedCategoryId,
  onCategoryPick,
}: HeaderProps): ReactNode {
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
            src={logoImg}
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
      <nav aria-label="منوی اصلی">
        <div className="nav-inner">
          <div className="categories-menu">
            <button
              type="button"
              className="active"
              aria-haspopup="true"
              aria-expanded="false"
            >
              دسته‌بندی‌ها
            </button>
            <div className="categories-dropdown" role="menu">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href="#categories"
                  role="menuitem"
                  onClick={() => onCategoryPick(category.id)}
                  style={{
                    fontWeight: selectedCategoryId === category.id ? 'bold' : 'normal',
                  }}
                >
                  <span aria-hidden="true">{category.emoji}</span> {category.name}
                </a>
              ))}
            </div>
          </div>
          <a href="#categories">پیشنهادهای امروز</a>
          <a href="#categories">تخفیفدار ها</a>
          <a href="#categories">لبنیات</a>
          <a href="#categories">تنقلات</a>
          <a href="#categories">نوشیدنی</a>
          <a href="#categories">آرایشی و بهداشتی</a>
          <a href="#footer">دربارهی ما</a>
        </div>
      </nav>
    </header>
  )
}
