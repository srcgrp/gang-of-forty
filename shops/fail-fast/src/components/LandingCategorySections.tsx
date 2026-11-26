import type { ReactNode } from 'react'
import type { Catalog } from '../catalog/carousel'
import ProductCarousel from './ProductCarousel'

interface LandingCategorySectionsProps {
  catalog: Catalog
}

const categoryMatchers = [
  {
    key: 'snacks',
    matches: (value: string) =>
      value.includes('snack') || value.includes('تنقل') || value.includes('شیرینی'),
  },
  {
    key: 'drinks',
    matches: (value: string) =>
      value.includes('drink') || value.includes('beverage') || value.includes('نوشید'),
  },
  {
    key: 'personal-care',
    matches: (value: string) =>
      value.includes('cosmetic') ||
      value.includes('beauty') ||
      value.includes('hygiene') ||
      value.includes('personal-care') ||
      value.includes('آرایشی') ||
      value.includes('بهداشتی'),
  },
]

export default function LandingCategorySections({
  catalog,
}: LandingCategorySectionsProps): ReactNode {
  return (
    <div className="landing-category-sections">
      {categoryMatchers.map(({ key, matches }) => {
        const category = catalog.categories.find(({ slug, name }) =>
          matches(`${slug} ${name}`.toLowerCase()),
        )
        if (!category) return null

        const products = catalog.products.filter(
          (product) => product.categoryId === category.id,
        )
        if (products.length === 0) return null

        return (
          <ProductCarousel
            key={key}
            carouselId={category.slug}
            title={category.name}
            emoji={category.emoji}
            products={products}
            offers={catalog.offers}
          />
        )
      })}
    </div>
  )
}
