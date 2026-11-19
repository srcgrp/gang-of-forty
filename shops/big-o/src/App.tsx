import Footer from "./components/Footer";
import Header from "./components/Header";
import CartPanel from "./components/CartPanel"
import { useEffect, useState } from "react";
import ShopMain from "./components/ShopMain";
import { useThemeStore } from "./hooks/useThemeStore";
import { useCartStore } from "./hooks/useCartStore";
import { cartCount } from "./cart/cartTotal";
import { useCatalog } from "./hooks/useCatalog";

export default function App() {
  const { state, retry } = useCatalog()
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const categories = state.status === "success" ? state.data.categories : []
  const shopName = state.status === "success" ? state.data.shop.name : "سوپر مارکت نمونه"
  const count = useCartStore((s) => cartCount(s.items))

  useEffect(() => { document.title = `${shopName} · ${count.toLocaleString("fa-IR")} 🛒` }, [shopName, count])

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
          onRetry={retry}
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