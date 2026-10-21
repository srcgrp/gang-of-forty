import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import confetti from 'canvas-confetti'

type Product = { id: number; categoryId: number; name: string; emoji: string; unit: string; price: number; tags: string[] }
type Offer = { productId: number; percent: number; label: string }
type StockData = { items: Record<number, number> }

const API = '../../api/'
const fmt = (n: number): string => new Intl.NumberFormat('fa-IR').format(n)
const notyf: Notyf = new Notyf({ position: { x: 'left', y: 'bottom' } })

const getJSON = async <T>(file: string): Promise<T> => {
  const res: Response = await fetch(API + file)
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return res.json() as Promise<T>
}
const asList = <T>(data: T[] | Record<string, T[]>, key: string): T[] =>
  Array.isArray(data) ? data : data[key]

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls: string = '', text?: string): HTMLElementTagNameMap[K] => {
  const e: HTMLElementTagNameMap[K] = document.createElement(tag)
  if (cls) e.className = cls
  if (text !== undefined) e.textContent = text
  return e
}

const dairyList = document.querySelector<HTMLUListElement>('#dairy-list')
const offersList = document.querySelector<HTMLUListElement>('#offers-list')
const status = document.querySelector<HTMLParagraphElement>('#status')
const cartCount = document.querySelector<HTMLElement>('#cart-count')
if (!dairyList || !offersList || !status || !cartCount) throw new Error('index.html is missing an element')

let cart: number = Number(localStorage.getItem('kiss-cart') || 0)
cartCount.textContent = String(cart)

const makeCard = (p: Product, stockCount: number, offer?: Offer): HTMLLIElement => {
  const li: HTMLLIElement = el('li', 'card')
  const out: boolean = stockCount === 0
  if (out) li.classList.add('out')
  li.append(el('div', 'thumb', p.emoji), el('h3', '', p.name), el('span', 'unit', p.unit))
  let price: number = p.price
  if (offer && !out) {
    price = Math.round(p.price * (1 - offer.percent / 100))
    li.append(el('span', 'badge', fmt(offer.percent) + '٪'), el('span', 'old', fmt(p.price)))
  }
  if (out) li.append(el('span', 'out-tag', 'ناموجود'))
  const row: HTMLDivElement = el('div', 'row')
  const add: HTMLButtonElement = el('button', 'add', '+')
  add.type = 'button'
  add.disabled = out
  add.dataset.name = p.name
  add.setAttribute('aria-label', 'افزودن ' + p.name)
  row.append(el('span', 'price', fmt(price) + ' تومان'), add)
  li.append(row)
  return li
}

const showSkeleton = (list: HTMLUListElement): void => {
  list.replaceChildren(...[1, 2, 3, 4].map((): HTMLLIElement => el('li', 'skeleton')))
}
const showError = (list: HTMLUListElement, err: unknown): void => {
  list.replaceChildren(el('li', 'msg', 'بارگذاری محصولات ممکن نشد. اینترنت را بررسی کنید و صفحه را دوباره باز کنید.'))
  console.error(err)
}

const onAdd = (e: MouseEvent): void => {
  if (!(e.target instanceof Element)) return
  const button = e.target.closest<HTMLButtonElement>('button.add')
  if (!button || button.disabled) return
  cart += 1
  localStorage.setItem('kiss-cart', String(cart))
  cartCount.textContent = String(cart)
  notyf.success((button.dataset.name ?? 'کالا') + ' به سبد اضافه شد')
  confetti({ particleCount: 60, spread: 70 })
}
dairyList.addEventListener('click', onAdd)
offersList.addEventListener('click', onAdd)

const init = async (): Promise<void> => {
  showSkeleton(dairyList)
  showSkeleton(offersList)
  try {
    const [pData, sData, oData] = await Promise.all([
      getJSON<Product[] | Record<string, Product[]>>('products.json'),
      getJSON<StockData>('stock.json'),
      getJSON<Offer[] | Record<string, Offer[]>>('offers.json'),
    ])
    const products: Product[] = asList(pData, 'products')
    const offers: Offer[] = asList(oData, 'offers')
    const offerOf: Map<number, Offer> = new Map(offers.map((o: Offer): [number, Offer] => [o.productId, o]))

    const dairy: Product[] = products.filter((p: Product): boolean => p.categoryId === 2)
    dairyList.replaceChildren(...dairy.map((p: Product): HTMLLIElement => makeCard(p, sData.items[p.id], offerOf.get(p.id))))

    const special: Product[] = offers
      .map((o: Offer): Product | undefined => products.find((p: Product): boolean => p.id === o.productId))
      .filter((p: Product | undefined): p is Product => p !== undefined)
    offersList.replaceChildren(...special.map((p: Product): HTMLLIElement => makeCard(p, sData.items[p.id], offerOf.get(p.id))))
  } catch (err: unknown) {
    showError(dairyList, err)
    showError(offersList, err)
  }
}
init()
