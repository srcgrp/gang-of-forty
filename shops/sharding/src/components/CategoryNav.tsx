import type { Category } from '../shared/types'
import { useCarousel } from '../hooks/useCarousel'
import CarouselNav from './CarouselNav'
import CategoryItems from './CategoryItems'

type CategoryNavProps = {
  categories: Category[]
  activeId: number | null
  onPick: (id: number | null) => void
  loading?: boolean
}

export default function CategoryNav({ categories, activeId, onPick, loading }: CategoryNavProps) {
  const { trackRef, isAtStart, isAtEnd, scrollPrev, scrollNext } = useCarousel(loading ? 0 : categories.length + 1)

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
              sectionId="categories-title"
            />
          )}
        </div>

        <ul ref={trackRef} className="categories__list" id="categories-list" tabIndex={0} aria-label="دسته‌بندی محصولات">
          <CategoryItems categories={categories} activeId={activeId} onPick={onPick} loading={loading} />
        </ul>
      </div>
    </section>
  )
}
