import type { Card } from '../../../shared/types.ts'
import { el } from './dom.ts'

function pictureOf(card: Card): HTMLDivElement {
  const pic: HTMLDivElement = el('div', 'product-emoji')
  if (card.image) {
    const img: HTMLImageElement = el('img')
    img.src = card.image
    img.alt = ''
    pic.append(img)
  } else {
    const emoji: HTMLSpanElement = el('span', '', card.emoji)
    emoji.setAttribute('aria-hidden', 'true')
    pic.append(emoji)
  }
  if (!card.inStock) pic.append(el('span', 'sold-out', 'ناموجود'))
  return pic
}

function priceOf(card: Card): HTMLDivElement {
  const price: HTMLDivElement = el('div', 'price')
  if (card.oldPrice) price.append(el('span', 'old-price', card.oldPrice))
  price.append(el('span', '', card.price))
  return price
}

export function createCard(card: Card): HTMLDivElement {
  const box: HTMLDivElement = el('div', 'product-card')
  if (!card.inStock) box.classList.add('out')
  if (card.discount) box.append(el('span', 'discount', card.discount))

  const fav: HTMLButtonElement = el('button', 'favorite', '♡')
  fav.type = 'button'
  fav.setAttribute('aria-label', 'علاقه‌مندی')

  const add: HTMLButtonElement = el('button', 'add-btn', '+')
  add.type = 'button'
  add.dataset.id = String(card.id)
  add.dataset.name = card.title
  add.setAttribute('aria-label', `افزودن ${card.title} به سبد`)
  add.disabled = !card.inStock

  box.append(
    fav,
    pictureOf(card),
    el('h3', '', card.title),
    el('p', 'product-brand', card.unit),
    priceOf(card),
    add,
  )
  return box
}