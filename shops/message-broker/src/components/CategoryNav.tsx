import { Link } from '@tanstack/react-router'
import type { Category } from '../types'

type CategoryNavProps = {
  categories: Category[]
  activeCategoryId: number | null
  onPick: (id: number | null) => void
}

export default function CategoryNav({
  categories,
  activeCategoryId,
  onPick
}: CategoryNavProps) {
  return (
    <nav
      className="categories"
      id="categories"
      aria-label="دسته‌بندی محصولات"
    >
      <button
        type="button"
        className={`category ${activeCategoryId === null ? 'active' : ''}`}
        onClick={() => onPick(null)}
      >
        همه محصولات
      </button>

      {categories.map(category => (
        <Link
          key={category.id}
          to="/plp/$carouselId"
          params={{ carouselId: category.slug }}
          className="category"
        >
          {category.emoji} {category.name}
        </Link>
      ))}
    </nav>
  )
}