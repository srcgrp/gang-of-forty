import type { Product, Category } from './shared/types'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryNav from './components/CategoryNav'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import CartPanel from './components/CartPanel'

const SAMPLE_PRODUCTS: Product[] = [
  { id: 101, categoryId: 1, name: 'سیب قرمز', emoji: '🍎', unit: 'کیلو', price: 45000, tags: ['میوه'] },
  { id: 201, categoryId: 2, name: 'شیر پرچرب', emoji: '🥛', unit: 'لیتر', price: 32000, tags: ['لبنیات'] },
  { id: 301, categoryId: 3, name: 'نان سنگک', emoji: '🥖', unit: 'عدد', price: 15000, tags: ['نان'] },
  { id: 401, categoryId: 4, name: 'نوشابه', emoji: '🥤', unit: 'بطری', price: 25000, tags: ['نوشیدنی'] },
]

const SAMPLE_CATEGORIES: Category[] = [
  { id: 1, slug: 'fruits', name: 'میوه', emoji: '🍎' },
  { id: 2, slug: 'dairy', name: 'لبنیات', emoji: '🥛' },
  { id: 3, slug: 'bakery', name: 'نان', emoji: '🥖' },
  { id: 4, slug: 'drinks', name: 'نوشیدنی', emoji: '🥤' },
]

const SAMPLE_BANNERS = [
  './assets/images/banners/banner-1.webp',
  './assets/images/banners/banner-2.webp',
  './assets/images/banners/banner-3.webp',
]


export default function App() {
  function handleAddToCart(id: number): void {
    console.log('Add to cart:', id)
  }
  return (
    <>
      <Header shopName="کیوی" cartCount={0} />

      <main id="main-content" tabIndex={-1}>
        <Hero banners={SAMPLE_BANNERS} />
        <CategoryNav categories={SAMPLE_CATEGORIES} />
        <ProductGrid
          title="پیشنهادهای ویژه امروز"
          products={SAMPLE_PRODUCTS}
          onAdd={handleAddToCart}
        />
      </main>

      <Footer />
      <CartPanel />
    </>
  )
}