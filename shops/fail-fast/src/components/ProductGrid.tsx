import type { ReactNode } from 'react'
import type { Product } from '../types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  onAddToCart: (productId: number) => void
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps): ReactNode {
  return (
    <div className="products" tabIndex={0}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAddToCart} />
      ))}
    </div>
  )
}
