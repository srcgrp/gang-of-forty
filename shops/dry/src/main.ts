import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import confetti from 'canvas-confetti'
import Fuse, { type FuseResult } from 'fuse.js'

import orangeImg from '../assets/products/orange.png'
import bananaImg from '../assets/products/banana.png'
import milkImg from '../assets/products/milk.png'
import paneerImg from '../assets/products/panir-sefid.png'
import mastImg from '../assets/products/mast.png'
import honeyImg from '../assets/products/honey.png'

import type { Offer, Product, SearchItem, Stock } from './types.ts'
const notyf: Notyf = new Notyf()

const API: string = '../../api/'
const DAIRY_CATEGORY_ID: number = 2
const CART_KEY: string = 'dry-cart'



const IMAGES: Record<number, string> = {
  102: orangeImg,
  103: bananaImg,
  201: milkImg,
  202: paneerImg,
  203: mastImg,
  402: honeyImg,
}

const faNumber: Intl.NumberFormat = new Intl.NumberFormat('fa-IR')
const toman = (n: number): string => faNumber.format(n) + ' تومان'
const normalize = (text: string): string =>
  text
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/\u200c/g, ' ')
    .replace(/[۰-۹]/g, (d: string): string => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d: string): string => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .toLowerCase()
    .trim()

const cartCount: HTMLElement | null = document.querySelector<HTMLElement>('#cart-count')
if (!cartCount) throw new Error('index.html is missing #cart-count')

const savedCart: number = Number(localStorage.getItem(CART_KEY))
let cart: number = Number.isFinite(savedCart) ? savedCart : 0

const renderCart = (): void => {
  cartCount.textContent = faNumber.format(cart)
}

const bumpCart = (): void => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  cartCount.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
    { duration: 300, easing: 'ease-out' },
  )
}

const addToCart = (): void => {
  cart += 1
  localStorage.setItem(CART_KEY, String(cart))
  renderCart()
  bumpCart()
}

renderCart()

async function getJSON<T>(file: string): Promise<T> {
  const res: Response = await fetch(API + file)
  if (!res.ok) throw new Error('خطا: ' + res.status)
  return res.json()
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node: HTMLElementTagNameMap[K] = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

function createCard(product: Product, inStock: boolean, offer: Offer | undefined): HTMLDivElement {
  const card: HTMLDivElement = el('div', 'product-card')
  if (!inStock) card.classList.add('out')

  if (offer) card.append(el('span', 'discount', faNumber.format(offer.percent) + '٪'))

  const fav: HTMLButtonElement = el('button', 'favorite', '♡')
  fav.type = 'button'
  fav.setAttribute('aria-label', 'علاقه‌مندی')

  const pic: HTMLDivElement = el('div', 'product-emoji')
  if (IMAGES[product.id]) {
    const img: HTMLImageElement = el('img')
    img.src = IMAGES[product.id]
    img.alt = ''
    pic.append(img)
  } else {
    const emoji: HTMLSpanElement = el('span', '', product.emoji)
    emoji.setAttribute('aria-hidden', 'true')
    pic.append(emoji)
  }
  if (!inStock) pic.append(el('span', 'sold-out', 'ناموجود'))

  const price: HTMLDivElement = el('div', 'price')
  if (offer) {
    const newPrice: number = Math.round((product.price * (100 - offer.percent)) / 100 / 1000) * 1000
    price.append(el('span', 'old-price', toman(product.price)), el('span', '', toman(newPrice)))
  } else {
    price.append(el('span', '', toman(product.price)))
  }

  const add: HTMLButtonElement = el('button', 'add-btn', '+')
  add.type = 'button'
  add.dataset.name = product.name
  add.setAttribute('aria-label', `افزودن ${product.name} به سبد`)
  add.disabled = !inStock

  card.append(fav, pic, el('h3', '', product.name), el('p', 'product-brand', product.unit), price, add)
  return card
}

function showStatus(box: HTMLElement, message: string, isError: boolean = false): void {
  const p: HTMLParagraphElement = el('p', isError ? 'status error' : 'status', message)
  p.setAttribute('role', isError ? 'alert' : 'status')
  box.replaceChildren(p)
}

function renderCarousel(box: HTMLElement, cards: HTMLDivElement[], prefix: string): void {
  box.setAttribute('aria-busy', 'false')
  if (cards.length === 0) {
    showStatus(box, 'محصولی برای نمایش وجود ندارد.')
    return
  }
  cards.forEach((card: HTMLDivElement, i: number): void => {
    card.id = `${prefix}-${i + 1}`
  })
  box.replaceChildren(...cards)

  const section: Element | null = box.closest('.products')
  if (!section) return
  const links: NodeListOf<HTMLAnchorElement> = section.querySelectorAll<HTMLAnchorElement>('.carousel-nav a')
  links[0].href = `#${prefix}-1`
  links[1].href = `#${prefix}-${cards.length}`
}

async function init(): Promise<void> {
  const dairyBox: HTMLElement | null = document.querySelector<HTMLElement>('#dairy .carousel')
  const offersBox: HTMLElement | null = document.querySelector<HTMLElement>('#offers .carousel')
  const dairySection: HTMLElement | null = document.querySelector<HTMLElement>('#dairy')
  const offersSection: HTMLElement | null = document.querySelector<HTMLElement>('#offers')
  const searchInput: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#search')
  const resultsSection: HTMLElement | null = document.querySelector<HTMLElement>('#search-results')
  const resultsBox: HTMLElement | null = document.querySelector<HTMLElement>('#results')
  const resultsStatus: HTMLElement | null = document.querySelector<HTMLElement>('#results-status')
  if (
    !dairyBox || !offersBox || !dairySection || !offersSection ||
    !searchInput || !resultsSection || !resultsBox || !resultsStatus
  ) {
    throw new Error('index.html is missing an element')
  }
  const boxes: HTMLElement[] = [dairyBox, offersBox]

  for (const box of boxes) {
    box.addEventListener('click', onAddClick)
    box.setAttribute('aria-busy', 'true')
    showStatus(box, 'در حال بارگذاری…')
  }
  resultsBox.addEventListener('click', onAddClick)

  try {
    const [products, stock, offers]: [Product[], Stock, Offer[]] = await Promise.all([
      getJSON<Product[]>('products.json'),
      getJSON<Stock>('stock.json'),
      getJSON<Offer[]>('offers.json'),
    ])

    const offerByProduct: Map<number, Offer> = new Map<number, Offer>(
      offers.map((o: Offer): [number, Offer] => [o.productId, o]),
    )
    const makeCard = (p: Product): HTMLDivElement =>
      createCard(p, (stock.items[p.id] ?? 0) > 0, offerByProduct.get(p.id))

    const dairy: HTMLDivElement[] = products
      .filter((p: Product): boolean => p.categoryId === DAIRY_CATEGORY_ID)
      .map(makeCard)
    const offered: HTMLDivElement[] = products
      .filter((p: Product): boolean => offerByProduct.has(p.id))
      .map(makeCard)

    renderCarousel(dairyBox, dairy, 'dairy')
    renderCarousel(offersBox, offered, 'offer')


      const searchItems: SearchItem[] = products.map(
      (p: Product): SearchItem => ({
        product: p,
        name: normalize(p.name),
        tags: normalize(p.tags.join(' ')),
      }),
    )
    const fuse: Fuse<SearchItem> = new Fuse<SearchItem>(searchItems, {
      keys: [
        { name: 'name', weight: 3 },
        { name: 'tags', weight: 1 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    })

    const runSearch = (): void => {
      const query: string = normalize(searchInput.value)
      if (query === '') {
        resultsSection.hidden = true
        offersSection.hidden = false
        dairySection.hidden = false
        return
      }

      const found: FuseResult<SearchItem>[] = fuse.search(query)
      const cards: HTMLDivElement[] = found.map(
        (r: FuseResult<SearchItem>): HTMLDivElement => makeCard(r.item.product),
      )
      resultsBox.replaceChildren(...cards)
      resultsStatus.textContent =
        cards.length === 0
          ? `نتیجه‌ای برای «${searchInput.value.trim()}» پیدا نشد.`
          : `${faNumber.format(cards.length)} محصول پیدا شد.`

      resultsSection.hidden = false
      offersSection.hidden = true
      dairySection.hidden = true
    }

    searchInput.addEventListener('input', runSearch)
    runSearch()
  } catch {
    for (const box of boxes) {
      box.setAttribute('aria-busy', 'false')
      showStatus(box, 'بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.', true)
    }
  }
}

function onAddClick(e: MouseEvent): void {
  if (!(e.target instanceof Element)) return
  const button: HTMLButtonElement | null = e.target.closest<HTMLButtonElement>('.add-btn')
  if (!button || button.disabled) return

  notyf.success((button.dataset.name ?? 'محصول') + ' به سبد اضافه شد')
  confetti({ particleCount: 60, spread: 70 })
  addToCart()
}

init()