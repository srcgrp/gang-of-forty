import type { Category, Product } from '../shared/types'
import { PROMO_IMAGES } from '../shared/content'

type MegaMenuItemProps = {
  category: Category
  products: Product[]
  active: boolean
  onFocus: () => void
  onClose: () => void
}

export default function MegaMenuItem({ category, products, active, onFocus, onClose }: MegaMenuItemProps) {
  const href = `#${category.slug}`
  const image = PROMO_IMAGES[category.slug]
  return (
    <li className="mega-menu__item" data-state={active ? 'active' : undefined}
      onMouseEnter={onFocus} onFocus={onFocus}>
      <a className="mega-menu__category-link" href={href} onClick={onClose}>{category.name}</a>
      <div className="mega-menu__products-panel">
        <h4 className="mega-menu__products-title">محصولات</h4>
        <ul className="mega-menu__products">
          {products.length === 0 ? (
            <li className="mega-menu__products-empty">محصولی برای نمایش نیست</li>
          ) : products.map((product) => (
            <li key={product.id}><a href={href} onClick={onClose}>{product.name}</a></li>
          ))}
        </ul>
      </div>
      <a className="mega-menu__promo" href={href} onClick={onClose}>
        <span className="mega-menu__promo-media" aria-hidden="true">
          {image && <img src={image} alt="" loading="lazy" width={400} height={600} />}
        </span>
        <span className="mega-menu__promo-body">
          <span className="mega-menu__promo-title">{category.name}</span>
          <span className="mega-menu__promo-desc">{products.length.toLocaleString('fa-IR')} کالا</span>
        </span>
      </a>
    </li>
  )
}
