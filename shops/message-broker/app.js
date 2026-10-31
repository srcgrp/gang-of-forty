const container = document.getElementById('best-carousel')
const BASE = '../../api/'

async function loadJSON(name) {
    const res = await fetch(BASE + name)
    if (!res.ok) {
        throw new Error(name + ': HTTP ' + res.status)
    }
    return res.json()
}

function formatPrice(n) {
    return new Intl.NumberFormat('fa-IR').format(n) + ' تومان'
}

function createCard(product, offer, stockCount) {
    const soldOut = stockCount === 0

    const li = document.createElement('li')
    li.className = 'card'
    if (soldOut) li.classList.add('sold-out')

    const article = document.createElement('article')

    const imgBox = document.createElement('div')
    imgBox.className = 'img'
    imgBox.textContent = product.emoji

    const name = document.createElement('h3')
    name.textContent = product.name

    const unit = document.createElement('p')
    unit.textContent = product.unit

    const price = document.createElement('p')
    if (offer) {
        const newPrice = Math.round(product.price * (100 - offer.percent) / 100)
        const old = document.createElement('s')
        old.textContent = new Intl.NumberFormat('fa-IR').format(product.price)
        const b = document.createElement('b')
        b.textContent = ' ' + formatPrice(newPrice)
        price.append(old, b)
    } else {
        const b = document.createElement('b')
        b.textContent = formatPrice(product.price)
        price.appendChild(b)
    }

    article.append(imgBox, name, unit, price)

    if (offer) {
        const off = document.createElement('span')
        off.className = 'off'
        off.textContent = new Intl.NumberFormat('fa-IR').format(offer.percent) + '٪ تخفیف'
        article.appendChild(off)
    }

    if (soldOut) {
        const tag = document.createElement('span')
        tag.className = 'badge-sold'
        tag.textContent = 'ناموجود'
        article.appendChild(tag)
    }

    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = 'افزودن'
    button.disabled = soldOut
    article.appendChild(button)

    li.appendChild(article)
    return li
}

function showMessage(text) {
    container.textContent = ''
    const li = document.createElement('li')
    li.textContent = text
    container.appendChild(li)
}

async function init() {
    showMessage('در حال بارگذاری...')

    try {
        const [products, stock, offers] = await Promise.all([
            loadJSON('products.json'),
            loadJSON('stock.json'),
            loadJSON('offers.json')
        ])

        const offerMap = new Map(offers.map(o => [o.productId, o]))
        const items = products.filter(p => offerMap.has(p.id))

        container.textContent = ''
        items.forEach(p => {
            container.appendChild(
                createCard(p, offerMap.get(p.id), stock.items[p.id])
            )
        })

        container.firstElementChild.id = 'b1'
        container.lastElementChild.id = 'b6'
    } catch (err) {
        console.error(err)
        showMessage('بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.')
    }
}

init()