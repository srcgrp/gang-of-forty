import Header from './components/Header'
import Hero from './components/Hero'
import CategorySection from './components/CategorySection'
import ProductGrid, { type Product } from './components/ProductGrid'
import CartPanel from './components/CartPanel'
import Footer from './components/Footer'

const SAMPLE: Product[] = [
  {
    id: 'n1',
    name: 'توت فرنگی',
    emoji: '🍓',
    oldPrice: 250000,
    price: 200000,
    discount: 20
  },
  {
    id: 'n2',
    name: 'کیوی',
    emoji: '🥝',
    oldPrice: 300000,
    price: 150000,
    discount: 50
  },
  {
    id: 'n3',
    name: 'سیب',
    emoji: '🍎',
    oldPrice: 350000,
    price: 300000,
    discount: 14
  }
]

export default function App() {
  return (
    <>
      <Header />

      <main id="main">
        <Hero />
        <CategorySection />

        <section className="wrap" id="best-selling">
          <div className="head">
            <h2 id="best-title">پیشنهاد ویژه</h2>
            <div>
              <a href="#best-title">ابتدا</a>
              {' '}
              <a href="#best-title">انتها</a>
            </div>
          </div>
          <ul
            className="carousel"
            id="best-carousel"
            tabIndex={0}
            aria-label="کاروسل محصولات پرفروش"
          />
        </section>

        <Hero id="posters-2" />

        <section className="wrap" id="new-products">
          <div className="head">
            <h2 id="new-title">محصولات جدید</h2>
            <div>
              <a href="#b1">ابتدا</a>
                 {' '}
              <a href="#b6">انتها</a>
            </div>
          </div>

          <ProductGrid products={SAMPLE} />
        </section>

        <CartPanel />
      </main>

      <Footer />
    </>
  )
}
