import type { ReactNode } from 'react'
import type { Product, CartLine } from '../types'
import HeroBanner from './HeroBanner'
import PopularCategories from './PopularCategories'
import Banner02 from './Banner02'
import Advertisement from './Advertisement'
import ProductGrid from './ProductGrid'
import CartPanel from './CartPanel'

interface SuccessContentProps {
  products: Product[]
  cart: CartLine[]
  onAddToCart: (productId: number) => void
  onRemoveFromCart: (productId: number) => void
}

export default function SuccessContent({
  products,
  cart,
  onAddToCart,
  onRemoveFromCart,
}: SuccessContentProps): ReactNode {
  return (
    <>
      <HeroBanner />
      <PopularCategories />
      <Banner02 />
      <div className="layout">
        <div className="section-title">
          <h2>محصولات</h2>
        </div>
        <ProductGrid products={products} onAddToCart={onAddToCart} />
      </div>
      <Advertisement />
      <CartPanel cart={cart} products={products} onRemove={onRemoveFromCart} />
    </>
  )
}
