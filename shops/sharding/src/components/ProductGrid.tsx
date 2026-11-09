import type { Product, Cart } from '../shared/types'
import ProductCard from './ProductCard'

type ProductGridProps = {
  title: string
  products: Product[]
  cart: Cart
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function ProductGrid({ title, products, cart, onAdd, onRemove }: ProductGridProps) {
  return (
    <section className="product-shelf" id="shelf-main" aria-labelledby="shelf-main-title">
      <div className="container">
        <div className="product-shelf__inner">
          <div className="product-shelf__main">
            <div className="product-shelf__head">
              <h2 id="shelf-main-title" className="product-shelf__title">{title}</h2>
            </div>

            <ul className="product-shelf__grid" id="shelf-main-grid" tabIndex={0} aria-label={title}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[String(product.id)] ?? 0}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}