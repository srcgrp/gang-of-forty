import type { Category } from '../shared/types.ts'

type NavCategory = Pick<Category, 'id' | 'name'>

const CATEGORIES: NavCategory[] = [
  { id: 1, name: 'میوه و سبزی' },
  { id: 2, name: 'لبنیات' },
  { id: 3, name: 'نان و شیرینی' },
  { id: 4, name: 'مواد غذایی' },
  { id: 5, name: 'نوشیدنی' },
]

type CategoryNavProps = {
  selected: number | null
  onPick: (id: number | null) => void
}

export default function CategoryNav({ selected, onPick }: CategoryNavProps) {
  return (
    <nav className="category-nav" aria-label="دسته‌بندی محصولات">
      <a
        href="#products"
        aria-current={selected === null ? 'true' : undefined}
        onClick={() => onPick(null)}
      >
        همه
      </a>
      {CATEGORIES.map((c) => (
        <a
          key={c.id}
          href="#products"
          aria-current={selected === c.id ? 'true' : undefined}
          onClick={() => onPick(c.id)}
        >
          {c.name}
        </a>
      ))}
    </nav>
  )
}