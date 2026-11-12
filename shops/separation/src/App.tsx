import type { Category, Product } from './types.ts'
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

export default function App() {
  return (
    <>
      <Header cartCount={0} />
      <main id="main">
        <Hero />
        <CategoryNav categories={SAMPLE_CATS} activeId={null} />
        <ProductGrid title="🔥 پیشنهاد ویژه امروز" products={SAMPLE} />
        <CartPanel count={0} />
      </main>
      <Footer />
    </>
  )
}
