import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import LogoSprite from './components/LogoSprite.tsx'
import CategoryGrid from './components/CategoryGrid.tsx'
import ProductGrid from './components/ProductGrid.tsx'
import CartPanel from './components/CartPanel.tsx'
import type { Card, CartLine } from './shared/types.ts'
const SAMPLE: Card[] = [
  {
    id: 102, title: 'پرتقال', unit: 'هر کیلو', emoji: '🍊', image: null,
    price: '۴۵٬۰۰۰ تومان', oldPrice: '۵۰٬۰۰۰ تومان', discount: '۱۰٪', inStock: true,
  },
  {
    id: 103, title: 'موز', unit: 'هر کیلو', emoji: '🍌', image: null,
    price: '۶۰٬۰۰۰ تومان', oldPrice: null, discount: null, inStock: true,
  },
  {
    id: 201, title: 'شیر', unit: 'یک لیتر', emoji: '🥛', image: null,
    price: '۳۵٬۰۰۰ تومان', oldPrice: null, discount: null, inStock: false,
  },
  {
    id: 402, title: 'عسل', unit: '۵۰۰ گرم', emoji: '🍯', image: null,
    price: '۱۲۰٬۰۰۰ تومان', oldPrice: null, discount: null, inStock: true,
  },
]
const TEST_LINES: CartLine[] = [
  { id: 102, qty: 2 },
  { id: 201, qty: 1 },
]

export default function App() {
  return (
    <>
      <LogoSprite />
      <Header />
      <CategoryNav />
      <main id="main">
        <Hero />
        <CategoryGrid />
       <ProductGrid
  id="offers"
  title="پیشنهادهای ویژه"
  prefix="offer"
  cards={SAMPLE}
  onAdd={(id) => console.log('add', id)}
/>
<CartPanel
  lines={TEST_LINES}
  cards={SAMPLE}
  onRemove={(id) => console.log('remove', id)}
/>
      </main>
      <Footer />
    </>
  )
}