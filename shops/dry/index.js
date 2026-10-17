
const API = '../../api/'
const DAIRY_CATEGORY_ID = 2 

const IMAGES = {
  102: './assets/products/orange.png',
  103: './assets/products/banana.png',
  201: './assets/products/milk.png',
  202: './assets/products/panir-sefid.png',
  203: './assets/products/mast.png',
  402: './assets/products/honey.png',
}

const faNumber = new Intl.NumberFormat('fa-IR')
const toman = (n) => faNumber.format(n) + ' تومان'

async function getJSON(file) {
  const res = await fetch(API + file)
  if (!res.ok) throw new Error('خطا: ' + res.status)
  return res.json()
}


function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}


function createCard(product, inStock, offer) {
  const card = el('div', 'product-card')
  if (!inStock) card.classList.add('out')

  if (offer) card.append(el('span', 'discount', faNumber.format(offer.percent) + '٪'))

  const fav = el('button', 'favorite', '♡')
  fav.type = 'button'
  fav.setAttribute('aria-label', 'علاقه‌مندی')

  const pic = el('div', 'product-emoji')
  if (IMAGES[product.id]) {
    const img = el('img')
    img.src = IMAGES[product.id]
    img.alt = '' 
    pic.append(img)
  } else {
    const emoji = el('span', '', product.emoji)
    emoji.setAttribute('aria-hidden', 'true')
    pic.append(emoji)
  }
  if (!inStock) pic.append(el('span', 'sold-out', 'ناموجود'))

  const price = el('div', 'price')
  if (offer) {

    const newPrice = Math.round((product.price * (100 - offer.percent)) / 100 / 1000) * 1000
    price.append(el('span', 'old-price', toman(product.price)), el('span', '', toman(newPrice)))
  } else {
    price.append(el('span', '', toman(product.price)))
  }

  const add = el('button', 'add-btn', '+')
  add.type = 'button'
  add.setAttribute('aria-label', `افزودن ${product.name} به سبد`)
  add.disabled = !inStock

  card.append(fav, pic, el('h3', '', product.name), el('p', 'product-brand', product.unit), price, add)
  return card
}

function showStatus(box, message, isError = false) {
  const p = el('p', isError ? 'status error' : 'status', message)
  p.setAttribute('role', isError ? 'alert' : 'status')
  box.replaceChildren(p)
}


function renderCarousel(box, cards, prefix) {
  box.setAttribute('aria-busy', 'false')
  if (cards.length === 0) {
    showStatus(box, 'محصولی برای نمایش وجود ندارد.')
    return
  }
  cards.forEach((card, i) => {
    card.id = `${prefix}-${i + 1}`
  })
  box.replaceChildren(...cards)

 const links = box.closest('.products').querySelectorAll('.carousel-nav a')
  links[0].href = `#${prefix}-1`
  links[1].href = `#${prefix}-${cards.length}`
}

async function init() {
  const dairyBox = document.querySelector('#dairy .carousel')
  const offersBox = document.querySelector('#offers .carousel')
  const boxes = [dairyBox, offersBox]

  for (const box of boxes) {
    box.setAttribute('aria-busy', 'true')
    showStatus(box, 'در حال بارگذاری…')
  }

  try {

    const [products, stock, offers] = await Promise.all([
      getJSON('products.json'),
      getJSON('stock.json'),
      getJSON('offers.json'),
    ])

    const offerByProduct = new Map(offers.map((o) => [o.productId, o]))
    const makeCard = (p) => createCard(p, (stock.items[p.id] ?? 0) > 0, offerByProduct.get(p.id))

    const dairy = products.filter((p) => p.categoryId === DAIRY_CATEGORY_ID).map(makeCard)
    const offered = products.filter((p) => offerByProduct.has(p.id)).map(makeCard)

    renderCarousel(dairyBox, dairy, 'dairy')
    renderCarousel(offersBox, offered, 'offer')
  } catch {
    for (const box of boxes) {
      box.setAttribute('aria-busy', 'false')
      showStatus(box, 'بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.', true)
    }
  }
}

init()