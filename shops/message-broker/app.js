   async function loadProducts() {
    const res = await fetch('../../api/products.json')
    if (!res.ok) {
        throw new Error('HTTP ' + res.status)
    }
    return res.json()
}

loadProducts().then(data => console.log(data))


const CATEGORY_ID = 2
const container = document.getElementById('best-carousel')

async function loadProducts() {
    const res = await fetch('../../api/products.json')
    if (!res.ok) {
        throw new Error('HTTP ' + res.status)
    }
    return res.json()
}

function createCard(product) {
    const li = document.createElement('li')
    li.className = 'card'

    const article = document.createElement('article')

    const imgBox = document.createElement('div')
    imgBox.className = 'img'
    imgBox.textContent = product.emoji

    const name = document.createElement('h3')
    name.textContent = product.name

    const unit = document.createElement('p')
    unit.textContent = product.unit

    const price = document.createElement('p')
    const b = document.createElement('b')
    b.textContent = new Intl.NumberFormat('fa-IR').format(product.price) + ' تومان'
    price.appendChild(b)

    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = 'افزودن'

    article.append(imgBox, name, unit, price, button)
    li.appendChild(article)
    return li
}

async function init() {
    try {
        const products = await loadProducts()
        const items = products.filter(p => p.categoryId === CATEGORY_ID)
        container.textContent = ''
        items.forEach(p => container.appendChild(createCard(p)))
        container.firstElementChild.id = 'b1'
        container.lastElementChild.id = 'b6'

    } catch (err) {
          console.error(err)
        status.textContent = 'بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.'
        container.textContent = ''
        container.appendChild(status)
    }
}

init()