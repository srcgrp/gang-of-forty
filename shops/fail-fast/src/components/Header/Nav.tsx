import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
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
            aria-haspopup="true"
            aria-expanded="false"
          >
            دسته‌بندی‌ها
          </button>
          <div className="categories-dropdown" role="menu">
            {categories.map((category) => (
              <Link
                key={category.id}
                to="/"
                hash="categories"
                className="nav-link"
                role="menuitem"
                onClick={() => onCategoryPick(category.id)}
                style={{
                  fontWeight: selectedCategoryId === category.id ? 'bold' : 'normal',
                }}
              >
                <span aria-hidden="true">{category.emoji}</span> {category.name}
              </Link>
            ))}
          </div>
        </div>
        <Link className="nav-link" to="/" hash="categories">پیشنهادهای امروز</Link>
        <Link className="nav-link" to="/" hash="categories">تخفیفدار ها</Link>
        <Link className="nav-link" to="/" hash="categories">لبنیات</Link>
        <Link className="nav-link" to="/" hash="categories">تنقلات</Link>
        <Link className="nav-link" to="/" hash="categories">نوشیدنی</Link>
        <Link className="nav-link" to="/" hash="categories">آرایشی و بهداشتی</Link>
        <Link className="nav-link" to="." hash="footer">دربارهی ما</Link>
      </div>
    </nav>
  )
}
