import Footer from "./components/Footer";
import Header from "./components/Header";
import type { CartItem, LoadState} from "./types"
import CartPanel from "./components/CartPanel"
import { useEffect, useState } from "react";
import { addToCart, decreaseItem } from "./cart/cartItems";
import ShopMain from "./components/ShopMain";
import { loadCart, saveCart } from "./storage/cart";
import { loadShopState } from "./api/loadState";

export default function App() {
  const [cart,setCart] = useState <CartItem[]> (() => loadCart())
  const [state, setState] = useState <LoadState> ({status: 'loading'})
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false
    loadShopState().then((next) => { if (!ignore) setState(next) })
    return () => { ignore = true }
  }, [attempt])

  useEffect(() => { saveCart(cart) }, [cart])

  const categories = state.status === "success" ? state.categories : []
  const shopName = state.status === "success" ? state.shop.name : "سوپر مارکت نمونه"
  const count = cart.reduce((sum, item) => sum + item.qty, 0)

  useEffect(() => { document.title = `${shopName} · ${count.toLocaleString("fa-IR")} 🛒` }, [shopName, count])

  function handleAdd(id: number) {
    if (state.status !== "success") return 
    const product = state.products.find((item) => item.id === id)
    if (product === undefined) return
    setCart(addToCart(cart, product)) 
  }

  const handleRemove = (id: number) => setCart(decreaseItem(cart, id))

  function handleRetry() {
    setState({ status: "loading" })
    setAttempt((n) => n + 1)
  }

  return (
    <>
      <a href="#main-content" className="skip-link">پرش به محتوای اصلی</a>
      <Header count={count} categories={categories} activeId={categoryId} onPick={setCategoryId} onCartClick={() => setCartOpen(true)}/>
      <main id="main-content">
        <ShopMain
          state={state}
          categoryId={categoryId}
          onAdd={handleAdd}
          onSelectCategory={setCategoryId}
          onRetry={handleRetry}
        />
      </main>
      <CartPanel
        items={cart}
        onAdd={handleAdd}
        onRemove={handleRemove}
        open={cartOpen}
        onClose={() => setCartOpen(false)} 
      />
      <Footer categories={categories} onSelect={setCategoryId} />
    </> 
  )
}