import { useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { useCatalog } from '../hooks/useCatalog.ts'
import { useThemeStore } from '../hooks/useThemeStore.ts'
import CartPanel from './CartPanel.tsx'
import Footer from './Footer.tsx'
import Header from './Header.tsx'
import LogoSprite from './LogoSprite.tsx'

export default function Layout() {
  const theme = useThemeStore((s) => s.theme)
  const { state } = useCatalog()
  const [cartOpen, setCartOpen] = useState(false)

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