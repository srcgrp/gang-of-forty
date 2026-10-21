const API = '../../api/'
const fmt = (n) => new Intl.NumberFormat('fa-IR').format(n)

const getJSON = async (file) => {
  const res = await fetch(API + file)
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return res.json()
}
const asList = (data, key) => (Array.isArray(data) ? data : data[key])

const el = (tag, cls, text) => {
  const e = document.createElement(tag)
  if (cls) e.className = cls
  if (text !== undefined) e.textContent = text
  return e
}

const makeCard = (p, stockCount, offer) => {
  const li = el('li', 'card')
  const out = stockCount === 0
  if (out) li.classList.add('out')
  li.append(el('div', 'thumb', p.emoji), el('h3', '', p.name), el('span', 'unit', p.unit))
  let price = p.price
  if (offer && !out) {
    price = Math.round(p.price * (1 - offer.percent / 100))
    li.append(el('span', 'badge', fmt(offer.percent) + '٪'), el('span', 'old', fmt(p.price)))
  }
  if (out) li.append(el('span', 'out-tag', 'ناموجود'))
  const row = el('div', 'row')
  const add = el('button', 'add', '+')
  add.type = 'button'
  add.disabled = out
  add.setAttribute('aria-label', 'افزودن ' + p.name)
  row.append(el('span', 'price', fmt(price) + ' تومان'), add)
  li.append(row)
  return li
}

const showSkeleton = (list) => {
  list.replaceChildren(...[1, 2, 3, 4].map(() => el('li', 'skeleton')))
}
const showError = (list, err) => {
  list.replaceChildren(el('li', 'msg', 'بارگذاری محصولات ممکن نشد. اینترنت را بررسی کنید و صفحه را دوباره باز کنید.'))
  console.error(err)
}

const dairyList = document.querySelector('#dairy-list')
const offersList = document.querySelector('#offers-list')

const init = async () => {
  showSkeleton(dairyList)
  showSkeleton(offersList)
  try {
    const [pData, sData, oData] = await Promise.all([
      getJSON('products.json'), getJSON('stock.json'), getJSON('offers.json'),
    ])
    const products = asList(pData, 'products')
    const offers = asList(oData, 'offers')
    const stock = sData.items
    const offerOf = new Map(offers.map((o) => [o.productId, o]))

    const dairy = products.filter((p) => p.categoryId === 2)
    dairyList.replaceChildren(...dairy.map((p) => makeCard(p, stock[p.id], offerOf.get(p.id))))

    const special = offers
      .map((o) => products.find((p) => p.id === o.productId))
      .filter(Boolean)
    offersList.replaceChildren(...special.map((p) => makeCard(p, stock[p.id], offerOf.get(p.id))))
  } catch (err) {
    showError(dairyList, err)
    showError(offersList, err)
  }
}
init()
