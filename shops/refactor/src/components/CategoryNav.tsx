import type { Category } from '../types'

type CategoryNavProps = {
  categories: Category[]
  activeId: number | null
  onPick: (id: number | null) => void
}

export default function CategoryNav({ categories, activeId, onPick }: CategoryNavProps) {
  return (
    <section className="cats container" id="categories" aria-labelledby="cats-title">
      <div className="section-head">
        <h2 className="section-title" id="cats-title">دسته‌بندی محصولات</h2>
      </div>
      <ul className="cat-list">
        {categories.map((category) => {
          const active = category.id === activeId
          return (
            <li key={category.id}>
              <a
                className="cat"
                href={`#${category.slug}`}
                aria-current={active ? 'true' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  onPick(active ? null : category.id)
                }}
              >
                <span className="cat-img" style={{ backgroundColor: category.color }} aria-hidden="true">
                  {category.emoji}
                </span>
                <strong>{category.name}</strong>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}