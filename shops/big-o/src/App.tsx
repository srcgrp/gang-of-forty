import Footer from "./components/Footer";
import Header from "./components/Header";
import type { Catalog, LoadState } from "./types"
import CartPanel from "./components/CartPanel"
import { useEffect, useState } from "react";
import ShopMain from "./components/ShopMain";
import { loadShopState } from "./api/loadState";
import { useThemeStore } from "./hooks/useThemeStore";
import { useCartStore } from "./hooks/useCartStore";
import { cartCount } from "./cart/cartTotal";

export default function App() {
  const [state, setState] = useState <LoadState<Catalog>> ({status: 'loading'})
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false
    loadShopState().then((next) => { if (!ignore) setState(next) })
    return () => { ignore = true }
  }, [attempt])

  const categories = state.status === "success" ? state.data.categories : []
  const shopName = state.status === "success" ? state.data.shop.name : "سوپر مارکت نمونه"
  const count = useCartStore((s) => cartCount(s.items))

  useEffect(() => { document.title = `${shopName} · ${count.toLocaleString("fa-IR")} 🛒` }, [shopName, count])


  function handleRetry() {
    setState({ status: "loading" })
    setAttempt((n) => n + 1)
  }
  const theme = useThemeStore((s) => s.theme)
  return (
    <div className="app" data-theme={theme}>
      <a href="#main-content" className="skip-link">پرش به محتوای اصلی</a>
      <Header categories={categories} activeId={categoryId} onPick={setCategoryId} onCartClick={() => setCartOpen(true)}/>
      <main id="main-content">
        <ShopMain
          state={state}
          categoryId={categoryId}
          onSelectCategory={setCategoryId}
          onRetry={handleRetry}
        />
      </main>
      <CartPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)} 
      />
      <Footer categories={categories} onSelect={setCategoryId} />
    </div> 
  )
}