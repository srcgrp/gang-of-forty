
import type { Category } from '../types'

type CategorySectionProps = {
  categories: Category[]
  activeCategoryId: number | null
  onPick: (id: number | null) => void
}

export default function CategorySection({
  categories,
  activeCategoryId,
  onPick
}: CategorySectionProps) {
  return (
    <nav
      className="categories"
      id="categories"
      aria-label="دسته‌بندی محصولات"
    >
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              onClick={() => onPick(category.id)}
              aria-pressed={activeCategoryId === category.id}
              style={{ backgroundColor: category.color }}
            >
              <span aria-hidden="true">{category.emoji}</span>
              <span>{category.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
