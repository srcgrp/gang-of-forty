import { useEffect, useState } from 'react'
import type { Cart, CartChange } from './shared/types'
import { loadAllData } from './shared/api/load-all'
import { initialShopData, shopLoadError } from './shared/state/shop-data'
import { loadCart, saveCart } from './shared/storage/cart-storage'
import { stockOf } from './shared/logic/stock'
import { withCategoryImages } from './shared/logic/content-utils'
import { applyCartChange, cartCount } from './features/cart/logic/cart'
import { pruneCart } from './features/cart/cart-rows'
import { useTheme } from './hooks/useTheme'
import { useUrlFilters } from './hooks/useUrlFilters'
import { showCartChange } from './lib/cart-feedback'
import ShopPage from './components/ShopPage'

export default function App() {
  const theme = useTheme()
  const filters = useUrlFilters()
  const [data, setData] = useState(initialShopData)
  const [cart, setCart] = useState<Cart>(() => loadCart())
  const cartPanel = useState(false)
  const mobileMenu = useState(false)
  const [attempt, setAttempt] = useState(0)
  const count = cartCount(cart)

  useEffect(() => {
    let ignore = false
    loadAllData().then((result) => {
      if (ignore) return
      const next = { ...result, categories: withCategoryImages(result.categories) }
      setData(next)
      if (result.skippedProducts === 0) setCart((current) => pruneCart({ ...next, cart: current }))
    }).catch((error: unknown) => {
      if (ignore) return
      const res = shopLoadError(error)
      setData((current) => ({ ...current, res }))
    })
    return () => { ignore = true }
  }, [attempt])

  useEffect(() => { saveCart(cart) }, [cart])
  useEffect(() => {
    const name = data.shop?.name ?? 'فروشگاه'
    document.title = count > 0 ? `${name} · ${count.toLocaleString('fa-IR')} 🛒` : name
  }, [data.shop?.name, count])

  function changeCart(id: number, change: CartChange): void {
    const max = stockOf(id, data.stock)
    const { cart: nextCart, result } = applyCartChange(cart, id, change, max)
    const name = data.products.find((product) => product.id === id)?.name ?? 'کالا'
    if (!showCartChange(change, name, result)) return
    setCart(nextCart)
  }

  function retry(): void {
    setData((current) => ({ ...current, res: { status: 'loading' } }))
    setAttempt((current) => current + 1)
  }

  return (
    <ShopPage
      data={{ ...data, cart }}
      filters={filters}
      theme={theme}
      cartPanel={cartPanel}
      mobileMenu={mobileMenu}
      onCartChange={changeCart}
      onRetry={retry}
    />
  )
}
