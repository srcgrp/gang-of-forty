import type { Offer, Product } from '../types'

const toFa = (n: number) => new Intl.NumberFormat('fa-IR').format(n)

export function createCard(p: Product, offer: Offer | undefined, stock: number): HTMLElement {
    const soldOut = stock === 0
    const li = document.createElement('li')
    li.className = soldOut ? 'card sold-out' : 'card'

    const art = document.createElement('article')
    const img = Object.assign(document.createElement('div'), { className: 'img', textContent: p.emoji })
    const title = Object.assign(document.createElement('h3'), { textContent: p.name })
    const unit = Object.assign(document.createElement('p'), { textContent: p.unit })
    const price = document.createElement('p')

    if (offer) {
        const newP = Math.round((p.price * (100 - offer.percent)) / 100)
        const old = Object.assign(document.createElement('s'), { textContent: toFa(p.price) })
        const b = Object.assign(document.createElement('b'), { textContent: ' ' + toFa(newP) + ' تومان' })
        price.append(old, b)
    } else {
        const b = Object.assign(document.createElement('b'), { textContent: toFa(p.price) + ' تومان' })
        price.appendChild(b)
    }

    art.append(img, title, unit, price)

    if (offer) {
        const off = Object.assign(document.createElement('span'), { className: 'off', textContent: toFa(offer.percent) + '٪ تخفیف' })
        art.appendChild(off)
    }
    if (soldOut) {
        const tag = Object.assign(document.createElement('span'), { className: 'badge-sold', textContent: 'ناموجود' })
        art.appendChild(tag)
    }

    const btn = Object.assign(document.createElement('button'), {
        type: 'button',
        textContent: 'افزودن',
        disabled: soldOut
    })
    btn.dataset.name = p.name
    btn.dataset.id = String(p.id)
    art.appendChild(btn)

    li.appendChild(art)
    return li
}
