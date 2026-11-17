import { useState } from 'react'
import type { Product, Sort } from '../../scripts/types'
import { sortProducts } from '../../scripts/logic/catalog/sort-products.ts'
import Carousel from './Carousel.tsx'
import ProductList from './ProductList.tsx'
import SortSelect from './SortSelect.tsx'
import type { SharedCardProps } from './ProductList.tsx'

type ProductGridProps = SharedCardProps & { id?: string; title: string; products: Product[] }

export default function ProductGrid({ id, title, products, ...rest }: ProductGridProps) {
  const [sort, setSort] = useState<Sort>('default')

  return (
    <section className="recommendation" id={id}>
      <h2 className="recommendation-title">{title}</h2>
      <SortSelect value={sort} onChange={setSort} />
      {products.length === 0 ? (
        <p className="empty-message">محصولی برای نمایش وجود ندارد.</p>
      ) : (
        <Carousel key={sort}>
          <ProductList products={sortProducts(products, sort)} {...rest} />
        </Carousel>
      )}
    </section>
  )
}