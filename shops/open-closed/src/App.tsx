import { useEffect, useState } from 'react'
import { fetchProducts } from './api/products.ts'
import { addItem, cartLines, cartSubtotal, removeItem, totalQuantity } from './cart/cart.ts'
import { loadCart, saveCart } from './storage/cart.ts'
import type { Cart, LoadState } from './types.ts'
import { formatCount } from './lib/format.ts'
import { errorMessage } from './lib/errorMessage.ts'
import Banners from './components/Banners.tsx'
import CartPanel from './components/CartPanel.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import ProductGrid from './components/ProductGrid.tsx'

const SHOP_NAME = 'سوپرمارکت باز-بسته'

export default function App() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cart, setCart] = useState<Cart>(() => loadCart())

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

  const count = totalQuantity(cart)

  useEffect(() => {
    saveCart(cart)
    document.title = count > 0 ? `${SHOP_NAME} · ${formatCount(count)} 🛒` : SHOP_NAME
  }, [cart, count])

  const lines = cartLines(cart, state.status === 'success' ? state.products : [])
  const handleAdd = (id: number) => setCart(addItem(cart, id))
  const handleRemove = (id: number) => setCart(removeItem(cart, id))

  return (
    <>
      <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
      <Header cartCount={count} />
      <main id="main" tabIndex={-1} className="wrap">
        <Hero />
        <CategoryNav categoryId={categoryId} onPick={setCategoryId} />
        <ProductGrid state={state} categoryId={categoryId} onAdd={handleAdd} />
        <CartPanel lines={lines} totalCount={count} subtotal={cartSubtotal(lines)} onRemove={handleRemove} />
        <Banners />
      </main>
      <Footer />
    </>
  )
}
