import type { ReactNode } from 'react'
import { getProductsForCarousel, type Catalog } from '../catalog/carousel'
import HeroBanner from './HeroBanner'
import PopularCategories from './PopularCategories'
import Banner02 from './Banner02'
import Advertisement from './Advertisement'
import ProductCarousel from './ProductCarousel'
import LandingCategorySections from './LandingCategorySections'

interface SuccessContentProps {
  catalog: Catalog
}

export default function SuccessContent({ catalog }: SuccessContentProps): ReactNode {
  return (
    <>
      <HeroBanner />
      <PopularCategories />
      <Banner02 />
      <div className="layout">
        {catalog.carousels.map((carousel) => {
          const carouselProducts = getProductsForCarousel(catalog, carousel.id)
          if (!carouselProducts || carouselProducts.length === 0) return null
          return (
            <ProductCarousel
              key={carousel.id}
              carouselId={carousel.id}
              title={carousel.title}
              emoji={carousel.emoji}
              products={carouselProducts}
              offers={carousel.source === 'offers' ? catalog.offers : []}
            />
          )
        })}
      </div>
      <Advertisement />
      <LandingCategorySections catalog={catalog} />
    </>
  )
}
