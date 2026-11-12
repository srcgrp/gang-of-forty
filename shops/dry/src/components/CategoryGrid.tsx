import { categoriesOf, categoryCards } from '../features/products/catalog/sections.ts'
import type { LoadState } from '../shared/types.ts'

type CategoryGridProps = {
  state: LoadState
}

export default function CategoryGrid({ state }: CategoryGridProps) {
  const cards = categoryCards(categoriesOf(state))

  return (
    <section className="categories" id="categories">
      <h2>دسته‌بندی‌ها</h2>

      <div className="category-grid">
        {cards.map((c) => (
          <a className="category-card" href={`#${c.slug}`} key={c.slug}>
            {c.image ? (
              <img src={c.image} alt="" />
            ) : (
              <span className="category-emoji" aria-hidden="true">{c.emoji}</span>
            )}
            <h3>{c.name}</h3>
          </a>
        ))}
      </div>
    </section>
  )
}