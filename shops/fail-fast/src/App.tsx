import type { ReactNode } from 'react'
import type { Product, Category } from './types'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import ProductGrid from './components/ProductGrid'
import CartPanel from './components/CartPanel'

// Sample products for Step 2 (temporary data)
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

// Sample categories for Step 2 (temporary data)
const sampleCategories: Category[] = [
  { id: 1, slug: 'fruits', name: 'میوه و سبزیجات', emoji: '🥬', color: '#4CAF50' },
  { id: 2, slug: 'dairy', name: 'لبنیات و تخم‌مرغ', emoji: '🥛', color: '#2196F3' },
  { id: 3, slug: 'bakery', name: 'نان و غلات', emoji: '🍞', color: '#795548' },
  { id: 4, slug: 'snacks', name: 'تنقلات و شیرینی', emoji: '🍪', color: '#FF9800' },
  { id: 5, slug: 'drinks', name: 'نوشیدنی‌ها', emoji: '🥤', color: '#00BCD4' },
  { id: 6, slug: 'cosmetics', name: 'آرایشی و بهداشتی', emoji: '🧴', color: '#E91E63' },
]

// No-op callback for Step 2 (no real cart functionality yet)
function handleAddToCart(productId: number): void {
  console.log('Add to cart:', productId)
}

// No-op callback for Step 2 (no category filtering yet)
function handleCategoryPick(categoryId: number): void {
  console.log('Category picked:', categoryId)
}

export default function App(): ReactNode {
  return (
    <>
      <Header />
      <CategoryNav categories={sampleCategories} onPick={handleCategoryPick} />
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
