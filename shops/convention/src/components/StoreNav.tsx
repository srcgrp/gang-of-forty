import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useCatalog } from '../hooks/useCatalog'
import { useSearchStore } from '../hooks/useSearchStore'

const menuSlugs = ['dairy', 'drinks', 'snacks', 'bakery']

export default function StoreNav() {
  const [open, setOpen] = useState(false)
  const state = useCatalog()
  const setQuery = useSearchStore((store) => store.setQuery)
  const categories = state.status === 'success'
    ? menuSlugs.flatMap((slug) => state.data.categories.filter((category) => category.slug === slug)) : []
  function close() { setOpen(false); setQuery('') }
  return <nav className="main-nav" aria-label="منوی اصلی">
    <div className="container"><ul className="nav-list">
      <li className="products-menu" data-open={open}
        onPointerEnter={(event) => { if (event.pointerType === 'mouse') setOpen(true) }}
        onPointerLeave={() => setOpen(false)}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
        onKeyDown={(event) => { if (event.key === 'Escape') { setOpen(false); event.currentTarget.querySelector('button')?.focus() } }}>
        <button type="button" className="products-menu-toggle" aria-expanded={open}
          aria-controls="products-menu-panel" onClick={(event) => setOpen((value) => event.detail === 0 ? !value : true)}>
          <span className="hamburger-icon" aria-hidden="true">☰</span> همه محصولات
        </button>
        <div className="mega-menu" id="products-menu-panel">
          {categories.map((category) => <div className="mega-menu-column" key={category.id}>
            <h3><Link to="/plp/$carouselId" params={{ carouselId: category.slug }} search={{ sort: 'default' }} onClick={close}>{category.name}</Link></h3>
            {state.status === 'success' && state.data.products.filter((product) => product.categoryId === category.id).slice(0, 3).map((product) =>
              <Link key={product.id} to="/product/$productId" params={{ productId: String(product.id) }} onClick={close}>{product.name}</Link>)}
          </div>)}
          {state.status !== 'success' && <Link to="/" onClick={close}>مشاهده محصولات فروشگاه</Link>}
        </div>
      </li>
      <li><Link to="/" onClick={close}>خانه</Link></li>
      {categories.map((category) => <li key={category.id}>
        <Link to="/plp/$carouselId" params={{ carouselId: category.slug }} search={{ sort: 'default' }} onClick={close}>{category.name}</Link>
      </li>)}
    </ul></div>
  </nav>
}
