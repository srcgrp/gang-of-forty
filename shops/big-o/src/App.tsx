import Ads from "./components/Ads";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import type { CardInfo, CartItem, Product } from "./types"
import CartPanel from "./components/CartPanel"
import ProductGrid from "./components/ProductGrid";

const SAMPLE: Product[] = [
  { id: 1, categoryId: 1, name: "شیر کم‌چرب", emoji: "🥛", unit: "۱ لیتر", price: 38000, tags: [] },
  { id: 2, categoryId: 1, name: "پنیر لیقوان", emoji: "🧀", unit: "۴۰۰ گرم", price: 165000, tags: [] },
  { id: 3, categoryId: 1, name: "ماست چکیده", emoji: "🥣", unit: "۷۵۰ گرم", price: 69000, tags: [] },
]

const INFO: Record<number, CardInfo> = {
  2: { percent: 20, label: "تخفیف ویژه", finalPrice: 132000 },
  3: { inStock: false },
}

const CART: CartItem[] = [
  { id: 1, name: "شیر کم‌چرب", price: 38000, qty: 2 },
  { id: 2, name: "پنیر لیقوان", price: 132000, qty: 1 },
]


export default function App() {
  const count = CART.reduce((sum, item) => sum + item.qty, 0)
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
          onAdd={(id) => console.log("add", id)}
        />
        <Ads />
      </main>
      <CartPanel
        items={CART}
        onAdd={(id) => console.log("add", id)}
        onRemove={(id) => console.log("remove", id)}
      />
      <Footer />
    </>
    
  )
}