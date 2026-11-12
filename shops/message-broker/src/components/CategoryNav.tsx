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
    <nav className="nav" aria-label="منوی اصلی">
      <ul className="menu" id="main-menu">
        <li>
          <button
            type="button"
            onClick={() => onPick(null)}
            aria-pressed={activeCategoryId === null}
          >
            همه دسته‌ها
          </button>
        </li>

        {categories.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              onClick={() => onPick(category.id)}
              aria-pressed={activeCategoryId === category.id}
            >
              {category.emoji} {category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}