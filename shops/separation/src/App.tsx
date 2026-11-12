import { priceOf } from './catalog/offers.ts'
import type { Category, Offer, Product, StockMap } from './types.ts'
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

function noop(): void {}

export default function App() {
  const items = SAMPLE.map((p) => priceOf(p, SAMPLE_OFFERS, SAMPLE_STOCK))
  return (
    <>
      <Header cartCount={0} />
      <main id="main">
        <Hero />
        <CategoryNav categories={SAMPLE_CATS} activeSlug={undefined} onPick={noop} />
        <ProductGrid title="🔥 پیشنهاد ویژه امروز" items={items} onAdd={noop} />
        <CartPanel lines={[]} total={0} count={0} onRemove={noop} onClear={noop} />
      </main>
      <Footer />
    </>
  )
}
