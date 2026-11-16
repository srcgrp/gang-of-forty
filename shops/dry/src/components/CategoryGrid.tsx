import { categoriesOf, categoryCards } from '../features/products/catalog/sections.ts'
import type { LoadState } from '../shared/types.ts'
import { Link } from '@tanstack/react-router'

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
          <Link className="category-card" to="/plp/$carouselId" params={{ carouselId: c.slug }} key={c.slug}>
            {c.image ? (
              <img src={c.image} alt="" />
            ) : (
              <span className="category-emoji" aria-hidden="true">{c.emoji}</span>
            )}
            <h3>{c.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}