import ProductCard from './ProductCard'
import type { Product, Offer, Stock } from '../types'

type ProductGridProps = {
  products: Product[]
  offers: Offer[]
  stock: Stock
  onAdd: (id: number) => void
}

export default function ProductGrid({
  products,
  offers,
  stock,
  onAdd
}: ProductGridProps) {
  return (
    <ul className="carousel" aria-label="کاروسل محصولات">
      {products.map((product) => {
        const productStock = stock.items[product.id] ?? 0

        const offer = offers.find(
          (item) => item.productId === product.id
        )

        return (
          <ProductCard
            key={product.id}
            product={product}
            stock={productStock}
            discount={offer?.percent}
            onAdd={onAdd}
          />
        )
      })}
    </ul>
  )
}