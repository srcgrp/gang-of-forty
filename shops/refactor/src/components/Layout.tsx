import { useState } from 'react'
import { Outlet, useNavigate, useSearch } from '@tanstack/react-router'
import { anchorClick } from './safe-href'
import { useCatalog } from '../hooks/useCatalog'
import { useThemeStore } from '../hooks/useThemeStore'
import CartPanel from './CartPanel'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  const { state } = useCatalog()
  const theme = useThemeStore((s) => s.theme)
  const search = useSearch({ strict: false }) as { q?: string; category?: number | null }
  const [query, setQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="app" data-theme={theme}>
      <a className="skip-link" href="#content" onClick={(event) => anchorClick('#content')(event)}>پرش به محتوای اصلی</a>
      {state.status === 'success' && (
        <Header shop={state.data.shop} categories={state.data.categories} query={query}
          onQuery={(value) => { setQuery(value); navigate({ to: '/', search: { q: value, category: search.category ?? undefined } }) }}
          onOpenCart={() => setIsCartOpen(true)}
          onPickCategory={(id) => navigate({ to: '/', search: { q: search.q ?? '', category: id ?? undefined } })} />
      )}
      <Outlet />
      {state.status === 'success' && (
        <>
          <Footer shop={state.data.shop} categories={state.data.categories} />
          <div className={`cart-root${isCartOpen ? ' is-open' : ''}`}>
            <div className="cart-overlay" aria-hidden="true" onClick={() => setIsCartOpen(false)} />
            <CartPanel products={state.data.products} onClose={() => setIsCartOpen(false)} />
          </div>
        </>
      )}
    </div>
  )
}
