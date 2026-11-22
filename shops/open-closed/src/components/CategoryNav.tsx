type CategoryLink = { id: number; href: string; tint: string; emoji: string; name: string }

const CATEGORIES: CategoryLink[] = [
  { id: 1, href: '#dairy', tint: 't-red', emoji: '🍎', name: 'میوه و سبزی' },
  { id: 2, href: '#dairy', tint: 't-blue', emoji: '🥛', name: 'لبنیات' },
  { id: 3, href: '#dairy', tint: 't-yellow', emoji: '🥖', name: 'نان و شیرینی' },
  { id: 4, href: '#dairy', tint: 't-green', emoji: '🍚', name: 'خواربار' },
  { id: 5, href: '#dairy', tint: 't-pink', emoji: '🧃', name: 'نوشیدنی' },
  { id: 6, href: '#dairy', tint: 't-purple', emoji: '🍗', name: 'پروتئین' },
]

type CategoryNavProps = {
  categoryId: number | null
  onPick: (id: number | null) => void
}

export default function CategoryNav({ categoryId, onPick }: CategoryNavProps) {
  return (
    <section className="section" id="categories" aria-labelledby="cats-title">
      <div className="section-head">
        <h2 className="section-title" id="cats-title">دسته‌بندی‌ها</h2>
        {categoryId !== null && (
          <button className="btn" type="button" onClick={() => onPick(null)}>
            نمایش همه
          </button>
        )}
      </div>
      <ul className="cat-grid">
        {CATEGORIES.map((c) => (
          <li key={c.id}>
            <a
              className={c.id === categoryId ? 'cat is-active' : 'cat'}
              href={c.href}
              aria-current={c.id === categoryId ? 'true' : undefined}
              onClick={() => onPick(c.id)}
            >
              <span className={`cat-ico ${c.tint}`} aria-hidden="true">{c.emoji}</span>
              {c.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
