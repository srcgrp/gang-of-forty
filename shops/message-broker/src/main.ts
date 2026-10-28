import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import confetti from 'canvas-confetti'
import type { Category, Home, Offer, Product, Shop, Stock, LoadState } from './types'
import { assertNever } from './types'
import { getJSON } from './api/client'
import { loadCart, saveCart } from './storage/storage'
import { addToCart } from './cart/cart'
import { createCard } from './ui/cards'
import { renderCategories, renderFooter, renderMenu, renderPosters } from './ui/layout'

const notyf = new Notyf()
let cart = loadCart()

const nav = document.querySelector<HTMLElement>('#categories')!
const sub = document.querySelector<HTMLUListElement>('#submenu')!
const mainM = document.querySelector<HTMLUListElement>('#main-menu')!
const notice = document.querySelector<HTMLParagraphElement>('#notice')!
const about = document.querySelector<HTMLParagraphElement>('#about')!
const addr = document.querySelector<HTMLParagraphElement>('#address')!
const phone = document.querySelector<HTMLParagraphElement>('#phone')!
const fCats = document.querySelector<HTMLUListElement>('#footer-categories')!
const fHelp = document.querySelector<HTMLUListElement>('#footer-help')!
const sched = document.querySelector<HTMLUListElement>('#schedule')!
const p1 = document.querySelector<HTMLElement>('#posters')!
const p2 = document.querySelector<HTMLElement>('#posters-2')!
const container = document.querySelector<HTMLUListElement>('#best-carousel')!
const searchForm = document.querySelector<HTMLFormElement>('.search')
const searchInput = document.querySelector<HTMLInputElement>('.search input')

function renderState(state: LoadState, target: HTMLElement): void {
    if (state.status === 'loading') target.textContent = 'در حال بارگذاری اطلاعات...'
    else if (state.status === 'empty') target.innerHTML = '<li style="padding:1rem;text-align:center;">محصولی وجود ندارد.</li>'
    else if (state.status === 'error') target.innerHTML = `<li style="color:red;padding:1rem;text-align:center;">خطا: ${state.message}</li>`
    else if (state.status !== 'success') assertNever(state)
}

async function start(): Promise<void> {
    try {
        renderState({ status: 'loading' }, container)
        const API = import.meta.env.VITE_API_URL ?? '/api'
        const [cats, shop, home, prods, stock, offers] = await Promise.all([
            getJSON(`${API}/categories.json`) as Promise<Category[]>,
            getJSON(`${API}/shop.json`) as Promise<Shop>,
            getJSON(`${API}/home.json`) as Promise<Home>,
            getJSON(`${API}/products.json`) as Promise<Product[]>,
            getJSON(`${API}/stock.json`) as Promise<Stock>,
            getJSON(`${API}/offers.json`) as Promise<Offer[]>
        ])
        renderCategories(nav, cats); renderMenu(sub, mainM, shop, cats); renderPosters(p1, p2, home)
        renderFooter({ notice, about, address: addr, phone, cats: fCats, help: fHelp, schedule: sched }, shop, cats)
        const offerMap = new Map(offers.map(o => [o.productId, o]))
        const items = prods.filter(p => offerMap.has(p.id))
        const renderList = (list: Product[]) => {
            container.textContent = ''
            list.forEach(p => container.appendChild(createCard(p, offerMap.get(p.id), stock.items[p.id] ?? 0)))
        }
        if (items.length === 0) renderState({ status: 'empty' }, container)
        else { renderState({ status: 'success', products: items }, container); renderList(items) }
        searchForm?.addEventListener('submit', (e) => {
            e.preventDefault()
            const q = searchInput?.value.trim().toLocaleLowerCase('fa-IR') ?? ''
            renderList(q ? prods.filter(p => p.name.toLocaleLowerCase('fa-IR').includes(q)) : items)
        })
    } catch (err) {
        renderState({ status: 'error', message: err instanceof Error ? err.message : 'خطای سرور' }, container)
    }
}
container.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>('button')
    if (!btn || btn.disabled) return
    const id = Number(btn.dataset.id)
    if (!Number.isNaN(id)) {
        cart = addToCart(cart, id); saveCart(cart)
        notyf.success((btn.dataset.name ?? 'کالا') + ' به سبد اضافه شد')
        confetti({ particleCount: 60, spread: 70 })
    }
})
start()