import type { Category } from '../types.ts'

type CategoryNavProps = {
  categories: Category[]
  activeId: number | null
}

export default function CategoryNav({ categories, activeId }: CategoryNavProps) {
  return (
    <section id="categories" className="section">
      <h2>دسته‌بندی‌ها</h2>
      <div className="cat-list">
        <a href="#offers" className={activeId === null ? 'cat active' : 'cat'}>
          <span className="emoji">🧺</span>
          <span>همه</span>
        </a>
        {categories.map((c) => (
          <a key={c.id} href="#offers" className={c.id === activeId ? 'cat active' : 'cat'}>
            <span className="emoji">{c.emoji}</span>
            <span>{c.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
