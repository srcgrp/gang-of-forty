import { useTheme } from './hooks/useTheme'
import { useUrlFilters } from './hooks/useUrlFilters'
import { useEffect, useState } from 'react'
import type { AppState, Cart, Offer } from './shared/types'
import { loadAllData } from './shared/api/load-all'
import { loadCart, saveCart } from './shared/storage/cart-storage'
import { stockOf } from './shared/logic/stock'
import { withCategoryImages } from './shared/logic/content-utils'
import { applyCartChange, cartCount } from './features/cart/logic/cart'
import { pruneCart } from './features/cart/cart-rows'
import { notyf } from './lib/toast'
import { fireConfetti } from './lib/confetti'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryNav from './components/CategoryNav'
import Footer from './components/Footer'
import CartPanel from './components/CartPanel'
import ProductsSection from './components/ProductsSection'
import MobileMenu from './components/MobileMenu'
import { BANNER_IMAGES } from './shared/content'
import { useScrollToHash } from './hooks/useScrollToHash'

const EMPTY_STATE: AppState = {
  shop: null, home: null, categories: [], products: [], stock: null,
  offerMap: new Map<number, Offer>(), cart: {}, res: { status: 'loading' },
}

export default function App() {
  const [theme, setTheme] = useTheme()
  const [filters, setFilters] = useUrlFilters()
  const [data, setData] = useState<AppState>(EMPTY_STATE)
  const [cart, setCart] = useState<Cart>(() => loadCart())
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSlow, setIsSlow] = useState(false)

  const loading = data.res.status === 'loading'
  
  // اسکرول بعد از لود داده‌ها
  useScrollToHash(!loading)

  const activeCategory = filters.category ? data.categories.find((c) => c.slug === filters.category) : undefined
  const categoryId = activeCategory?.id ?? null
  const query = filters.query

  useEffect(() => {
    if (!loading) {
      setIsSlow(false)
      return
    }
    const timer = setTimeout(() => setIsSlow(true), 3000)
    return () => clearTimeout(timer)
  }, [loading])

  useEffect(() => {
    let ignore = false
    loadAllData().then((result) => {
      if (ignore) return
      const newState: AppState = {
        shop: result.shop, home: result.home, categories: withCategoryImages(result.categories),
        products: result.products, stock: result.stock, offerMap: result.offerMap, cart: {}, res: result.res,
      }
      const prunedCart = pruneCart(newState)
      setData({ ...newState, cart: prunedCart })
      setCart(prunedCart)
    }).catch(() => {
      if (ignore) return
      setData((prev) => ({ ...prev, res: { status: 'error', message: 'داده‌های دریافتی معتبر نبودند.' } }))
    })
    return () => { ignore = true }
  }, [])

  useEffect(() => {
    saveCart(cart)
    setData(prev => ({ ...prev, cart }))
  }, [cart])

  const count = cartCount(cart)

  useEffect(() => {
    const shopName = data.shop?.name ?? 'فروشگاه'
    document.title = count > 0 ? `${shopName} · ${count} 🛒` : shopName
  }, [data.shop?.name, count])

  function handlePickCategory(id: number | null): void {
    const slug = id === null ? '' : data.categories.find((c) => c.id === id)?.slug ?? ''
    setFilters({ category: slug, query: filters.query }, 'push')
  }

  function handleQuery(next: string): void {
    setFilters({ category: filters.category, query: next })
  }

  function handleAdd(id: number): void {
    const max = stockOf(id, data.stock)
    const name = data.products.find((p) => p.id === id)?.name ?? 'کالا'
    const { cart: nextCart, result } = applyCartChange(cart, id, 'add', max)

    if (result.status === 'max') {
      notyf.error(`بیشتر از موجودی انبار ${name} نمی‌توانید اضافه کنید.`)
      return
    }
    if (result.status === 'noop') return

    setCart(nextCart)
    notyf.success(`${name} به سبد اضافه شد`)
    void fireConfetti()
  }

  function handleRemove(id: number): void {
    const name = data.products.find((p) => p.id === id)?.name ?? 'کالا'
    const { cart: nextCart, result } = applyCartChange(cart, id, 'remove', 0)

    if (result.status === 'noop') return
    setCart(nextCart)
    if (result.after === 0) notyf.error(`${name} از سبد حذف شد`)
  }

  function handleRemoveLine(id: number): void {
    const name = data.products.find((p) => p.id === id)?.name ?? 'کالا'
    const { cart: nextCart, result } = applyCartChange(cart, id, 'remove-line', 0)

    if (result.status === 'noop') return
    setCart(nextCart)
    notyf.error(`${name} از سبد حذف شد`)
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        <span className="container">پرش به محتوای اصلی</span>
      </a>
      
      <Header
        shopName={data.shop?.name ?? 'فروشگاه'}
        cartCount={count}
        theme={theme}
        loading={loading}
        onTheme={setTheme}
        onOpenCart={() => setCartOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
        products={data.products}
        categories={data.categories}
        cart={cart}
        query={query}
        onQuery={handleQuery}
        onAddToCart={handleAdd}
        onRemoveFromCart={handleRemove}
      />

      <main id="main-content" tabIndex={-1}>
        <Hero banners={BANNER_IMAGES} loading={loading} />
        <CategoryNav categories={data.categories} activeId={categoryId} onPick={handlePickCategory} loading={loading} />
        <ProductsSection
          data={data}
          cart={cart}
          activeCategoryId={categoryId}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </main>

      <Footer />
      
      <CartPanel 
        open={cartOpen} 
        cart={cart} 
        products={data.products} 
        offerMap={data.offerMap}
        onClose={() => setCartOpen(false)} 
        onRemoveLine={handleRemoveLine} 
      />
      
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} menu={data.shop?.menu ?? []} theme={theme} onTheme={setTheme} />

      {isSlow && (
        <div id="slow-connection" className="slow-connection" role="status">
          اتصال کند است؛ لطفاً کمی صبر کنید…
        </div>
      )}
    </>
  )
}