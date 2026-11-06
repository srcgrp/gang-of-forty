import type { CartLine, LoadState } from '../types'
import { assertNever } from '../types'

export function renderStatus(state: LoadState, el: HTMLElement): void {
    if (state.status === 'loading') el.textContent = 'در حال بارگذاری...'
    else if (state.status === 'empty') el.innerHTML = '<li>محصولی یافت نشد.</li>'
    else if (state.status === 'error') el.innerHTML = `<li>خطا: ${state.message}</li>`
    else if (state.status !== 'success') assertNever(state)
}

export function renderProducts(container: HTMLElement, items: HTMLElement[]): void {
    container.textContent = ''
    items.forEach(el => container.appendChild(el))
}

export function renderCart(container: HTMLElement, lines: CartLine[]): void {
    container.textContent = `تعداد: ${lines.length}`
}

export function renderTotal(container: HTMLElement, total: number): void {
    container.textContent = `${total.toLocaleString('fa-IR')} تومان`
}

export function render(container: HTMLElement, html: string): void {
    container.innerHTML = html
}