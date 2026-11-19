import { Outlet } from '@tanstack/react-router'
import { useThemeStore } from '../hooks/useThemeStore'
import Header from './Header'

export default function Layout() {
  const theme = useThemeStore((state) => state.theme)
  return <div className="app" data-theme={theme}>
    <a className="skip-link" href="#main-content">رفتن به محتوای اصلی</a>
    <Header />
    <main id="main-content" className="container"><Outlet /></main>
  </div>
}
