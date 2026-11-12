import Ads from "./components/Ads";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import type { CardInfo, CartItem, Product } from "./types"
import CartPanel from "./components/CartPanel"
import ProductGrid from "./components/ProductGrid";
import { useState } from "react";
import { addToCart, decreaseItem } from "./cart/cartItems";

const SAMPLE: Product[] = [
  { id: 1, categoryId: 1, name: "شیر کم‌چرب", emoji: "🥛", unit: "۱ لیتر", price: 38000, tags: [] },
  { id: 2, categoryId: 1, name: "پنیر لیقوان", emoji: "🧀", unit: "۴۰۰ گرم", price: 165000, tags: [] },
  { id: 3, categoryId: 1, name: "ماست چکیده", emoji: "🥣", unit: "۷۵۰ گرم", price: 69000, tags: [] },
]

const INFO: Record<number, CardInfo> = {
  2: { percent: 20, label: "تخفیف ویژه", finalPrice: 132000 },
  3: { inStock: false },
}


export default function App() {
  const [cart,setCart] = useState <CartItem[]> ([])
  const count = cart.reduce((sum, item) => sum + item.qty, 0)

  function handleAdd (id: number) {
    const product = SAMPLE.find((item) => item.id === id)
    if (product === undefined)  return 
    setCart(addToCart(cart, product)) 
  }

  function handleRemove (id: number) {
      setCart(decreaseItem(cart, id))
  }

  return (
    <>
      <a href="#main-content" className="skip-link">پرش به محتوای اصلی</a>
      <Header count={count}/>
      <main id="main-content">
        <Hero />
        <ProductGrid
          sectionId="special-products"
          title="پیشنهاد ویژه امروز"
          products={SAMPLE}
          getInfo={(p) => INFO[p.id] ?? {}}
          onAdd={handleAdd}
        />
        <Ads />
      </main>
      <CartPanel
        items={cart}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
      <Footer />
    </>
    
  )
}