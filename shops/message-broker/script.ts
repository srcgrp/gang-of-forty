// ===================== Layout (header, menu, footer, posters) =====================

const LAYOUT_BASE = '../../api/'

async function loadLayoutJSON(name) {
    const res = await fetch(LAYOUT_BASE + name)
    if (!res.ok) {
        throw new Error(name + ': HTTP ' + res.status)
    }
    return res.json()
}

function makeLink(text, href) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = href
    a.textContent = text
    li.appendChild(a)
    return li
}

function renderCategories(categories) {
    const nav = document.getElementById('categories')
    nav.textContent = ''

    categories.forEach(c => {
        const a = document.createElement('a')
        a.className = 'category'
        a.href = '#' + c.slug

        const emoji = document.createElement('span')
        emoji.className = 'emoji'
        emoji.setAttribute('aria-hidden', 'true')
        emoji.textContent = c.emoji
        emoji.style.background = c.color
        emoji.style.borderRadius = '50%'
        emoji.style.padding = '10px'

        const name = document.createElement('span')
        name.textContent = c.name

        a.append(emoji, name)
        nav.appendChild(a)
    })
}

function renderMenu(shop, categories) {
    const sub = document.getElementById('submenu')
    sub.textContent = ''
    categories.forEach(c => sub.appendChild(makeLink(c.name, '#' + c.slug)))

    const menu = document.getElementById('main-menu')
    shop.menu.forEach(m => menu.appendChild(makeLink(m.label, m.href)))
}

function renderFooter(shop, categories) {
    document.getElementById('notice').textContent = shop.notice
    document.getElementById('about').textContent = shop.about
    document.getElementById('address').textContent = shop.address
    document.getElementById('phone').textContent = 'تلفن: ' + shop.phone

    const cats = document.getElementById('footer-categories')
    categories.forEach(c => cats.appendChild(makeLink(c.name, '#' + c.slug)))

    const help = document.getElementById('footer-help')
    shop.help.forEach(h => help.appendChild(makeLink(h.label, h.href)))

    const schedule = document.getElementById('schedule')
    shop.schedule.forEach(s => {
        const li = document.createElement('li')
        li.textContent = s.days + ': ' + s.time
        schedule.appendChild(li)
    })
}

function renderPosters(home) {
    const box = document.getElementById('posters')
    box.textContent = ''
    const box2 = document.getElementById('posters-2')
    box2.textContent = ''
    function makeBanner(data, className) {
        const a = document.createElement('a')
        a.className = 'poster ' + className
        a.href = data.cta.href

        const emoji = document.createElement('span')
        emoji.textContent = data.emoji

        const title = document.createElement('h2')
        title.textContent = data.title

        const text = document.createElement('p')
        text.textContent = data.text

        const cta = document.createElement('b')
        cta.textContent = data.cta.label

        a.append(emoji, title, text, cta)
        return a
    }

    box.appendChild(makeBanner(home.hero, 'poster-1'))
    box.appendChild(makeBanner(home.side, 'poster-2'))

    home.promos.forEach((p, i) => {
        const a = document.createElement('a')
        a.className = 'poster poster-' + (i + 3)
        a.href = p.href
        a.style.background = p.color

        const emoji = document.createElement('span')
        emoji.textContent = p.emoji

        const text = document.createElement('p')
        text.textContent = p.text

        a.append(emoji, text)
        box2.appendChild(a)
    })
}

async function initLayout() {
    try {
        const [categories, shop, home] = await Promise.all([
            loadLayoutJSON('categories.json'),
            loadLayoutJSON('shop.json'),
            loadLayoutJSON('home.json')
        ])

        renderCategories(categories)
        renderMenu(shop, categories)
        renderFooter(shop, categories)
        renderPosters(home)

        if (location.hash) {
            document.getElementById(location.hash.slice(1))?.scrollIntoView()
        }
    } catch (err) {
        console.error(err)
        const nav = document.getElementById('categories')
        nav.textContent = 'خطا: ' + err.message
    }
}

// ===================== Best-selling carousel (cards) =====================

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

// ===================== Start =====================

init()
initLayout()
