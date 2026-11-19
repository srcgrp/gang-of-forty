import type { ReactNode } from 'react'
import type { Category } from '../../types'

interface NavProps {
  categories: Category[]
  selectedCategoryId: number | null
  onCategoryPick: (categoryId: number) => void
}

export default function Nav({
  categories,
  selectedCategoryId,
  onCategoryPick,
}: NavProps): ReactNode {
  return (
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
  )
}
