
import { useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import Header from './Header'
import Footer from './Footer'
import CartPanelContainer from './CartPanelContainer'
import { useThemeStore } from '../hooks/useThemeStore'
import { SearchContext } from '../SearchContext'

export default function Layout() {
  const theme = useThemeStore((state) => state.theme)
  const [query, setQuery] = useState('')

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <div className="app-container" data-theme={theme}>
        <Header />

        <main id="main-content" className="container">
          <Outlet />
          <CartPanelContainer />
        </main>

        <Footer />
      </div>
    </SearchContext.Provider>
  )
}
