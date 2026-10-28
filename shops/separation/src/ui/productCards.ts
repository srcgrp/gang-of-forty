import type { Product } from '../types.ts'

export type CardItem = {
  product: Product
  price: number
  oldPrice?: number
  percent?: number
  soldOut?: boolean
}

const BACKGROUNDS = ['#fde3dc', '#e2eefc', '#fff0cc', '#e3f1e7'] as const

function faPrice(n: number): string {
  return `${n.toLocaleString('fa-IR')} تومان`
}

export function renderProducts(car: HTMLElement, items: CardItem[], onAdd: (id: number) => void): void {
  car.replaceChildren()
  if (items.length === 0) {
    const empty = document.createElement('p')
    empty.textContent = 'محصولی پیدا نشد.'
    car.append(empty)
    return
  }
  let index = 0
  for (const item of items) {
    const p = item.product
    const card = document.createElement('article')
    card.className = item.soldOut === true ? 'card soldout' : 'card'
    const pic = document.createElement('div')
    pic.className = 'pic'
    pic.style.background = BACKGROUNDS[index % BACKGROUNDS.length] ?? BACKGROUNDS[0]
    pic.textContent = p.emoji
    if (item.percent !== undefined) {
      const badge = document.createElement('span')
      badge.className = 'badge'
      badge.textContent = `${item.percent.toLocaleString('fa-IR')}٪`
      card.append(badge)
    }
    const title = document.createElement('h3')
    title.textContent = p.name
    const unit = document.createElement('p')
    unit.className = 'unit'
    unit.textContent = p.unit
    card.append(pic, title, unit)
    if (item.oldPrice !== undefined) {
      const old = document.createElement('p')
      old.className = 'old'
      old.textContent = faPrice(item.oldPrice)
      card.append(old)
    }
    const row = document.createElement('div')
    row.className = 'price-row'
    const price = document.createElement('strong')
    price.className = 'price'
    price.textContent = faPrice(item.price)
    const btn = document.createElement('button')
    btn.className = 'add'
    btn.type = 'button'
    btn.textContent = item.soldOut === true ? 'ناموجود' : '+'
    if (item.soldOut === true) btn.disabled = true
    else btn.addEventListener('click', () => onAdd(p.id))
    row.append(price, btn)
    card.append(row)
    car.append(card)
    index += 1
  }
}
