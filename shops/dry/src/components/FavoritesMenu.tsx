import { useState } from 'react'
import { createPortal } from 'react-dom'
import { formatNumber } from '../features/products/catalog/format.ts'
import { cardsOf } from '../features/products/catalog/view.ts'
import { useFavorites } from '../hooks/useFavorites.ts'
import type { LoadState } from '../shared/types.ts'
import FavoritesDrawer from './FavoritesDrawer.tsx'

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

  return (
    <>
      <button type="button" aria-label="علاقه‌مندی‌ها" onClick={() => setOpen(true)}>
        <span aria-hidden="true">♥</span>{' '}
        <span className="cart-count">{formatNumber(cards.length)}</span>
      </button>
      {createPortal(
        <FavoritesDrawer
          open={open}
          cards={cards}
          onClose={() => setOpen(false)}
          onAdd={onAdd}
          onRemove={toggle}
        />,
        document.body,
      )}
    </>
  )
}