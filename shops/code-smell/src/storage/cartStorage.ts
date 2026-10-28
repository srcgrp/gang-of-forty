import type { Cart } from "../types"

const cartKey = "code-smell-shopping-cart"

function isCart(value: unknown): value is Cart {
    if (
        typeof value !== "object" ||
        value === null ||
        Array.isArray(value)
    ) {
        return false
    }

    return Object.values(value).every(function (quantity: unknown) {
        return typeof quantity === "number"
    })
}

export function loadCart(): Cart {
    try {
        const value: unknown = JSON.parse(
            localStorage.getItem(cartKey) || "{}"
        )

        if (isCart(value)) {
            return value
        } else {
            return {}
        }
    } catch {
        return {}
    }
}

export function saveCart(cart: Cart): void {
    localStorage.setItem(cartKey, JSON.stringify(cart))
}