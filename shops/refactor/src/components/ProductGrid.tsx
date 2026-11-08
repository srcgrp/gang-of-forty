import type { ProductView } from '../types'
import ProductCard from './ProductCard'
import { formatNumber } from './format'

type ProductGridProps = {
  products: ProductView[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="catalog-section container" id="catalog">
      <div className="section-head">
        <h2 className="section-title" id="catalog-title">
          کالاهای فروشگاه
        </h2>
      </div>

      <p className="result-count" role="status">
        {`${formatNumber(products.length)} کالا`}
      </p>

      <ul className="catalog-grid">
        {products.length === 0
          ? <li className="empty-message">کالایی با این مشخصات پیدا نشد.</li>
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </ul>
    </section>
  )
}