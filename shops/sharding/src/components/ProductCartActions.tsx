import { useRef } from 'react'
import { useCartStore } from '../hooks/useCartStore'
import type { Card } from '../shared/types'
import ProductQuantity from './ProductQuantity'

type ProductCartActionsProps = {
  card: Card
  variant: 'card' | 'detail'
}

export default function ProductCartActions({ card, variant }: ProductCartActionsProps) {
  const actionsRef = useRef<HTMLDivElement>(null)
  const qty = useCartStore((state) => state.lines[card.id] ?? 0)
  const add = useCartStore((state) => state.add)
  const remove = useCartStore((state) => state.remove)
  const isCard = variant === 'card'

  function addOne() {
    actionsRef.current?.classList.add('product__actions--pulse')
    add(card.id, card.stockQty)
  }

  function removeOne() {
    actionsRef.current?.classList.add('product__actions--pulse')
    remove(card.id, card.name)
  }

  const unavailableLabel = card.stockKnown
    ? `${card.name} ناموجود است`
    : `موجودی ${card.name} نامشخص است`

  const control = qty > 0 && (!isCard || card.inStock) ? (
    <ProductQuantity
      name={card.name}
      quantity={qty}
      max={card.stockQty}
      onAdd={addOne}
      onRemove={removeOne}
    />
  ) : (
    <button
      type="button"
      className={isCard ? 'product__add' : 'product-details__add'}
      onClick={addOne}
      disabled={!card.inStock}
      aria-label={isCard ? (card.inStock ? `افزودن ${card.name} به سبد` : unavailableLabel) : undefined}
    >
      {isCard ? <svg aria-hidden="true"><use href="./icons.svg#plus" /></svg> : 'افزودن به سبد'}
    </button>
  )

  if (!isCard) return control

  return (
    <div
      ref={actionsRef}
      className="product__actions"
      onAnimationEnd={(event) => event.currentTarget.classList.remove('product__actions--pulse')}
    >
      {control}
    </div>
  )
}
