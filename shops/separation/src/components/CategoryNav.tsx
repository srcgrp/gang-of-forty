import type { Category } from '../types.ts'

export type CategoryNavProps = {
  categories: Category[]
  activeId: number | null
  onPick: (id: number | null) => void
}

export default function CategoryNav({ categories, activeId, onPick }: CategoryNavProps) {
  return (
    <section id="categories" className="section">
      <h2>دسته‌بندی‌ها</h2>
      <div className="cat-list">
        <a href="#offers" className={activeId === null ? 'cat active' : 'cat'} onClick={() => onPick(null)}>
          <span className="emoji">🧺</span>
          <span>همه</span>
        </a>
        {categories.map((c) => (
          <a
            key={c.id}
            href="#offers"
            className={c.id === activeId ? 'cat active' : 'cat'}
            onClick={() => onPick(c.id)}
          >
            <span className="emoji">{c.emoji}</span>
            <span>{c.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
