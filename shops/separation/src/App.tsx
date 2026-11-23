import { useEffect, useState } from 'react'
import { loadCategories, loadOffers, loadProducts, loadStock } from './api/loadShop.ts'
import { addLine, cartCount, cartTotal, joinCart, removeLine } from './cart/cart.ts'
import { filterProducts } from './catalog/filter.ts'
import { priceOf } from './catalog/offers.ts'
import { loadCart, saveCart } from './storage/cartStorage.ts'
import type { CartLine, Category, LoadState, Offer, StockMap } from './types.ts'
import CartPanel from './components/CartPanel.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import ProductGrid from './components/ProductGrid.tsx'
import SaleCountdown from './components/SaleCountdown.tsx'
import Status from './components/Status.tsx'

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<CartLine[]>(() => loadCart())
  const [load, setLoad] = useState<LoadState>({ status: 'loading' })
  const [cats, setCats] = useState<Category[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [stock, setStock] = useState<StockMap>({})
  const [attempt, setAttempt] = useState(0)
  const [showSale, setShowSale] = useState(true)
  useEffect(() => {
    let ignore = false
    Promise.all([loadProducts(), loadCategories(), loadOffers(), loadStock()])
      .then(([products, categories, offerList, s]) => {
        if (ignore) return
        setCats(categories)
        setOffers(offerList)
        if (s !== null) setStock(s.items)
        setLoad(products.length === 0 ? { status: 'empty' } : { status: 'success', products })
      })
      .catch((err: unknown) => {
        if (ignore) return
        setLoad({ status: 'error', message: err instanceof Error ? err.message : 'خطا' })
      })
    return () => { ignore = true }
  }, [attempt])
  useEffect(() => { saveCart(cart) }, [cart])
  useEffect(() => { document.title = `yaldastore · ${cartCount(cart).toLocaleString('fa-IR')} 🛒` }, [cart])
  const products = load.status === 'success' ? load.products : []
  const items = filterProducts(products, categoryId ?? undefined, query).map((p) => priceOf(p, offers, stock))
  return (
    <>
      <Header cartCount={cartCount(cart)} query={query} onQuery={setQuery} />
      <main id="main">
        <Hero />
        <button type="button" onClick={() => setShowSale((v) => !v)}>
          {showSale ? 'بستن شمارش معکوس' : 'نمایش شمارش معکوس'}
        </button>
        {showSale ? <SaleCountdown start={300} /> : null}
        <Status state={load} onRetry={() => { setLoad({ status: 'loading' }); setAttempt((a) => a + 1) }} />
        {load.status === 'success' ? (
          <>
            <CategoryNav categories={cats} activeId={categoryId} onPick={setCategoryId} />
            <ProductGrid title="🔥 پیشنهاد ویژه امروز" items={items} onAdd={(id) => setCart(addLine(cart, id))} />
          </>
        ) : null}
        <CartPanel lines={joinCart(cart, products)} total={cartTotal(cart, products)} count={cartCount(cart)} onRemove={(id) => setCart(removeLine(cart, id))} onClear={() => setCart([])} />
      </main>
      <Footer />
    </>
  )
}
