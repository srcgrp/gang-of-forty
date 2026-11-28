import type { ReactNode } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import type { Offer } from '../../types'
import { getProductsForCarousel } from '../../catalog/carousel'
import { useCatalogContext } from '../../context/CatalogContext'
import { useCartStore } from '../../hooks/useCartStore'
import ProductCard from '../ProductCard'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const route = getRouteApi('/plp/$carouselId')

export default function ProductListingPage(): ReactNode {
  const { carouselId } = route.useParams()
  const catalog = useCatalogContext()
  const addToCart = useCartStore((state) => state.add)
  const revealRef = useScrollReveal<HTMLElement>()
  const products = getProductsForCarousel(catalog, carouselId)

  if (!products) return <p>این فهرست پیدا نشد</p>

  const carousel = catalog.carousels.find((item) => item.id === carouselId)
  const category = catalog.categories.find((item) => item.slug === carouselId)
  const offers: Offer[] =
    carousel?.source === 'offers' || category ? catalog.offers : []
  const findOffer = (productId: number): Offer | undefined =>
    offers.find((offer) => offer.productId === productId)

  return (
    <section ref={revealRef} className="section scroll-reveal">
      <div className="section-title">
        <h2>{carousel?.emoji ?? category?.emoji} {carousel?.title ?? category?.name}</h2>
      </div>
      <div className="products" tabIndex={0}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            offer={findOffer(product.id)}
            onAdd={addToCart}
          />
        ))}
      </div>
    </section>
  )
}
