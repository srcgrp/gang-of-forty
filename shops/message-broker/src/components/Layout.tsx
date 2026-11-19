import { Outlet } from '@tanstack/react-router'
import Header from './Header'
import Footer from './Footer'
import { useCatalog } from '../hooks/useCatalog'
import { useThemeStore } from '../hooks/useThemeStore'
import { useDocumentTitle } from '../ui/useDocumentTitle'

export default function Layout() {
  const state = useCatalog()
  const theme = useThemeStore((s) => s.theme)

  useDocumentTitle()

  const categories =
    state.status === 'success' ? state.categories : []

  const shop =
    state.status === 'success' ? state.shop : null

  return (
    <div className="app" data-theme={theme}>
      <Header categories={categories} shop={shop} />
      <Outlet />
      <Footer shop={shop} />
    </div>
  )
}
