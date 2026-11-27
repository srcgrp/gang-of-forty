import { Outlet } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { cartCount } from "../cart/cartTotal"
import { useCartStore } from "../hooks/useCartStore"
import { useCatalog } from "../hooks/useCatalog"
import { useThemeStore } from "../hooks/useThemeStore"
import CartPanel from "./CartPanel"
import Footer from "./Footer"
import Header from "./Header"

export default function Layout() {
  const { state } = useCatalog()
  const [cartOpen, setCartOpen] = useState(false)
  const theme = useThemeStore((s) => s.theme)
  const count = useCartStore((s) => cartCount(s.items))

  const categories = state.status === "success" ? state.data.categories : []
  const shopName = state.status === "success" ? state.data.shop.name : "سوپر مارکت نمونه"

  useEffect(() => {
    document.title = `${shopName} · ${count.toLocaleString("fa-IR")} 🛒`
  }, [shopName, count])

  return (
    <div className="app" data-theme={theme}>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById("main-content")?.focus()
        }}
      >
        پرش به محتوای اصلی
      </a>
      <Header categories={categories} onCartClick={() => setCartOpen(true)} />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer categories={categories} />
    </div>
  )
}