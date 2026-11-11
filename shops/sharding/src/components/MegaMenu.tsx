import { useState } from 'react'
import type { Category, Product } from '../shared/types'
import { PROMO_IMAGES } from '../shared/content'

type MegaMenuProps = {
  categories: Category[]
  products: Product[]
}

export default function MegaMenu({ categories, products }: MegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="mega-menu">
      <button
        type="button"
        className="mega-menu__trigger"
        aria-haspopup="true"
        aria-controls="mega-menu-panel"
      >
        <svg className="mega-menu__trigger-icon" aria-hidden="true">
          <use href="./icons.svg#grid" />
        </svg>
        <span>همه دسته‌بندی‌ها</span>
      </button>

      <div className="mega-menu__panel" id="mega-menu-panel">
        <ul className="mega-menu__categories">
          {categories.map((cat, index) => {
            const items = products.filter((p) => p.categoryId === cat.id)
            const promoImage = PROMO_IMAGES[cat.slug]
            const isActive = index === activeIndex

            return (
              <li
                key={cat.id}
                className="mega-menu__item"
                data-state={isActive ? 'active' : undefined}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <a className="mega-menu__category-link" href={`#${cat.slug}`}>
                  {cat.name}
                </a>
                
                <div className="mega-menu__products-panel">
                  <h4 className="mega-menu__products-title">محصولات</h4>
                  <ul className="mega-menu__products">
                    {items.length === 0 ? (
                      <li className="mega-menu__products-empty">محصولی برای نمایش نیست</li>
                    ) : (
                      items.map((p) => (
                        <li key={p.id}>
                          <a href={`#${cat.slug}`}>{p.name}</a>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <a className="mega-menu__promo" href={`#${cat.slug}`}>
                  <span className="mega-menu__promo-media" aria-hidden="true">
                    {promoImage && (
                      <img src={promoImage} alt="" loading="lazy" width={400} height={600} />
                    )}
                  </span>
                  <span className="mega-menu__promo-body">
                    <span className="mega-menu__promo-title">{cat.name}</span>
                    <span className="mega-menu__promo-desc">{items.length} کالا</span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}