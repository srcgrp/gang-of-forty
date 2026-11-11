import type { Category } from '../shared/types'
import { useCarousel } from '../hooks/useCarousel'
import CarouselNav from './CarouselNav'

type CategoryNavProps = {
  categories: Category[]
  activeId: number | null
  onPick: (id: number | null) => void
  loading?: boolean
}

export default function CategoryNav({ categories, activeId, onPick, loading }: CategoryNavProps) {
  const { trackRef, isAtStart, isAtEnd, scrollPrev, scrollNext } = useCarousel()

  return (
    <section className="categories" aria-labelledby="categories-title">
      <div className="container">
        <div className="categories__head">
          <h2 id="categories-title" className="categories__title">دسته‌بندی محصولات</h2>
          {!loading && (
            <CarouselNav
              isAtStart={isAtStart}
              isAtEnd={isAtEnd}
              onPrev={scrollPrev}
              onNext={scrollNext}
              label="دسته‌بندی‌ها"
            />
          )}
        </div>

        <ul ref={trackRef} className="categories__list" id="categories-list" tabIndex={0} aria-label="دسته‌بندی محصولات">
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
                      <span className="product__emoji">{cat.emoji}</span>
                    </span>
                    <span className="category__name">{cat.name}</span>
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </section>
  )
}