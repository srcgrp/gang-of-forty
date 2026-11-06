import ProductCard from './components/ProductCard.tsx'
import type { Card } from './shared/types.ts'
import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import LogoSprite from './components/LogoSprite.tsx'
import CategoryGrid from './components/CategoryGrid.tsx'

const SAMPLE_CARD: Card = {
  id: 102,
  title: 'پرتقال',
  unit: 'هر کیلو',
  emoji: '🍊',
  image: null,
  price: '۴۵٬۰۰۰ تومان',
  oldPrice: '۵۰٬۰۰۰ تومان',
  discount: '۱۰٪',
  inStock: true,
}

export default function App() {
  return (
    <>
      <LogoSprite />
      <Header />
      <CategoryNav />
      <main id="main">
        <Hero />
        <CategoryGrid />
        <ProductCard card={SAMPLE_CARD} onAdd={(id) => console.log('add', id)} />
      </main>
      <Footer />
    </>
  )
}