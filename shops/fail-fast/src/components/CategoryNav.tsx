import type { ReactNode } from 'react'
import type { Category } from '../types'

interface CategoryNavProps {
  categories: Category[]
  selectedCategoryId: number | null
  onPick: (categoryId: number) => void
}

export default function CategoryNav({
  categories,
  selectedCategoryId,
  onPick,
}: CategoryNavProps): ReactNode {
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
              <a
                key={category.id}
                href={`#${category.slug}`}
                role="menuitem"
                onClick={() => onPick(category.id)}
                style={{
                  fontWeight: selectedCategoryId === category.id ? 'bold' : 'normal',
                }}
              >
                <span aria-hidden="true">{category.emoji}</span> {category.name}
              </a>
            ))}
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
