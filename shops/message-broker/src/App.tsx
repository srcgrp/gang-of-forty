import Header from './components/Header'
import Hero from './components/Hero'
import CategorySection from './components/CategorySection'
import ProductGrid from './components/ProductGrid'
import CartPanel from './components/CartPanel'
import Footer from './components/Footer'

import type { Product, Offer, Stock, Category } from './types'

const CATEGORIES: Category[] = [
  { id: 1, slug: 'fruits', name: 'میوه و سبزی', emoji: '🍎', color: '#fde3dc' },
  { id: 2, slug: 'dairy', name: 'لبنیات', emoji: '🥛', color: '#e2eefc' },
  { id: 3, slug: 'bakery', name: 'نان و شیرینی', emoji: '🥖', color: '#fff0cc' },
  { id: 4, slug: 'pantry', name: 'خواربار', emoji: '🍚', color: '#e3f1e7' },
  { id: 5, slug: 'drinks', name: 'نوشیدنی', emoji: '🧃', color: '#e0f5ef' },
  { id: 6, slug: 'protein', name: 'پروتئین', emoji: '🍗', color: '#fbe0e6' },
  { id: 7, slug: 'snacks', name: 'تنقلات', emoji: '🍪', color: '#f1e6fb' }
]

const SAMPLE: Product[] = [
  {
    id: 1,
    categoryId: 1,
    name: 'توت فرنگی',
    emoji: '🍓',
    unit: 'کیلوگرم',
    price: 200000
  },
  {
    id: 2,
    categoryId: 1,
    name: 'کیوی',
    emoji: '🥝',
    unit: 'کیلوگرم',
    price: 150000
  },
  {
    id: 3,
    categoryId: 3,
    name: 'سیب',
    emoji: '🍎',
    unit: 'کیلوگرم',
    price: 300000
  }
]

const OFFERS: Offer[] = [
  { productId: 1, percent: 20, label: '20% تخفیف' },
  { productId: 2, percent: 50, label: '50% تخفیف' },
  { productId: 3, percent: 14, label: '14% تخفیف' }
]

const STOCK: Stock = {
  updatedAt: '',
  items: {
    1: 10,
    2: 5,
    3: 0
  }
}

export default function App() {
  const handleAdd = (id: number) => {
    console.log('افزودن محصول', id)
  }

  const handlePick = (id: number | null) => {
    console.log('دسته انتخاب‌شده:', id)
  }

  return (
    <>
      <Header
        categories={CATEGORIES}
        activeCategoryId={null}
        onPick={handlePick}
      />

      <main id="main">
        <Hero />

        <CategorySection
          categories={CATEGORIES}
          activeCategoryId={null}
          onPick={handlePick}
        />

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

          <ProductGrid
            products={SAMPLE}
            offers={OFFERS}
            stock={STOCK}
            onAdd={handleAdd}
          />
        </section>

        <CartPanel />
      </main>

      <Footer />
    </>
  )
}
