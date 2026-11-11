import type { Category } from '../shared/types'

type CategoryItemsProps = {
  categories: Category[]
  activeId: number | null
  onPick: (id: number | null) => void
  loading?: boolean | undefined
}

export default function CategoryItems({ categories, activeId, onPick, loading }: CategoryItemsProps) {
  return (
    <>
    {loading ? (
      [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <li key={i}>
          <span className="category" data-skeleton aria-hidden="true">
            <span className="category__img"></span>
            <span className="category__name"></span>
          </span>
        </li>
      ))
    ) : (
      <>
        <li>
          <button
            type="button"
            className="category"
            data-category="all"
            aria-current={activeId === null ? 'page' : undefined}
            onClick={() => onPick(null)}
          >
            <span className="category__img category__img--all">
              <svg className="category__all-icon" aria-hidden="true">
                <use href="./icons.svg#grid" />
              </svg>
            </span>
            <span className="category__name">همه</span>
          </button>
        </li>

        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              type="button"
              className="category"
              aria-current={activeId === cat.id ? 'page' : undefined}
              onClick={() => onPick(cat.id)}
            >
              <span className="category__img">
                {cat.image ? <img src={cat.image} alt="" /> : <span className="product__emoji">{cat.emoji}</span>}
              </span>
              <span className="category__name">{cat.name}</span>
            </button>
          </li>
        ))}
      </>
    )}
    </>
  )
}
