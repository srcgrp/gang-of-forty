import { categoriesOf } from '../features/products/catalog/sections.ts'
import type { LoadState } from '../shared/types.ts'
import type { MouseEvent } from 'react'


type CategoryNavProps = {
  state: LoadState
  selected: number | null
  onPick: (id: number | null) => void
}


export default function CategoryNav({ state, selected, onPick }: CategoryNavProps) {
  const pick = (e: MouseEvent, id: number | null) => {
  e.preventDefault()
  onPick(id)
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}
  return (
    <nav className="category-nav" aria-label="دسته‌بندی محصولات">
      <a
        href="#/"
        aria-current={selected === null ? 'true' : undefined}
        onClick={(e) => pick(e, null)}
      >
        همه
      </a>
      {categoriesOf(state).map((c) => (
        <a
          key={c.id}
          href="#/"
          aria-current={selected === c.id ? 'true' : undefined}
          onClick={(e) => pick(e, null)}
        >
          {c.name}
        </a>
      ))}
    </nav>
  )
}