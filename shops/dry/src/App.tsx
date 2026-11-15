import { useEffect, useState } from 'react'
import { cartCount } from './features/cart/rules/lines.ts'
import { loadState } from './features/products/api/load.ts'
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
import SaleSection from './components/SaleSection.tsx'
import { useCartStore } from './hooks/useCartStore.ts'
import { useThemeStore } from './hooks/useThemeStore.ts'
import type { LoadState } from './shared/types.ts'

const SHOP_NAME = 'MARTO'

export default function App() {
  const theme = useThemeStore((s) => s.theme)
  const count = useCartStore((s) => cartCount(s.lines))
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
    document.title = `${SHOP_NAME} · 🛒 ${formatNumber(count)}`
  }, [count])

  const handleRetry = () => {
    setState({ status: 'loading' })
    setAttempt(attempt + 1)
  }

  return (
    <div className="app" data-theme={theme}>
      <div id="top" />
      <LogoSprite />
      <Header query={query} onQuery={setQuery} onCartClick={() => setCartOpen(true)} state={state} />
      <CategoryNav state={state} selected={categoryId} onPick={setCategoryId} />
      <main id="main">
        <Hero />
        <SaleSection />
        <CategoryGrid state={state} />
        <Catalog state={state} categoryId={categoryId} query={query} onRetry={handleRetry} />
        <PromoBanners />
        <Blog />
        <CartPanel state={state} open={cartOpen} onClose={() => setCartOpen(false)} />
      </main>
      <Footer />
    </div>
  )
}