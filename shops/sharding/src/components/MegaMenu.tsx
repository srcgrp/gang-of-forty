import { useState, useEffect } from 'react'
import type { Category, Product } from '../shared/types'
import MegaMenuItem from './MegaMenuItem'

type MegaMenuProps = {
  categories: Category[]
  products: Product[]
}

export default function MegaMenu({ categories, products }: MegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="mega-menu" data-state={open ? 'open' : undefined}>
      <button
        type="button"
        className="mega-menu__trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <svg className="mega-menu__trigger-icon" aria-hidden="true">
          <use href="./icons.svg#grid" />
        </svg>
        <span>همه دسته‌بندی‌ها</span>
      </button>

      <div className="mega-menu__panel" id="mega-menu-panel">
        <ul className="mega-menu__categories">
          {categories.map((category, index) => (
            <MegaMenuItem key={category.id} category={category}
              products={products.filter((product) => product.categoryId === category.id)}
              active={index === activeIndex} onFocus={() => setActiveIndex(index)}
              onClose={() => setOpen(false)} />
          ))}
        </ul>
      </div>
    </div>
  )
}