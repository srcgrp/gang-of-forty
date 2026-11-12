
import type { LoadState } from '../types'
import { assertNever } from '../types'

export function renderStatus(state: LoadState, el: HTMLElement): void {
    switch (state.status) {
        case 'loading': {
            el.textContent = 'در حال بارگذاری...'
            break
        }
        case 'empty': {
            const li = document.createElement('li')
            li.textContent = 'محصولی یافت نشد.'
            el.replaceChildren(li)
            break
        }
        case 'error': {
            const li = document.createElement('li')
            li.textContent = `خطا: ${state.message}`
            el.replaceChildren(li)
            break
        }
        case 'success': {
            el.replaceChildren()
            break
        }
        default:
            assertNever(state)
    }
}

export function renderProducts(
    container: HTMLElement,
    items: HTMLElement[]
): void {
    container.replaceChildren(...items)
}
