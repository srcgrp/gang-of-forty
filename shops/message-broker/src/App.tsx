import { useThemeStore } from './hooks/useThemeStore'
import { useState } from 'react'
import { cartCount, cartTotal } from './cart/cart'
import { useCart } from './ui/useCart'
import { useDocumentTitle } from './ui/useDocumentTitle'
import { useShopData } from './ui/useShopData'
import Header from './components/Header'
import Hero from './components/Hero'
import ShopContent from './components/ShopContent'
import Footer from './components/Footer'

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const { categories, offers, home, shop, loadState } = useShopData()
  const { cart, handleAdd, handleRemove } = useCart()
  useDocumentTitle(cart)

  const theme = useThemeStore((s) => s.theme)
  const products = loadState.status === 'success' ? loadState.products : []
  const itemCount = cartCount(cart)
  const total = cartTotal(cart, products, offers)

  return (
    <div className="app" data-theme={theme}>
      <Header itemCount={itemCount} categories={categories} shop={shop} />
      <main id="main">
        <Hero home={home} />
        <ShopContent
          categories={categories}
          categoryId={categoryId}
          onPick={setCategoryId}
          loadState={loadState}
          products={products}
          offers={offers}
          home={home}
          cart={cart}
          total={total}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </main>
      <Footer shop={shop} />
    </div>
  )
}
