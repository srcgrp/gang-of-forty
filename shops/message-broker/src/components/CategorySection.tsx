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
      <button
        type="button"
        className={activeCategoryId === null ? 'active' : ''}
        onClick={() => onPick(null)}
      >
        همه محصولات
      </button>

      {categories.map(category => (
        <button
          key={category.id}
          type="button"
          className={activeCategoryId === category.id ? 'active' : ''}
          onClick={() => onPick(category.id)}
        >
          {category.emoji} {category.name}
        </button>
      ))}
    </nav>
  )
}
