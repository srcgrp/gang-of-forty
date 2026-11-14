import { useEffect, useState } from 'react'
import type { CartItem, LoadState } from './types'
import { loadShop } from './api/load-shop'
import confetti from 'canvas-confetti'
import { addToCart, cartCount, cartLines, cartTotal, changeQuantity, removeFromCart } from './features/cart/calculate'
import ShopPage from './components/ShopPage'
import Status from './components/Status'
import { readCart, writeCart } from './storage/cart'

export default function App() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cart, setCart] = useState<CartItem[]>(() => readCart())
  const [query, setQuery] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [showCountdown, setShowCountdown] = useState(true)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => { writeCart(cart) }, [cart])

  useEffect(() => {
    if (state.status !== 'success') return
    document.title = `${state.data.shop.name} · 🛒 ${cartCount(cartLines(cart, state.data.products)).toLocaleString("fa-IR")}`
  }, [cart, state])

  useEffect(() => {
    let ignore = false
    loadShop()
      .then((data) => { if (!ignore) setState({ status: data.products.length > 0 ? 'success' : 'empty', data }) })
      .catch((error: unknown) => { if (!ignore) setState({ status: 'error', message: error instanceof Error ? error.message : 'خطای ناشناخته' }) })
    return () => { ignore = true }
  }, [attempt])

  if (state.status !== 'success') {
    return <Status state={state} onRetry={() => { setState({ status: 'loading' }); setAttempt((count) => count + 1) }} />
  }

  const { products, categories, home, shop } = state.data
  const lines = cartLines(cart, products)

  return (
    <ShopPage
      products={products}
      categories={categories}
      home={home}
      shop={shop}
      lines={lines}
      total={cartTotal(lines)}
      count={cartCount(lines)}
      categoryId={categoryId}
      onPick={setCategoryId}
      query={query}
      onQuery={setQuery}
      showAll={showAll}
      onToggleAll={() => setShowAll((open) => !open)}
      onAdd={(id) => { setCart(addToCart(cart, id)); confetti({ particleCount: 70, spread: 70, origin: { y: 0.75 }, zIndex: 2000 }) }}
      onRemove={(id) => setCart(removeFromCart(cart, id))}
      onQuantity={(id, delta) => setCart(changeQuantity(cart, id, delta))}
      isCartOpen={isCartOpen}
      onOpenCart={() => setIsCartOpen(true)}
      onCloseCart={() => setIsCartOpen(false)}
      showCountdown={showCountdown}
      onCloseCountdown={() => setShowCountdown(false)}
      onShowCountdown={() => setShowCountdown(true)}
    />
  )
}
