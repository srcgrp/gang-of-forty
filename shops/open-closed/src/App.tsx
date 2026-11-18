import { useEffect, useState } from 'react'
import { fetchProducts } from './api/products.ts'
import { totalQuantity } from './cart/cart.ts'
import { useCartStore } from './hooks/useCartStore.ts'
import { useThemeStore } from './hooks/useThemeStore.ts'
import type { LoadState } from './types.ts'
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
  const theme = useThemeStore((s) => s.theme)
  const count = useCartStore((s) => totalQuantity(s.cart))

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

  useEffect(() => {
    document.title = count > 0 ? `${SHOP_NAME} · ${formatCount(count)} 🛒` : SHOP_NAME
  }, [count])

  const products = state.status === 'success' ? state.products : []

  return (
    <div className="app" data-theme={theme}>
      <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
      <Header />
      <main id="main" tabIndex={-1} className="wrap">
        <Hero />
        <CategoryNav categoryId={categoryId} onPick={setCategoryId} />
        <ProductGrid state={state} categoryId={categoryId} />
        <CartPanel products={products} />
        <Banners />
      </main>
      <Footer />
    </div>
  )
}