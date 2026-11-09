import { useState } from 'react'
import type { Cart, Offer, Product, Stock } from './scripts/types'
import { addItem } from './scripts/logic/cart/add-item.ts'
import { removeItem } from './scripts/logic/cart/remove-item.ts'
import { cartCount, cartTotal, getCartLines } from './scripts/logic/cart/cart-lines.ts'
import { calculatePrice } from './scripts/logic/catalog/calculate-price.ts'
import { CATEGORIES, HOME, PRODUCTS, SHOP, OFFERS, STOCK } from './components/sampleData.ts'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import ProductGrid from './components/ProductGrid.tsx'
import Promos from './components/Promo.tsx'
import Footer from './components/Footer.tsx'


export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cart, setCart] = useState<Cart>({})

  const lines = getCartLines(cart, PRODUCTS).map((line) => ({
    ...line,
    price: calculatePrice(line.price, OFFERS.find((o) => o.productId === line.id)),
  }))
  const count = cartCount(cart)
  const total = cartTotal(lines)

  const availableStock: Stock = {
    ...STOCK,
    items: Object.fromEntries(
      Object.entries(STOCK.items).map(([id, quantity]) => [id, quantity - (cart[id] ?? 0)]),
    ),
  }

  const specialOffers = PRODUCTS.filter((p) =>
    OFFERS.some((o) => o.productId === p.id && o.label === 'پیشنهاد ویژه'),
  )

  const sections = CATEGORIES.filter((c) => categoryId === null || c.id === categoryId)
    .map((category) => ({
      category,
      items: PRODUCTS.filter((p) => p.categoryId === category.id),
    }))
    .filter((section) => section.items.length > 0)

  function handleAdd(id: number) {
    if ((availableStock.items[String(id)] ?? 0) <= 0) return
    setCart((prev) => addItem(prev, String(id)))
  }

  function handleRemove(id: number) {
    setCart((prev) => removeItem(prev, String(id)))
  }

  function handlePick(id: number) {
    setCategoryId((prev) => (prev === id ? null : id))
  }

  return (
    <>
      <Header
        shop={SHOP}
        categories={CATEGORIES}
        cartLines={lines}
        count={count}
        total={total}
        onRemove={handleRemove}
      />
      <main id="main-content">
        <Hero hero={HOME.hero} side={HOME.side} />
        <CategoryNav categories={CATEGORIES} activeId={categoryId} onPick={handlePick} />

        {specialOffers.length > 0 && (
          <ProductGrid
            id="offers"
            title="پیشنهاد ویژه"
            products={specialOffers}
            offers={OFFERS}
            stock={availableStock}
            categories={CATEGORIES}
            onAdd={handleAdd}
          />
        )}

        <Promos promos={HOME.promos ?? []} />

        {sections.length === 0 && <p>محصولی در این دسته وجود ندارد.</p>}

        {sections.map(({ category, items }) => (
          <ProductGrid
            key={category.id}
            id={category.slug}
            title={category.name}
            products={items}
            offers={OFFERS}
            stock={availableStock}
            categories={CATEGORIES}
            onAdd={handleAdd}
          />
        ))}
      </main>
      <Footer shop={SHOP} categories={CATEGORIES} />
    </>
  )
}