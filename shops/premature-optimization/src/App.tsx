import { PRODUCTS, OFFERS } from './components/sampleData.ts'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import ProductGrid from './components/ProductGrid.tsx'
import Promo from './components/Promo.tsx'
import Footer from './components/Footer.tsx'


export default function App() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <CategoryNav />
        <ProductGrid title="لبنیات" products={PRODUCTS} offers={OFFERS} />
        <Promo />
      </main>
      <Footer />
    </>
  )
}
