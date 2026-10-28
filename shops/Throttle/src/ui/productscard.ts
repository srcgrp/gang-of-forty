import type { CardData } from '../types'
import { createText } from './dom'
import { formatPrice } from './format'

export const createCard = ({ product, offer, price, stock }: CardData): HTMLLIElement => {
  const li: HTMLLIElement = document.createElement('li')
  li.className = stock > 0 ? 'card' : 'card sold-out'

  const add: HTMLButtonElement = createText('button', stock > 0 ? 'افزودن به سبد' : 'ناموجود', 'add')
  add.type = 'button'
  add.disabled = stock <= 0
  add.dataset.id = String(product.id)

  li.append(
    createText('span', product.emoji, 'emoji'),
    createText('h3', product.name),
    createText('p', product.unit, 'unit'),
  )
  if (offer !== undefined) {
    li.append(createText('span', offer.label, 'badge'), createText('s', formatPrice(product.price), 'old'))
  }
  li.append(createText('strong', formatPrice(price), 'price'), add)
  return li
}
