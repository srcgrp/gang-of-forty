import { Notyf } from 'notyf'; import 'notyf/notyf.min.css'; import confetti from 'canvas-confetti'
import type { Home, Offer, Product, Shop, Stock } from './types'
import { getJSON, loadCategories, loadOffers, loadStock } from './api/client'
import { loadCart, saveCart } from './storage/storage'
import { addToCart } from './cart/cart'
import { createCard } from './ui/cards'
import { renderCategories, renderFooter, renderMenu, renderPosters, renderStatus, renderProducts } from './ui/layout'

const notyf = new Notyf(); let cart = loadCart()
const $ = <T extends HTMLElement>(s: string) => document.querySelector<T>(s)!
const nav = $('#categories'), sub = $<HTMLUListElement>('#submenu'), mainM = $<HTMLUListElement>('#main-menu')
const notice = $<HTMLParagraphElement>('#notice'), about = $<HTMLParagraphElement>('#about'), addr = $<HTMLParagraphElement>('#address')
const phone = $<HTMLParagraphElement>('#phone'), fCats = $<HTMLUListElement>('#footer-categories'), fHelp = $<HTMLUListElement>('#footer-help')
const sched = $<HTMLUListElement>('#schedule'), p1 = $('#posters'), p2 = $('#posters-2'), container = $<HTMLUListElement>('#best-carousel')
const searchForm = document.querySelector<HTMLFormElement>('.search'), searchInput = document.querySelector<HTMLInputElement>('.search input')

async function start(): Promise<void> {
    try {
        renderStatus({ status: 'loading' }, container)
        const API = import.meta.env.VITE_API_URL ?? '/api'
        const [cats, shop, home, prods, stock, offers] = await Promise.all([
            loadCategories(API), getJSON(`${API}/shop.json`) as Promise<Shop>,
            getJSON(`${API}/home.json`) as Promise<Home>, getJSON(`${API}/products.json`) as Promise<Product[]>,
            loadStock(API), loadOffers(API)
        ])
        renderCategories(nav, cats); renderMenu(sub, mainM, shop, cats); renderPosters(p1, p2, home)
        renderFooter({ notice, about, address: addr, phone, cats: fCats, help: fHelp, schedule: sched }, shop, cats)
        const offerMap = new Map(offers.map(o => [o.productId, o])), items = prods.filter(p => offerMap.has(p.id))
        const updateList = (list: Product[]) => renderProducts(container, list.map(p => createCard(p, offerMap.get(p.id), stock.items[p.id] ?? 0)))
        if (items.length === 0) renderStatus({ status: 'empty' }, container)
        else { renderStatus({ status: 'success', products: items }, container); updateList(items) }
        searchForm?.addEventListener('submit', (e) => {
            e.preventDefault()
            const q = searchInput?.value.trim().toLocaleLowerCase('fa-IR') ?? ''
            updateList(q ? prods.filter(p => p.name.toLocaleLowerCase('fa-IR').includes(q)) : items)
        })
    } catch (err) {
        renderStatus({ status: 'error', message: err instanceof Error ? err.message : 'خطای سرور' }, container)
    }
}

container.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>('button')
    if (!btn || btn.disabled) return
    const id = Number(btn.dataset.id)
    if (!Number.isNaN(id)) {
        cart = addToCart(cart, id); saveCart(cart)
        notyf.success((btn.dataset.name ?? 'کالا') + ' به سبد اضافه شد'); confetti({ particleCount: 60, spread: 70 })
    }
})
start()