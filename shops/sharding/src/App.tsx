import { useEffect, useState } from 'react'
import type { AppState, Cart, Offer } from './shared/types'
import { loadAllData } from './shared/api/load-all'
import { loadCart, saveCart } from './shared/storage/cart-storage'
import { stockOf } from './shared/logic/stock'
import { withCategoryImages } from './shared/logic/content-utils'
import { addToCart, removeFromCart, removeLine, cartCount } from './features/cart/logic/cart'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryNav from './components/CategoryNav'
import Footer from './components/Footer'
import CartPanel from './components/CartPanel'
import ProductsSection from './components/ProductsSection'
import { BANNER_IMAGES } from './shared/content'

const EMPTY_STATE: AppState = {
  shop: null,
  home: null,
  categories: [],
  products: [],
  stock: null,
  offerMap: new Map<number, Offer>(),
  cart: {},
  res: { status: 'loading' },
}

export default function App() {
  const [data, setData] = useState<AppState>(EMPTY_STATE)
  const [cart, setCart] = useState<Cart>(() => loadCart())
  const [cartOpen, setCartOpen] = useState(false)
  const [categoryId, setCategoryId] = useState<number | null>(null)

  useEffect(() => {
    let ignore = false

    loadAllData()
      .then((result) => {
        if (ignore) return
        setData({
          shop: result.shop,
          home: result.home,
          categories: withCategoryImages(result.categories),
          products: result.products,
          stock: result.stock,
          offerMap: result.offerMap,
          cart: {},
          res: result.res,
        })
      })
      .catch(() => {
        if (ignore) return
        setData((prev) => ({
          ...prev,
          res: {
            status: 'error',
            message: 'داده‌های دریافتی معتبر نبودند. لطفاً دوباره تلاش کنید.',
          },
        }))
      })

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  const count = cartCount(cart)

  useEffect(() => {
    const shopName = data.shop?.name ?? 'فروشگاه'
    const countPart = count > 0 ? ` · ${count} 🛒` : ''
    document.title = `${shopName}${countPart}`
  }, [data.shop?.name, count])

  const visibleProducts = categoryId === null
    ? data.products
    : data.products.filter((p) => p.categoryId === categoryId)

  function handleAdd(id: number): void {
    const max = stockOf(id, data.stock)
    setCart((prev) => addToCart(prev, id, max))
  }

  function handleRemove(id: number): void {
    setCart((prev) => removeFromCart(prev, id))
  }

  function handleRemoveLine(id: number): void {
    setCart((prev) => removeLine(prev, id))
  }

  return (
    <>
      <Header
        shopName={data.shop?.name ?? 'فروشگاه'}
        cartCount={count}
        onOpenCart={() => setCartOpen(true)}
      />

      <main id="main-content" tabIndex={-1}>
        <Hero banners={BANNER_IMAGES} />
        <CategoryNav
          categories={data.categories}
          activeId={categoryId}
          onPick={setCategoryId}
        />
        <ProductsSection
          res={data.res}
          products={visibleProducts}
          cart={cart}
          stock={data.stock}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </main>

      <Footer />
      <CartPanel
        open={cartOpen}
        cart={cart}
        products={data.products}
        onClose={() => setCartOpen(false)}
        onRemoveLine={handleRemoveLine}
      />
    </>
  )
}