import { useEffect, useState } from 'react'
import { loadCategories, loadOffers, loadProducts, loadStock } from './api/loadShop.ts'
import { addLine, cartCount, cartTotal, joinCart, removeLine } from './cart/cart.ts'
import { priceOf } from './catalog/offers.ts'
import type { CartLine, Category, LoadState, Offer, StockMap } from './types.ts'
import CartPanel from './components/CartPanel.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import ProductGrid from './components/ProductGrid.tsx'
import Status from './components/Status.tsx'

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cart, setCart] = useState<CartLine[]>([])
  const [load, setLoad] = useState<LoadState>({ status: 'loading' })
  const [cats, setCats] = useState<Category[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [stock, setStock] = useState<StockMap>({})
  useEffect(() => {
    let ignore = false
    Promise.all([loadProducts(), loadCategories(), loadOffers(), loadStock()])
      .then(([products, categories, offerList, s]) => {
        if (ignore) return
        setCats(categories)
        setOffers(offerList)
        if (s !== null) setStock(s.items)
        if (products.length === 0) setLoad({ status: 'empty' })
        else setLoad({ status: 'success', products })
      })
      .catch((err: unknown) => {
        if (ignore) return
        setLoad({ status: 'error', message: err instanceof Error ? err.message : 'خطا' })
      })
    return () => {
      ignore = true
    }
  }, [])
  const products = load.status === 'success' ? load.products : []
  const filtered = categoryId === null ? products : products.filter((p) => p.categoryId === categoryId)
  const items = filtered.map((p) => priceOf(p, offers, stock))
  const lines = joinCart(cart, products)
  const total = cartTotal(cart, products)
  const count = cartCount(cart)
  return (
    <>
      <Header cartCount={count} />
      <main id="main">
        <Hero />
        <Status state={load} />
        {load.status === 'success' ? (
          <>
            <CategoryNav categories={cats} activeId={categoryId} onPick={setCategoryId} />
            <ProductGrid title="🔥 پیشنهاد ویژه امروز" items={items} onAdd={(id) => setCart(addLine(cart, id))} />
          </>
        ) : null}
        <CartPanel
          lines={lines}
          total={total}
          count={count}
          onRemove={(id) => setCart(removeLine(cart, id))}
          onClear={() => setCart([])}
        />
      </main>
      <Footer />
    </>
  )
}
