import type { ReactNode } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import type { Offer } from '../../types'
import { getProductsForCarousel } from '../../catalog/carousel'
import { useCatalogContext } from '../../context/CatalogContext'
import { useCartStore } from '../../hooks/useCartStore'
import ProductCard from '../ProductCard'

const route = getRouteApi('/plp/$carouselId')

export default function ProductListingPage(): ReactNode {
  const { carouselId } = route.useParams()
  const catalog = useCatalogContext()
  const addToCart = useCartStore((state) => state.add)
  const products = getProductsForCarousel(catalog, carouselId)

  if (!products) return <p>این فهرست پیدا نشد</p>

  const carousel = catalog.carousels.find((item) => item.id === carouselId)
  const offers: Offer[] = carousel?.source === 'offers' ? catalog.offers : []
  const findOffer = (productId: number): Offer | undefined =>
    offers.find((offer) => offer.productId === productId)

  return (
    <section className="section">
      <div className="section-title">
        <h2>{carousel?.emoji} {carousel?.title}</h2>
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
