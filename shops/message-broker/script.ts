import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import confetti from 'canvas-confetti'

const notyf = new Notyf()

const categoriesNav = document.querySelector<HTMLElement>('#categories')
const submenu = document.querySelector<HTMLUListElement>('#submenu')
const mainMenu = document.querySelector<HTMLUListElement>('#main-menu')
const notice = document.querySelector<HTMLParagraphElement>('#notice')
const about = document.querySelector<HTMLParagraphElement>('#about')
const address = document.querySelector<HTMLParagraphElement>('#address')
const phone = document.querySelector<HTMLParagraphElement>('#phone')
const footerCategories = document.querySelector<HTMLUListElement>('#footer-categories')
const footerHelp = document.querySelector<HTMLUListElement>('#footer-help')
const schedule = document.querySelector<HTMLUListElement>('#schedule')
const posters = document.querySelector<HTMLElement>('#posters')
const posters2 = document.querySelector<HTMLElement>('#posters-2')
const container = document.querySelector<HTMLUListElement>('#best-carousel')

if (
    !categoriesNav || !submenu || !mainMenu || !notice || !about || !address ||
    !phone || !footerCategories || !footerHelp || !schedule || !posters ||
    !posters2 || !container
) {
    throw new Error('index.html is missing an element')
}

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
 
const renderCategories = (categories) => {
    categoriesNav.textContent = ''

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
        categoriesNav.appendChild(a)
    })
}

const renderMenu = (shop, categories) => {
    submenu.textContent = ''
    categories.forEach(c => submenu.appendChild(makeLink(c.name, '#' + c.slug)))

    shop.menu.forEach(m => mainMenu.appendChild(makeLink(m.label, m.href)))
}

 const renderFooter = (shop, categories) => {
    notice.textContent = shop.notice
    about.textContent = shop.about
    address.textContent = shop.address
    phone.textContent = 'تلفن: ' + shop.phone

    categories.forEach(c => footerCategories.appendChild(makeLink(c.name, '#' + c.slug)))

    shop.help.forEach(h => footerHelp.appendChild(makeLink(h.label, h.href)))

    shop.schedule.forEach(s => {
        const li = document.createElement('li')
        li.textContent = s.days + ': ' + s.time
        schedule.appendChild(li)
    })
}
 const renderPosters = (home) => {
    posters.textContent = ''
    posters2.textContent = ''
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

    posters.appendChild(makeBanner(home.hero, 'poster-1'))
    posters.appendChild(makeBanner(home.side, 'poster-2'))

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
        posters2.appendChild(a)
    })
}

const initLayout = async () => {
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
    } catch (err: unknown) {
        console.error(err)
        categoriesNav.textContent = 'خطا: ' + (err instanceof Error ? err.message : String(err))
    }
}
  

// ===================== Best-selling carousel (cards) =====================

 
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
    button.dataset.name = product.name
    button.textContent = 'افزودن'
    button.disabled = soldOut
    article.appendChild(button)

    li.appendChild(article)
    return li
}

const showMessage = (text: string) => {
    container.textContent = ''
    const li = document.createElement('li')
    li.textContent = text
    container.appendChild(li)
}

const init = async () => {
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

        const first = container.firstElementChild
        const last = container.lastElementChild
        if (first) first.id = 'b1'
        if (last) last.id = 'b6'
    } catch (err) {
        console.error(err)
        showMessage('بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.')
    }
}

container.addEventListener('click', (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return
    const button = e.target.closest<HTMLButtonElement>('button')
    if (!button || button.disabled) return

    notyf.success((button.dataset.name ?? 'کالا') + ' به سبد اضافه شد')
    confetti({ particleCount: 60, spread: 70 })
})
// ===================== Start =====================

init()
initLayout()
