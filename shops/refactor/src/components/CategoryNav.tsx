import type { Category } from '../types'

type CategoryNavProps = { categories: Category[] }

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <section className="cats container" id="categories" aria-labelledby="cats-title">
      <div className="section-head">
        <h2 className="section-title" id="cats-title">دسته‌بندی محصولات</h2>
      </div>
      <ul className="cat-list">
        {categories.map((category) => (
          <li key={category.id}>
            <a className="cat" href={`#${category.slug}`} data-category={category.slug}>
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
