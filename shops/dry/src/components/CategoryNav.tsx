import { categoriesOf } from '../features/products/catalog/sections.ts'
import type { LoadState } from '../shared/types.ts'


type CategoryNavProps = {
  state: LoadState
  selected: number | null
  onPick: (id: number | null) => void
}


export default function CategoryNav({ state, selected, onPick }: CategoryNavProps) {
  return (
    <nav className="category-nav" aria-label="دسته‌بندی محصولات">
      <a
        href="#products"
        aria-current={selected === null ? 'true' : undefined}
        onClick={() => onPick(null)}
      >
        همه
      </a>
      {categoriesOf(state).map((c) => (
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