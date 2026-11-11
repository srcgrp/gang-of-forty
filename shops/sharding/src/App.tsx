import { useEffect, useState } from 'react'
import type { AppState, Cart, CartChange } from './shared/types'
import { loadAllData } from './shared/api/load-all'
import { loadCart, saveCart } from './shared/storage/cart-storage'
import { stockOf } from './shared/logic/stock'
import { withCategoryImages } from './shared/logic/content-utils'
import { applyCartChange, cartCount } from './features/cart/logic/cart'
import { pruneCart } from './features/cart/cart-rows'
import { useTheme } from './hooks/useTheme'
import { useUrlFilters } from './hooks/useUrlFilters'
import { notyf } from './lib/toast'
import { fireConfetti } from './lib/confetti'
import ShopPage from './components/ShopPage'

const EMPTY_STATE: Omit<AppState, 'cart'> = {
  shop: null, home: null, categories: [], products: [], stock: null,
  offerMap: new Map(), res: { status: 'loading' },
}

export default function App() {
  const [theme, setTheme] = useTheme()
  const [filters, setFilters] = useUrlFilters()
  const [data, setData] = useState<Omit<AppState, 'cart'>>(EMPTY_STATE)
  const [cart, setCart] = useState<Cart>(() => loadCart())
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const count = cartCount(cart)

  useEffect(() => {
    let ignore = false
    loadAllData().then((result) => {
      if (ignore) return
      const next = { ...result, categories: withCategoryImages(result.categories) }
      setData(next)
      setCart((current) => pruneCart({ ...next, cart: current }))
    }).catch(() => {
      if (!ignore) setData((current) => ({ ...current, res: { status: 'error', message: 'دریافت اطلاعات ناموفق بود.' } }))
    })
    return () => { ignore = true }
  }, [attempt])

  useEffect(() => { saveCart(cart) }, [cart])
  useEffect(() => {
    const name = data.shop?.name ?? 'فروشگاه'
    document.title = count > 0 ? `${name} · ${count} 🛒` : name
  }, [data.shop?.name, count])

  function changeCart(id: number, change: CartChange): void {
    const max = stockOf(id, data.stock)
    if (change === 'add' && (cart[id] ?? 0) >= max) {
      notyf.error('امکان افزودن بیش از موجودی کالا وجود ندارد.')
      return
    }
    setCart((current) => applyCartChange(current, id, change, max).cart)
    if (change === 'add') {
      notyf.success('کالا به سبد اضافه شد')
      void fireConfetti()
    } else if ((cart[id] ?? 0) > 0) {
      const name = data.products.find((product) => product.id === id)?.name ?? 'کالا'
      const removed = change === 'remove-line' || cart[id] === 1
      notyf.error(removed ? `${name} از سبد حذف شد` : `تعداد ${name} کم شد`)
    }
  }

  function retry(): void {
    setData((current) => ({ ...current, res: { status: 'loading' } }))
    setAttempt((current) => current + 1)
  }

  return (
    <ShopPage data={{ ...data, cart }} filters={filters} onFilters={setFilters}
      theme={theme} onTheme={setTheme} count={count} onCartChange={changeCart}
      cartOpen={cartOpen} onCartOpen={setCartOpen} menuOpen={menuOpen} onMenuOpen={setMenuOpen} onRetry={retry} />
  )
}
