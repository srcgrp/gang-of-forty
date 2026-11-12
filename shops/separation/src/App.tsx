import { useState } from 'react'
import { addLine, cartCount, cartTotal, joinCart, removeLine } from './cart/cart.ts'
import { priceOf } from './catalog/offers.ts'
import type { CartLine, Category, Offer, Product, StockMap } from './types.ts'
import CartPanel from './components/CartPanel.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import ProductGrid from './components/ProductGrid.tsx'

const SAMPLE: Product[] = [
  { id: 1, categoryId: 1, name: 'سیب', emoji: '🍎', unit: 'کیلوگرم', price: 45000, tags: [] },
  { id: 2, categoryId: 2, name: 'شیر', emoji: '🥛', unit: 'لیتر', price: 30000, tags: [] },
  { id: 3, categoryId: 1, name: 'موز', emoji: '🍌', unit: 'کیلوگرم', price: 60000, tags: [] },
  { id: 4, categoryId: 2, name: 'پنیر', emoji: '🧀', unit: 'بسته', price: 55000, tags: [] },
]

const SAMPLE_CATS: Category[] = [
  { id: 1, slug: 'fruit', name: 'میوه', emoji: '🍎' },
  { id: 2, slug: 'dairy', name: 'لبنیات', emoji: '🥛' },
]

const SAMPLE_OFFERS: Offer[] = [{ productId: 2, percent: 20, label: 'تخفیف' }]
const SAMPLE_STOCK: StockMap = { '3': 0 }

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cart, setCart] = useState<CartLine[]>([])
  const filtered = categoryId === null ? SAMPLE : SAMPLE.filter((p) => p.categoryId === categoryId)
  const items = filtered.map((p) => priceOf(p, SAMPLE_OFFERS, SAMPLE_STOCK))
  const lines = joinCart(cart, SAMPLE)
  const total = cartTotal(cart, SAMPLE)
  const count = cartCount(cart)
  return (
    <>
      <Header cartCount={count} />
      <main id="main">
        <Hero />
        <CategoryNav categories={SAMPLE_CATS} activeId={categoryId} onPick={setCategoryId} />
        <ProductGrid title="🔥 پیشنهاد ویژه امروز" items={items} onAdd={(id) => setCart(addLine(cart, id))} />
        <CartPanel
          lines={lines}
          total={total}
          count={count}
          onRemove={(id) => setCart(removeLine(cart, id))}
          onClear={() => setCart([])}
        />
      </main>
      <Footer />
    </>
  )
}
