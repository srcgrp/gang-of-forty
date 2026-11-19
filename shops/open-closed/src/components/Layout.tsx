import { Outlet } from '@tanstack/react-router'
import { useCartTitle } from '../hooks/useCartTitle.ts'
import { useThemeStore } from '../hooks/useThemeStore.ts'
import Footer from './Footer.tsx'
import Header from './Header.tsx'
import JumpLink from './JumpLink.tsx'

export default function Layout() {
  const theme = useThemeStore((s) => s.theme)
  useCartTitle()

  return (
    <div className="app" id="top" data-theme={theme}>
      <JumpLink className="skip-link" to="main">پرش به محتوای اصلی</JumpLink>
      <Header />
      <main id="main" tabIndex={-1} className="wrap">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}