type CategoryLink = { id: number; href: string; tint: string; emoji: string; name: string }

const CATEGORIES: CategoryLink[] = [
  { id: 1, href: '#categories', tint: 't-red', emoji: '🍎', name: 'میوه و سبزی' },
  { id: 2, href: '#dairy', tint: 't-blue', emoji: '🥛', name: 'لبنیات' },
  { id: 3, href: '#categories', tint: 't-yellow', emoji: '🥖', name: 'نان و شیرینی' },
  { id: 4, href: '#categories', tint: 't-green', emoji: '🍚', name: 'خواربار' },
  { id: 5, href: '#categories', tint: 't-pink', emoji: '🧃', name: 'نوشیدنی' },
  { id: 6, href: '#categories', tint: 't-purple', emoji: '🍗', name: 'پروتئین' },
]

export default function CategoryNav() {
  return (
    <section className="section" id="categories" aria-labelledby="cats-title">
      <div className="section-head">
        <h2 className="section-title" id="cats-title">دسته‌بندی‌ها</h2>
      </div>
      <ul className="cat-grid">
        {CATEGORIES.map((c) => (
          <li key={c.id}>
            <a className="cat" href={c.href}>
              <span className={`cat-ico ${c.tint}`} aria-hidden="true">{c.emoji}</span>
              {c.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
