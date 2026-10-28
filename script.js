// The landing page script (Week 2). index.html loads this file.
// script.ts is the same code with TypeScript types: a sample to read, not loaded by the page.

const list = document.querySelector('#shops')
const template = document.querySelector('#shop-card')
const stats = document.querySelector('#stats')
const search = document.querySelector('#search')
let allShops = []
let favorites = JSON.parse(localStorage.getItem('gof-favorites')) || []

function render(shops) {
  list.replaceChildren()
  if (shops.length === 0) {
    const li = document.createElement('li')
    li.textContent = 'سوپرمارکتی پیدا نشد'
    list.append(li)
  }
  for (const shop of shops) {
    const card = template.content.cloneNode(true)
    card.querySelector('a').href = 'shops/' + shop.slug + '/index.html'
    card.querySelector('.emoji').textContent = shop.emoji
    card.querySelector('.name').textContent = shop.name
    card.querySelector('.desc').textContent = shop.description
    const owner = card.querySelector('.owner')
    if (shop.owner) {
      owner.textContent = 'صاحب غرفه: ' + shop.owner
    } else {
      owner.textContent = 'غرفه آزاد است'
      owner.classList.add('free')
    }
    card.querySelector('.slug').textContent = shop.slug
    const fav = card.querySelector('.fav')
    fav.dataset.slug = shop.slug
    if (favorites.includes(shop.slug)) fav.textContent = '★'
    list.append(card)
  }
}

async function loadShops() {
  stats.textContent = 'در حال بارگذاری…'
  try {
    const res = await fetch('api/shops.json')
    if (!res.ok) throw new Error('HTTP ' + res.status)
    allShops = await res.json()
    render(allShops)
    const claimed = allShops.filter((shop) => shop.owner).length
    stats.textContent = claimed.toLocaleString('fa-IR') + ' از ' + allShops.length.toLocaleString('fa-IR') + ' سوپرمارکت صاحب دارد'
  } catch (err) {
    stats.textContent = 'فهرست سوپرمارکت‌ها بار نشد 😕'
    console.error(err)
  }
}

search.addEventListener('input', () => {
  const term = search.value.trim().toLowerCase()
  const found = allShops.filter((shop) => (shop.name + ' ' + shop.slug + ' ' + shop.owner).toLowerCase().includes(term))
  render(found)
})

// One listener on the list for every ☆ button (event delegation)
list.addEventListener('click', (e) => {
  const fav = e.target.closest('.fav')
  if (!fav) return
  const slug = fav.dataset.slug
  if (favorites.includes(slug)) {
    favorites = favorites.filter((s) => s !== slug)
    fav.textContent = '☆'
  } else {
    favorites.push(slug)
    fav.textContent = '★'
  }
  localStorage.setItem('gof-favorites', JSON.stringify(favorites))
})

loadShops()
