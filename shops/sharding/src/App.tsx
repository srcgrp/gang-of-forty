import Header from './components/Header'
import Hero from './components/Hero'
import CategoryNav from './components/CategoryNav'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import CartPanel from './components/CartPanel'

export default function App() {
  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <CategoryNav />
        <ProductGrid />
      </main>

      <Footer />
      <CartPanel />
    </>
  )
}