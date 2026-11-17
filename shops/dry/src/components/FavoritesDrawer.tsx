import { useEffect } from 'react'
import { showToast } from '../features/toast/toastStore.ts'
import type { Card } from '../shared/types.ts'

type FavoritesDrawerProps = {
  open: boolean
  cards: Card[]
  onClose: () => void
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function FavoritesDrawer({ open, cards, onClose, onAdd, onRemove }: FavoritesDrawerProps) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      <div className={open ? 'cart-backdrop open' : 'cart-backdrop'} onClick={onClose} />
      <aside className={open ? 'cart-panel open' : 'cart-panel'} aria-label="علاقه‌مندی‌ها">
        <div className="cart-head">
          <h2>علاقه‌مندی‌ها</h2>
          <button type="button" className="cart-close" aria-label="بستن علاقه‌مندی‌ها" onClick={onClose}>✕</button>
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
                <button type="button" aria-label={`حذف ${card.title} از علاقه‌مندی‌ها`} onClick={() => onRemove(card.id)}>
                  حذف
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  )
}