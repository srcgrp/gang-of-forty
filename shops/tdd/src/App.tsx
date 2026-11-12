import type { Category, Offer, Product, Stock } from './shared/types'
import Header from './components/Header'
import Hero from './components/Hero'
import SearchResults from './components/SearchResults'
import ProductGrid from './components/ProductGrid'
import SideBanner from './components/SideBanner'
import StoreStory from './components/StoreStory'
import About from './components/About'
import Footer from './components/Footer'

const SAMPLE: Product[] = [
    { id: 1, categoryId: 1, name: 'نارنگی تازه', emoji: '🍊', unit: 'هر کیلوگرم', price: 85000, tags: ['میوه', 'تازه'] },
    { id: 2, categoryId: 2, name: 'شیر کم‌چرب', emoji: '🥛', unit: 'بطری ۱ لیتری', price: 42000, tags: ['لبنیات'] },
    { id: 3, categoryId: 3, name: 'نان تازه', emoji: '🥖', unit: 'هر عدد', price: 30000, tags: ['نان'] },
    { id: 4, categoryId: 2, name: 'پنیر سفید', emoji: '🧀', unit: 'بسته ۴۰۰ گرمی', price: 76000, tags: ['لبنیات'] }
]

const SAMPLE_STOCK: Stock = { updatedAt: '2026-11-12', items: { 1: 12, 2: 8, 3: 20, 4: 5 } }
const SAMPLE_OFFERS: Offer[] = [
    { productId: 1, percent: 15, label: 'تخفیف' },
    { productId: 4, percent: 10, label: 'تخفیف' }
]

const SAMPLE_CATEGORIES: Category[] = [
    { id: 1, slug: 'fruits', name: 'میوه و سبزیجات', emoji: '🍊', color: '#e6a34a' },
    { id: 2, slug: 'dairy', name: 'لبنیات', emoji: '🥛', color: '#7daed3' },
    { id: 3, slug: 'bakery', name: 'نان و شیرینی', emoji: '🥖', color: '#c88b55' }
]

export default function App() {
    return (
        <div id="top">
            <Header categories={SAMPLE_CATEGORIES} onPick={() => undefined} />
            <main id="main-content" tabIndex={-1}>
                <p id="page-status" className="page-status" role="status" aria-live="polite"></p>
                <SearchResults />
                <div id="home-banners"><Hero /></div>
                <section className="categories" id="categories" aria-labelledby="categories-title">
                    <h2 id="categories-title">دسته‌بندی‌ها</h2>
                    <div className="category-grid" id="category-grid"></div>
                </section>
                <div id="home-promos" className="promo-grid" aria-label="پیشنهادهای منتخب"></div>
                <div id="home-carousels">
                    <ProductGrid products={SAMPLE} stock={SAMPLE_STOCK} offers={SAMPLE_OFFERS} onAdd={() => undefined} />
                </div>
                <SideBanner />
                <StoreStory />
                <section className="store-sections" id="category-sections" aria-label="بخش‌های فروشگاه"></section>
                <About />
            </main>
            <Footer />
        </div>
    )
}
