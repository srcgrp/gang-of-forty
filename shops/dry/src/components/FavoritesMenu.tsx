import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { formatNumber } from '../features/products/catalog/format.ts'
import { cardsOf } from '../features/products/catalog/view.ts'
import { showToast } from '../features/toast/toastStore.ts'
import { useFavorites } from '../hooks/useFavorites.ts'
import type { LoadState } from '../shared/types.ts'

type FavoritesMenuProps = {
  state: LoadState
  onAdd: (id: number) => void
}

export default function FavoritesMenu({ state, onAdd }: FavoritesMenuProps) {
  const [open, setOpen] = useState(false)
  const { favorites, toggle } = useFavorites()
  const cards = state.status === 'success'
    ? cardsOf(state, state.products.filter((p) => favorites.includes(p.id)))
    : []

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const drawer = (
    <>
      <div className={open ? 'cart-backdrop open' : 'cart-backdrop'} onClick={() => setOpen(false)} />
      <aside className={open ? 'cart-panel open' : 'cart-panel'} aria-label="علاقه‌مندی‌ها">
        <div className="cart-head">
          <h2>علاقه‌مندی‌ها</h2>
          <button type="button" className="cart-close" aria-label="بستن علاقه‌مندی‌ها" onClick={() => setOpen(false)}>✕</button>
        </div>
        {cards.length === 0 ? (
          <p className="cart-empty">هنوز محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
        ) : (
          <ul>
            {cards.map((card) => (
              <li key={card.id}>
                <span>{card.title}</span>
                <button
                  type="button"
                  className="fav-add"
                  disabled={!card.inStock}
                  aria-label={`افزودن ${card.title} به سبد`}
                  onClick={() => {
                    onAdd(card.id)
                    showToast(`${card.title} به سبد اضافه شد`)
                  }}
                >
                  {card.inStock ? 'افزودن به سبد' : 'ناموجود'}
                </button>
                <button type="button" aria-label={`حذف ${card.title} از علاقه‌مندی‌ها`} onClick={() => toggle(card.id)}>
                  حذف
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  )

  return (
    <>
      <button type="button" aria-label="علاقه‌مندی‌ها" onClick={() => setOpen(true)}>
        <span aria-hidden="true">♥</span>{' '}
        <span className="cart-count">{formatNumber(cards.length)}</span>
      </button>
      {createPortal(drawer, document.body)}
    </>
  )
}