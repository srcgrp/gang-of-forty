import type { Category } from '../types.ts'

export type CategoryNavProps = {
  categories: Category[]
  activeSlug: string | undefined
  onPick: (slug: string | undefined) => void
}

export default function CategoryNav({ categories, activeSlug, onPick }: CategoryNavProps) {
  return (
    <section id="categories" className="section">
      <h2>دسته‌بندی‌ها</h2>
      <div className="cat-list">
        <a href="#offers" className={activeSlug === undefined ? 'cat active' : 'cat'} onClick={() => onPick(undefined)}>
          <span className="emoji">🧺</span>
          <span>همه</span>
        </a>
        {categories.map((c) => (
          <a
            key={c.id}
            href="#offers"
            className={c.slug === activeSlug ? 'cat active' : 'cat'}
            onClick={() => onPick(c.slug)}
          >
            <span className="emoji">{c.emoji}</span>
            <span>{c.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
