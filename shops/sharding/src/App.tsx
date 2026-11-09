import { useState } from 'react'
import type { Product, Category, Cart } from './shared/types'
import { addToCart, removeFromCart, removeLine, cartCount } from './features/cart/logic/cart'
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
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const [cart, setCart] = useState<Cart>({})

  const [cartOpen, setCartOpen] = useState(false)

  const visibleProducts = categoryId === null
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter((p) => p.categoryId === categoryId)

  const count = cartCount(cart)

  function handleAdd(id: number): void {
    const max = 10
    setCart((prev) => addToCart(prev, id, max))
  }

  function handleRemove(id: number): void {
    setCart((prev) => removeFromCart(prev, id))
  }

  function handleRemoveLine(id: number): void {
    setCart((prev) => removeLine(prev, id))
  }

  return (
    <>
      <Header
        shopName="کیوی"
        cartCount={count}
        onOpenCart={() => setCartOpen(true)}
      />

      <main id="main-content" tabIndex={-1}>
        <Hero banners={SAMPLE_BANNERS} />
        <CategoryNav
          categories={SAMPLE_CATEGORIES}
          activeId={categoryId}
          onPick={setCategoryId}
        />
        <ProductGrid
          title={categoryId === null ? 'همه محصولات' : 'محصولات دسته'}
          products={visibleProducts}
          cart={cart}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </main>

      <Footer />
      <CartPanel
        open={cartOpen}
        cart={cart}
        products={SAMPLE_PRODUCTS}
        onClose={() => setCartOpen(false)}
        onRemoveLine={handleRemoveLine}
      />
    </>
  )
}