import type { Category } from '../shared/types'

type CategoryNavProps = {
  categories: Category[]
  activeId: number | null
  onPick: (id: number | null) => void
}

export default function CategoryNav({ categories, activeId, onPick }: CategoryNavProps) {
  return (
    <section className="categories" aria-labelledby="categories-title">
      <div className="container">
        <div className="categories__head">
          <h2 id="categories-title" className="categories__title">دسته‌بندی محصولات</h2>
          <nav className="carousel-nav" aria-label="ناوبری دسته‌بندی‌ها">
            <a href="#cat-start" className="carousel-nav__btn" aria-label="رفتن به ابتدای دسته‌بندی‌ها">
              <svg aria-hidden="true"><use href="./icons.svg#arrowRight" /></svg>
            </a>
            <a href="#cat-end" className="carousel-nav__btn" aria-label="رفتن به انتهای دسته‌بندی‌ها">
              <svg aria-hidden="true"><use href="./icons.svg#arrowLeft" /></svg>
            </a>
          </nav>
        </div>

        <ul className="categories__list" id="categories-list" tabIndex={0} aria-label="دسته‌بندی محصولات">
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
        </ul>
      </div>
    </section>
  )
}