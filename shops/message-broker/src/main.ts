import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import confetti from 'canvas-confetti'
import type { Category, Home, Offer, Product, Shop, Stock } from './types'
import { getJSON } from './api/client'
import { loadCart, saveCart } from './storage/storage'
import { addToCart } from './cart/cart'
import { createCard } from './ui/cards'
import { renderCategories, renderFooter, renderMenu, renderPosters } from './ui/layout'

const notyf = new Notyf()
let cart = loadCart()

const nav = document.querySelector<HTMLElement>('#categories')
const sub = document.querySelector<HTMLUListElement>('#submenu')
const mainM = document.querySelector<HTMLUListElement>('#main-menu')
const notice = document.querySelector<HTMLParagraphElement>('#notice')
const about = document.querySelector<HTMLParagraphElement>('#about')
const addr = document.querySelector<HTMLParagraphElement>('#address')
const phone = document.querySelector<HTMLParagraphElement>('#phone')
const fCats = document.querySelector<HTMLUListElement>('#footer-categories')
const fHelp = document.querySelector<HTMLUListElement>('#footer-help')
const sched = document.querySelector<HTMLUListElement>('#schedule')
const p1 = document.querySelector<HTMLElement>('#posters')
const p2 = document.querySelector<HTMLElement>('#posters-2')
const container = document.querySelector<HTMLUListElement>('#best-carousel')
const searchForm = document.querySelector<HTMLFormElement>('.search')
const searchInput = document.querySelector<HTMLInputElement>('.search input')

if (!nav || !sub || !mainM || !notice || !about || !addr || !phone || !fCats || !fHelp || !sched || !p1 || !p2 || !container) {
    throw new Error('المان‌های DOM یافت نشدند.')
}

async function start(): Promise<void> {
    try {
        const API_BASE = (import.meta.env.DEV || window.location.hostname === 'localhost')
    ? '/api'
    : (import.meta.env.VITE_API_URL ?? '../../api')
        const [cats, shop, home, prods, stock, offers] = await Promise.all([
            
            getJSON(`${API_BASE}/categories.json`) as Promise<Category[]>,
            getJSON(`${API_BASE}/shop.json`) as Promise<Shop>,
            getJSON(`${API_BASE}/home.json`) as Promise<Home>,
            getJSON(`${API_BASE}/products.json`) as Promise<Product[]>,
            getJSON(`${API_BASE}/stock.json`) as Promise<Stock>,
            getJSON(`${API_BASE}/offers.json`) as Promise<Offer[]>
        ])

        renderCategories(nav!, cats)
        renderMenu(sub!, mainM!, shop, cats)
        renderFooter({ notice: notice!, about: about!, address: addr!, phone: phone!, cats: fCats!, help: fHelp!, schedule: sched! }, shop, cats)
        renderPosters(p1!, p2!, home)

        const offerMap = new Map(offers.map(o => [o.productId, o]))
        const catMap = new Map(cats.map(c => [c.id, c.name]))
        const items = prods.filter(p => offerMap.has(p.id))

        const renderList = (list: Product[]) => {
            container!.textContent = ''
            list.forEach(p => container!.appendChild(createCard(p, offerMap.get(p.id), stock.items[p.id] ?? 0)))
        }
        renderList(items)

        searchForm?.addEventListener('submit', (e) => {
            e.preventDefault()
            const q = searchInput?.value.trim().toLocaleLowerCase('fa-IR') ?? ''
            if (!q) { renderList(items); return }
            renderList(prods.filter(p => p.name.toLocaleLowerCase('fa-IR').includes(q) || (catMap.get(p.categoryId) ?? '').toLocaleLowerCase('fa-IR').includes(q)))
        })
    } catch (err) {
        console.error(err)
    }
}

container.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>('button')
    if (!btn || btn.disabled) return
    const id = Number(btn.dataset.id)
    if (!Number.isNaN(id)) {
        cart = addToCart(cart, id)
        saveCart(cart)
    }
    notyf.success((btn.dataset.name ?? 'کالا') + ' به سبد اضافه شد')
    confetti({ particleCount: 60, spread: 70 })
})

start()
         
