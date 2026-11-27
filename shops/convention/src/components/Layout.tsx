import { useRef } from 'react'
import { Outlet } from '@tanstack/react-router'
import { useThemeStore } from '../hooks/useThemeStore'
import Header from './Header'

export default function Layout() {
  const theme = useThemeStore((state) => state.theme)
  const main = useRef<HTMLElement>(null)
  return <div className="app" data-theme={theme}>
    <a className="skip-link" href="#main-content" onClick={(event) => {
      event.preventDefault()
      main.current?.focus()
    }}>رفتن به محتوای اصلی</a>
    <Header />
    <main ref={main} tabIndex={-1} id="main-content" className="container"><Outlet /></main>
  </div>
}
