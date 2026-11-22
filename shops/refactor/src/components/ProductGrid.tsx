import type { ProductView } from '../types'
import Icon from './Icon'
import ProductCard from './ProductCard'

type ProductGridProps = {
  products: ProductView[]
  onAdd: (id: number) => void
  showToggle: boolean
  showAll: boolean
  onToggleAll: () => void
  showSaleButton: boolean
  onShowSale: () => void
}

export default function ProductGrid({
  products, onAdd, showToggle, showAll, onToggleAll, showSaleButton, onShowSale,
}: ProductGridProps) {
  return (
    <section className="catalog-section" id="catalog" aria-labelledby="catalog-title">
      <div className="section-head">
        <h2 className="section-title" id="catalog-title">کالاهای فروشگاه</h2>
        {showSaleButton && (
          <button className="sale-show-btn" type="button" onClick={onShowSale}>🔥 نمایش شگفت‌انگیز</button>
        )}
      </div>
      <ul className="catalog-grid">
        {products.length === 0 ? (
          <li className="empty-message">کالایی با این مشخصات پیدا نشد.</li>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              inStock={product.stock > 0}
              discount={product.percent > 0 ? product.percent : undefined}
              onAdd={onAdd}
            />
          ))
        )}
      </ul>
      {showToggle && (
        <button className="more-btn" type="button" onClick={onToggleAll}>
          <Icon name={showAll ? 'arrow-up' : 'arrow-down'} />
          {showAll ? 'نمایش کمتر' : 'نمایش بیشتر'}
        </button>
      )}
    </section>
  )
}
