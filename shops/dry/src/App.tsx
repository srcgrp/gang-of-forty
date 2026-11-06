import { useEffect, useState } from 'react'
import { addToCart, cartCount, removeFromCart } from './features/cart/rules/lines.ts'
import { loadState } from './features/products/api/load.ts'
import { cardsOf } from './features/products/catalog/view.ts'
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

export default function App() {
  const [cart, setCart] = useState<CartLine[]>([])
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let ignore = false
    loadState().then((next) => {
      if (!ignore) setState(next)
    })
    return () => {
      ignore = true
    }
  }, [])

  const cards = state.status === 'success' ? cardsOf(state) : []
  const handleAdd = (id: number) => setCart(addToCart(cart, id))
  const handleRemove = (id: number) => setCart(removeFromCart(cart, id))

  return (
    <>
      <div id="top" />
      <LogoSprite />
      <Header count={cartCount(cart)} />
      <CategoryNav selected={categoryId} onPick={setCategoryId} />
      <main id="main">
        <Hero />
        <CategoryGrid onPick={setCategoryId} />
        <Catalog state={state} categoryId={categoryId} onAdd={handleAdd} />
        <PromoBanners />
        <Blog />
        <CartPanel lines={cart} cards={cards} onRemove={handleRemove} />
      </main>
      <Footer />
    </>
  )
}