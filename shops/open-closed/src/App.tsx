import type { Product } from './types.ts'
import Banners from './components/Banners.tsx'
import CartPanel from './components/CartPanel.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import ProductGrid from './components/ProductGrid.tsx'

// داده‌ی موقت؛ در گام ۴ حذف می‌شود و از api/ می‌آید.
const SAMPLE: Product[] = [
  { id: 1, categoryId: 2, name: 'شیر کم‌چرب', emoji: '🥛', unit: '۱ لیتر', price: 45000, tags: [] },
  { id: 2, categoryId: 2, name: 'ماست پرچرب', emoji: '🥣', unit: '۹۰۰ گرم', price: 62000, tags: [] },
  { id: 3, categoryId: 2, name: 'پنیر لیقوان', emoji: '🧀', unit: '۴۰۰ گرم', price: 180000, tags: [] },
]

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
      <Header cartCount={0} />
      <main id="main" tabIndex={-1} className="wrap">
        <Hero />
        <CategoryNav />
        <ProductGrid products={SAMPLE} />
        <CartPanel />
        <Banners />
      </main>
      <Footer />
    </>
  )
}
