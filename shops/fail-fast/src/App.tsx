import type { ReactNode } from 'react'
import type { Product } from './types'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import ProductGrid from './components/ProductGrid'
import CartPanel from './components/CartPanel'

// Sample products for Step 1 (temporary data)
const sampleProducts: Product[] = [
  {
    id: 101,
    name: 'شیر پاستوریزه',
    categoryId: 2,
    price: 45000,
    unit: '۱ لیتر',
    emoji: '🥛',
  },
  {
    id: 102,
    name: 'ماست یونانی',
    categoryId: 2,
    price: 68000,
    unit: '۵۰۰ گرم',
    emoji: '🥛',
  },
  {
    id: 103,
    name: 'پنیر لیقوان',
    categoryId: 2,
    price: 95000,
    unit: '۴۰۰ گرم',
    emoji: '🧀',
  },
  {
    id: 104,
    name: 'تخم‌مرغ محلی',
    categoryId: 2,
    price: 120000,
    unit: '۱۲ عدد',
    emoji: '🥚',
  },
]

// No-op callback for Step 1 (no real cart functionality yet)
function handleAddToCart(productId: number): void {
  console.log('Add to cart:', productId)
}

export default function App(): ReactNode {
  return (
    <>
      <Header />
      <CategoryNav />
      <main id="main">
        <div className="layout">
          <div className="section-title">
            <h2>محصولات لبنی</h2>
          </div>
          <ProductGrid products={sampleProducts} onAddToCart={handleAddToCart} />
        </div>
        <CartPanel />
      </main>
    </>
  )
}
