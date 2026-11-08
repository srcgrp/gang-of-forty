import type { Category } from '../types'

type CategoryNavProps = { categories: Category[]; onPick: (id: number) => void }

export default function CategoryNav({ categories , onPick}: CategoryNavProps) {
  return (
    <section className="cats container" id="categories" aria-labelledby="cats-title">
      <div className="section-head">
        <h2 className="section-title" id="cats-title">دسته‌بندی محصولات</h2>
      </div>
      <ul className="cat-list">
        {categories.map((category) => (
          <li key={category.id}>
            <a
              className="cat"
              href={`#${category.slug}`}
              onClick={(event) => {
                event.preventDefault()
                onPick(category.id)
              }}
            >
              <span className="cat-img" style={{ backgroundColor: category.color }} aria-hidden="true">
                {category.emoji}
              </span>
              <strong>{category.name}</strong>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
