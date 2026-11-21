import type { ReactNode } from 'react'
import type { Product, CartLine, Offer, HomeCarousel } from '../types'
import HeroBanner from './HeroBanner'
import PopularCategories from './PopularCategories'
import Banner02 from './Banner02'
import Advertisement from './Advertisement'
import ProductCarousel from './ProductCarousel'
import CartPanel from './CartPanel'

interface SuccessContentProps {
  products: Product[]
  cart: CartLine[]
  carousels: HomeCarousel[]
  offers: Offer[]
  onAddToCart: (productId: number) => void
  onRemoveFromCart: (productId: number) => void
}

export default function SuccessContent({
  products,
  cart,
  carousels,
  offers,
  onAddToCart,
  onRemoveFromCart,
}: SuccessContentProps): ReactNode {
  const getCarouselProducts = (carousel: HomeCarousel): Product[] => {
    if (carousel.source === 'offers') {
      const offerProductIds = offers.map((o) => o.productId)
      return products.filter((p) => offerProductIds.includes(p.id))
    }
    if (carousel.categoryId !== undefined) {
      return products.filter((p) => p.categoryId === carousel.categoryId)
    }
    return products
  }

  return (
    <>
      <HeroBanner />
      <PopularCategories />
      <Banner02 />
      <div className="layout">
        {carousels.map((carousel) => {
          const carouselProducts = getCarouselProducts(carousel)
          if (carouselProducts.length === 0) return null
          return (
            <ProductCarousel
              key={carousel.id}
              title={carousel.title}
              emoji={carousel.emoji}
              products={carouselProducts}
              offers={carousel.source === 'offers' ? offers : []}
              onAddToCart={onAddToCart}
              viewAllHref={`#${carousel.id}`}
            />
          )
        })}
      </div>
      <Advertisement />
      <CartPanel cart={cart} products={products} onRemove={onRemoveFromCart} />
    </>
  )
}
