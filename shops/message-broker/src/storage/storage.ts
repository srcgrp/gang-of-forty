export type StoredCart = Record<number, number>

const STORAGE_KEY = 'cart_v1'

export function loadCart(): StoredCart {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return {}
        const data: unknown = JSON.parse(raw)
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            return {}
        }
        const cart: StoredCart = {}
        for (const [k, v] of Object.entries(data)) {
            const id = Number(k)
            if (!Number.isNaN(id) && typeof v === 'number') {
                cart[id] = v
            }
        }
        return cart
    } catch {
        return {}
    }
}

export function saveCart(cart: StoredCart): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch (e) {
        console.warn('خطا در ذخیره سبد خرید:', e)
    }
}

