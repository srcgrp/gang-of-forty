import { Outlet } from '@tanstack/react-router'
import Header from './Header'
import Footer from './Footer'
import CartPanelContainer from './CartPanelContainer'
import { useThemeStore } from '../hooks/useThemeStore'

export default function Layout() {
  const theme = useThemeStore((state) => state.theme)

  return (
    <div className="app-container" data-theme={theme}>
      <Header />
      <main id="main-content" className="container">
        <Outlet />
        <CartPanelContainer />
      </main>
      <Footer />
    </div>
  )
}