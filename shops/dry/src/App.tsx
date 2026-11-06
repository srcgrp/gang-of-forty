import { useState } from 'react'
import CartPanel from './components/CartPanel.tsx'
import CategoryGrid from './components/CategoryGrid.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import LogoSprite from './components/LogoSprite.tsx'
import ProductGrid from './components/ProductGrid.tsx'
import { addToCart, cartCount, removeFromCart } from './features/cart/rules/lines.ts'
import { inCategory, offerMap } from './features/products/catalog/select.ts'
import { toCard } from './features/products/catalog/toCard.ts'
import { SAMPLE_OFFERS, SAMPLE_PRODUCTS, SAMPLE_STOCK } from './sample.ts'
import type { Card, CartLine, Product } from './shared/types.ts'
import Blog from './components/Blog.tsx'
import PromoBanners from './components/PromoBanners.tsx'

export default function App() {
  const [cart, setCart] = useState<CartLine[]>([])
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const offers = offerMap(SAMPLE_OFFERS)
  const toCards = (products: Product[]): Card[] =>
    products.map((p) => toCard(p, SAMPLE_STOCK, offers.get(p.id)))

  const allCards = toCards(SAMPLE_PRODUCTS)
  const shownCards = toCards(
    categoryId === null ? SAMPLE_PRODUCTS : inCategory(SAMPLE_PRODUCTS, categoryId),
  )
  const count = cartCount(cart)

  function handleAdd(id: number) {
    setCart(addToCart(cart, id))
  }

  function handleRemove(id: number) {
    setCart(removeFromCart(cart, id))
  }

  return (
    <>
     <div id="top" />
      <LogoSprite />
      <Header count={count} />
      <CategoryNav selected={categoryId} onPick={setCategoryId} />
      <main id="main">
        <Hero />
        <CategoryGrid />
        <ProductGrid
          id="products"
          title="محصولات"
          prefix="product"
          cards={shownCards}
          onAdd={handleAdd}
        />
        <PromoBanners />
        <Blog />
        <CartPanel lines={cart} cards={allCards} onRemove={handleRemove} />
      </main>
      <Footer />
    </>
  )
}