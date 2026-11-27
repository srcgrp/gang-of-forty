import { useState } from 'react'
import type { Catalog } from '../types'
import ProductCard from './ProductCard'

export default function SearchResults({ catalog, query }: { catalog: Catalog, query: string }) {
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const matches = catalog.products.filter((product) =>
    product.name.includes(query) && (categoryId === null || product.categoryId === categoryId))

  return <section aria-labelledby="search-heading">
    <h1 id="search-heading">نتایج جستجو ({matches.length.toLocaleString('fa-IR')})</h1>
    <label htmlFor="search-category">دسته‌بندی محصولات</label>{' '}
    <select id="search-category" value={categoryId ?? ''} onChange={(event) => {
      const value = event.currentTarget.value
      setCategoryId(value === '' ? null : Number(value))
    }}>
      <option value="">همهٔ دسته‌ها</option>
      {catalog.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
    </select>
    <div className="product-grid">{matches.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    {matches.length === 0 && <p>محصولی با این جستجو پیدا نشد.</p>}
  </section>
}
