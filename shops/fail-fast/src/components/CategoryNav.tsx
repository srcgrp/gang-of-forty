import type { ReactNode } from 'react'

export default function CategoryNav(): ReactNode {
  return (
    <nav aria-label="منوی اصلی">
      <div className="nav-inner">
        <div className="categories-menu">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            دسته‌بندی‌ها
          </button>
          <div className="categories-dropdown" role="menu">
            <a href="#dairy-products" role="menuitem">
              <span aria-hidden="true">🥛</span> لبنیات و تخم‌مرغ
            </a>
            <a href="#vegetables" role="menuitem">
              <span aria-hidden="true">🥬</span> میوه و سبزیجات
            </a>
            <a href="#bread" role="menuitem">
              <span aria-hidden="true">🍞</span> نان و غلات
            </a>
            <a href="#snacks" role="menuitem">
              <span aria-hidden="true">🍪</span> تنقلات و شیرینی
            </a>
            <a href="#drinks" role="menuitem">
              <span aria-hidden="true">🥤</span> نوشیدنی‌ها
            </a>
            <a href="#cosmetics" role="menuitem">
              <span aria-hidden="true">🧴</span> آرایشی و بهداشتی
            </a>
          </div>
        </div>
        <a href="#dailyOffers">پیشنهادهای امروز</a>
        <a href="#dairy-products">لبنیات</a>
        <a href="#snacks">تنقلات</a>
        <a href="#drinks">نوشیدنی</a>
      </div>
    </nav>
  )
}
