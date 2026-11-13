import { useState } from 'react'
import type { Cart, Product } from './types.ts'
import { addItem, cartLines, cartSubtotal, removeItem, totalQuantity } from './cart/cart.ts'
import Banners from './components/Banners.tsx'
import CartPanel from './components/CartPanel.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import ProductGrid from './components/ProductGrid.tsx'

// داده‌ی موقت؛ در گام ۴ حذف می‌شود و از api/ می‌آید.
const SAMPLE: Product[] = [
  { id: 1, categoryId: 2, name: 'شیر کم‌چرب', emoji: '🥛', unit: '۱ لیتر', price: 45000, tags: ['جدید'] },
  { id: 2, categoryId: 2, name: 'ماست پرچرب', emoji: '🥣', unit: '۹۰۰ گرم', price: 62000, tags: [] },
  { id: 3, categoryId: 2, name: 'پنیر لیقوان', emoji: '🧀', unit: '۴۰۰ گرم', price: 180000, tags: [] },
  { id: 4, categoryId: 1, name: 'سیب قرمز', emoji: '🍎', unit: '۱ کیلو', price: 90000, tags: [] },
  { id: 5, categoryId: 3, name: 'نان سنگک', emoji: '🥖', unit: '۱ عدد', price: 25000, tags: [] },
]

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cart, setCart] = useState<Cart>([])

  // مقدارهای حساب‌شدنی: State نیستند و هر بار هنگام render محاسبه می‌شوند.
  const visible = SAMPLE.filter((p) => categoryId === null || p.categoryId === categoryId)
  const lines = cartLines(cart, SAMPLE)

  return (
    <>
      <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
      <Header cartCount={totalQuantity(cart)} />
      <main id="main" tabIndex={-1} className="wrap">
        <Hero />
        <CategoryNav categoryId={categoryId} onPick={setCategoryId} />
        <ProductGrid products={visible} onAdd={(id) => setCart(addItem(cart, id))} />
        <CartPanel
          lines={lines}
          totalCount={totalQuantity(cart)}
          subtotal={cartSubtotal(lines)}
          onRemove={(id) => setCart(removeItem(cart, id))}
        />
        <Banners />
      </main>
      <Footer />
    </>
  )
}
