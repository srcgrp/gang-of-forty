const CART_KEY = "tdd:w2:cart-count"

export function readCartCount(): number {
    try {
        const saved = Number(localStorage.getItem(CART_KEY))
        return Number.isSafeInteger(saved) && saved >= 0 ? saved : 0
    } catch {
        return 0
    }
}

export function saveCartCount(count: number): boolean {
    try {
        localStorage.setItem(CART_KEY, String(count))
        return true
    } catch {
        return false
    }
}

export function clearSavedCart(): boolean {
    try {
        localStorage.removeItem(CART_KEY)
        return true
    } catch {
        return false
    }
}

export function isCartStorageEvent(event: StorageEvent): boolean {
    return event.key === CART_KEY || event.key === null
}

export function watchCartCount(onChange: (count: number) => void): void {
    window.addEventListener("storage", event => {
        if (isCartStorageEvent(event)) onChange(readCartCount())
    })
}
