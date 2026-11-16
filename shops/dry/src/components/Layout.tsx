import { useEffect, useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { cartCount } from '../features/cart/rules/lines.ts'
import { formatNumber } from '../features/products/catalog/format.ts'
import { useCartStore } from '../hooks/useCartStore.ts'
import { useCatalog } from '../hooks/useCatalog.ts'
import { useThemeStore } from '../hooks/useThemeStore.ts'
import CartPanel from './CartPanel.tsx'
import Footer from './Footer.tsx'
import Header from './Header.tsx'
import LogoSprite from './LogoSprite.tsx'

const SHOP_NAME = 'MARTO'

export default function Layout() {
  const theme = useThemeStore((s) => s.theme)
  const count = useCartStore((s) => cartCount(s.lines))
  const { state } = useCatalog()
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    document.title = `${SHOP_NAME} · 🛒 ${formatNumber(count)}`
  }, [count])

  return (
    <div className="app" data-theme={theme}>
      <LogoSprite />
      <Header onCartClick={() => setCartOpen(true)} state={state} />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <CartPanel state={state} open={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </div>
  )
}