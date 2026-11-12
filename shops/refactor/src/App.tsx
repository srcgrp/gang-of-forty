import { useEffect, useState } from 'react'
import type { CartItem, LoadState } from './types'
import { loadShop } from './api/load-shop'
import { addToCart, cartCount, cartLines, cartTotal, removeFromCart } from './features/cart/calculate'
import { selectProducts } from './features/products/select'
import { readCart, writeCart } from './storage/cart'
import CartPanel from './components/CartPanel'
import CategoryNav from './components/CategoryNav'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Status from './components/Status'
export default function App() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cart, setCart] = useState<CartItem[]>(() => readCart())
  useEffect(() => {
    writeCart(cart)
  }, [cart])
  useEffect(() => {
    let ignore = false
    loadShop()
      .then((data) => {
        if (!ignore) {
          setState({ status: data.products.length > 0 ? 'success' : 'empty', data })
        }
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'خطای ناشناخته'
        if (!ignore) {
          setState({ status: 'error', message })
        }
      })
    return () => {
      ignore = true
    }
  }, [])
  useEffect(() => {
    if (state.status !== 'success') return
    const count = cartCount(cartLines(cart, state.data.products))
    document.title = `${state.data.shop.name} · 🛒 ${count}`
  }, [cart, state])
  if (state.status !== 'success') {
    return <Status state={state} />
  }
  const { products, categories, home, shop } = state.data
  const lines = cartLines(cart, products)
  const total = cartTotal(lines)
  return (
    <>
      <a className="skip-link" href="#content">پرش به محتوای اصلی</a>
      <Header shop={shop} categories={categories} cartCount={cartCount(lines)} productCount={products.length} />
      <main id="content" tabIndex={-1}>
        <h1 className="sr-only">ریفکتور؛ سوپرمارکت آنلاین</h1>
        <Hero main={home.hero} side={home.side} />
        <CategoryNav categories={categories} activeId={categoryId} onPick={setCategoryId} />
        <div className="shop-layout container">
          <ProductGrid products={selectProducts(products, categoryId)} onAdd={(id) => setCart(addToCart(cart, id))} />
          <CartPanel lines={lines} total={total} onRemove={(id) => setCart(removeFromCart(cart, id))} />
        </div>
      </main>
      <Footer shop={shop} categories={categories} />
    </>
  )
}