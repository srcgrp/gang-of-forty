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
        <button
          key={category.id}
          type="button"
          className={`category ${activeCategoryId === category.id ? 'active' : ''}`}
          onClick={() => {
          console.log('دسته انتخاب‌شده:', category.id, category.name)
          onPick(category.id)
          }}
        >
          {category.emoji} {category.name}
        </button>
      ))}
    </nav>
  )
}
