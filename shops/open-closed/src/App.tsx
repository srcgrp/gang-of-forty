import { useState } from 'react'
import { catalogProducts } from './catalog/catalog.ts'
import { useCartTitle } from './hooks/useCartTitle.ts'
import { useCatalog } from './hooks/useCatalog.ts'
import { useThemeStore } from './hooks/useThemeStore.ts'
import Banners from './components/Banners.tsx'
import CartPanel from './components/CartPanel.tsx'
import CategoryNav from './components/CategoryNav.tsx'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import ProductGrid from './components/ProductGrid.tsx'

export default function App() {
  const state = useCatalog()
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const theme = useThemeStore((s) => s.theme)
  useCartTitle()

  return (
    <div className="app" data-theme={theme}>
      <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
      <Header />
      <main id="main" tabIndex={-1} className="wrap">
        <Hero />
        <CategoryNav categoryId={categoryId} onPick={setCategoryId} />
        <ProductGrid state={state} categoryId={categoryId} />
        <CartPanel products={catalogProducts(state)} />
        <Banners />
      </main>
      <Footer />
    </div>
  )
}