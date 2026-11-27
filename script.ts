// The same code as script.js, with TypeScript types. A sample to read and compare:
// index.html does NOT load this file (browsers can't run .ts; it would need Vite).
// Check it yourself: npx -p typescript tsc --noEmit --strict --target es2022 --lib es2022,dom,dom.iterable script.ts

// One shop in api/shops.json
type Shop = {
  slug: string
  name: string
  emoji: string
  owner: string
  description: string
}

// querySelector<…> says which element we expect; it can still find nothing (null)
const list = document.querySelector<HTMLUListElement>('#shops')
const template = document.querySelector<HTMLTemplateElement>('#shop-card')
const stats = document.querySelector<HTMLParagraphElement>('#stats')
const search = document.querySelector<HTMLInputElement>('#search')
if (!list || !template || !stats || !search) throw new Error('index.html is missing #shops, #shop-card, #stats or #search')

let allShops: Shop[] = []
let favorites: string[] = JSON.parse(localStorage.getItem('gof-favorites') || '[]')

// Arrow functions with const: TypeScript remembers the null check above inside them
const render = (shops: Shop[]): void => {
  list.replaceChildren()
  if (shops.length === 0) {
    const li: HTMLLIElement = document.createElement('li')
    li.textContent = 'سوپرمارکتی پیدا نشد'
    list.append(li)
  }
  for (const shop of shops) {
    // importNode = cloneNode with a better type: it returns a DocumentFragment
    const card: DocumentFragment = document.importNode(template.content, true)
    const link = card.querySelector<HTMLAnchorElement>('a')
    const emoji = card.querySelector<HTMLSpanElement>('.emoji')
    const name = card.querySelector<HTMLElement>('.name')
    const desc = card.querySelector<HTMLSpanElement>('.desc')
    const owner = card.querySelector<HTMLSpanElement>('.owner')
    const slug = card.querySelector<HTMLElement>('.slug')
    const fav = card.querySelector<HTMLButtonElement>('.fav')
    if (!link || !emoji || !name || !desc || !owner || !slug || !fav) continue

    link.href = 'shops/' + shop.slug + '/index.html'
    emoji.textContent = shop.emoji
    name.textContent = shop.name
    desc.textContent = shop.description
    if (shop.owner) {
      owner.textContent = 'صاحب غرفه: ' + shop.owner
    } else {
      owner.textContent = 'غرفه آزاد است'
      owner.classList.add('free')
    }
    slug.textContent = shop.slug
    fav.dataset.slug = shop.slug
    if (favorites.includes(shop.slug)) fav.textContent = '★'
    list.append(card)
  }
}

const loadShops = async (): Promise<void> => {
  stats.textContent = 'در حال بارگذاری…'
  try {
    const res: Response = await fetch('api/shops.json')
    if (!res.ok) throw new Error('HTTP ' + res.status)
    allShops = await res.json()
    render(allShops)
    const claimed: number = allShops.filter((shop: Shop): boolean => shop.owner !== '').length
    stats.textContent = claimed.toLocaleString('fa-IR') + ' از ' + allShops.length.toLocaleString('fa-IR') + ' سوپرمارکت صاحب دارد'
  } catch (err: unknown) {
    stats.textContent = 'فهرست سوپرمارکت‌ها بار نشد 😕'
    console.error(err)
  }
}

search.addEventListener('input', (): void => {
  const term: string = search.value.trim().toLowerCase()
  const found: Shop[] = allShops.filter((shop: Shop): boolean => (shop.name + ' ' + shop.slug + ' ' + shop.owner).toLowerCase().includes(term))
  render(found)
})

// One listener on the list for every ☆ button (event delegation)
list.addEventListener('click', (e: MouseEvent): void => {
  if (!(e.target instanceof Element)) return
  const fav = e.target.closest<HTMLButtonElement>('.fav')
  if (!fav) return
  const slug: string | undefined = fav.dataset.slug
  if (!slug) return
  if (favorites.includes(slug)) {
    favorites = favorites.filter((s: string): boolean => s !== slug)
    fav.textContent = '☆'
  } else {
    favorites.push(slug)
    fav.textContent = '★'
  }
  localStorage.setItem('gof-favorites', JSON.stringify(favorites))
})

loadShops()
