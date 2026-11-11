import { useEffect, useState } from 'react'
import { addToCart, cartCount, removeFromCart } from './features/cart/rules/lines.ts'
import { loadState } from './features/products/api/load.ts'
import { cartSummary } from './features/products/catalog/cartView.ts'
import { loadCart, saveCart } from './features/cart/storage/cartStorage.ts'
import { formatNumber } from './features/products/catalog/format.ts'
import Blog from './components/Blog.tsx'
import CartPanel from './components/CartPanel.tsx'
import Catalog from './components/Catalog.tsx'
import CategoryGrid from './components/CategoryGrid.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import LogoSprite from './components/LogoSprite.tsx'
import PromoBanners from './components/PromoBanners.tsx'
import type { CartLine, LoadState } from './shared/types.ts'
import SaleSection from './components/SaleSection.tsx'

const SHOP_NAME = 'MARTO'

export default function App() {
  const [cart, setCart] = useState<CartLine[]>(() => loadCart())
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [query, setQuery] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)

    useEffect(() => {
    let ignore = false
    loadState().then((next) => { if (!ignore) setState(next) })
    return () => { ignore = true }
  }, [attempt])

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  useEffect(() => {
    document.title = `${SHOP_NAME} · 🛒 ${formatNumber(cartCount(cart))}`
  }, [cart])
  const summary = cartSummary(state, cart)
  const handleAdd = (id: number) => setCart(addToCart(cart, id))
  const handleRemove = (id: number) => setCart(removeFromCart(cart, id))
  const handleRetry = () => {
    setState({ status: 'loading' })
    setAttempt(attempt + 1)
  }

  return (
    <>
      <div id="top" />
      <LogoSprite />
            <Header count={cartCount(cart)} query={query} onQuery={setQuery} onCartClick={() => setCartOpen(true)} />
        <CategoryNav state={state} selected={categoryId} onPick={setCategoryId} />
      <main id="main">
        <Hero />
        <SaleSection />
        <CategoryGrid state={state} />
        <Catalog state={state} categoryId={categoryId} query={query} onAdd={handleAdd} onRetry={handleRetry} />
        <PromoBanners />
        <Blog />
        <CartPanel rows={summary.rows} total={summary.total} open={cartOpen} onClose={() => setCartOpen(false)} onRemove={handleRemove} />
      </main>
      <Footer />
    </>
  )
}