import { useEffect, useState } from 'react'
import { fetchProducts } from './api/products.ts'
import { addItem, cartLines, cartSubtotal, removeItem, totalQuantity } from './cart/cart.ts'
import type { Cart, LoadState } from './types.ts'
import { errorMessage } from './lib/errorMessage.ts'
import Banners from './components/Banners.tsx'
import CartPanel from './components/CartPanel.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import ProductGrid from './components/ProductGrid.tsx'

export default function App() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cart, setCart] = useState<Cart>([])

  useEffect(() => {
    let ignore = false
    fetchProducts()
      .then((products) => {
        if (ignore) return
        setState(products.length === 0 ? { status: 'empty' } : { status: 'success', products })
      })
      .catch((err: unknown) => {
        if (ignore) return
        console.warn('بارگذاری محصولات ناموفق بود:', err)
        setState({ status: 'error', message: errorMessage(err) })
      })
    return () => {
      ignore = true
    }
  }, [])

  const products = state.status === 'success' ? state.products : []
  const lines = cartLines(cart, products)

  return (
    <>
      <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
      <Header cartCount={totalQuantity(cart)} />
      <main id="main" tabIndex={-1} className="wrap">
        <Hero />
        <CategoryNav categoryId={categoryId} onPick={setCategoryId} />
        <ProductGrid
          state={state}
          categoryId={categoryId}
          onAdd={(id) => setCart(addItem(cart, id))}
        />
        <CartPanel
          lines={lines}
          totalCount={totalQuantity(cart)}
          subtotal={cartSubtotal(lines)}
          onRemove={(id) => setCart(removeItem(cart, id))}
        />
        <Banners />
      </main>
      <Footer />
    </>
  )
}
