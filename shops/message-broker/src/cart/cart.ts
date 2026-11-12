
import type { CartLine, Offer, Product } from '../types'

export type StoredCart = Record<string | number, number>

// افزودن محصول به سبد خرید
export function addToCart(cart: CartLine[], productId: number): CartLine[]
export function addToCart(cart: StoredCart, productId: number): StoredCart
export function addToCart(
    cart: CartLine[] | StoredCart,
    productId: number
): CartLine[] | StoredCart {
    if (Array.isArray(cart)) {
        const existing = cart.find(item => item.productId === productId)

        if (existing) {
            return cart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        }

        return [...cart, { productId, quantity: 1 }]
    }

    return {
        ...cart,
        [productId]: (cart[productId] ?? 0) + 1
    }
}

// حذف محصول از سبد خرید
export function removeFromCart(cart: CartLine[], productId: number): CartLine[]
export function removeFromCart(cart: StoredCart, productId: number): StoredCart
export function removeFromCart(
    cart: CartLine[] | StoredCart,
    productId: number
): CartLine[] | StoredCart {
    if (Array.isArray(cart)) {
        return cart.filter(item => item.productId !== productId)
    }

    const next = { ...cart }
    delete next[productId]
    return next
}

// محاسبه تعداد کل محصولات سبد خرید
export function cartCount(cart: CartLine[] | StoredCart): number {
    if (Array.isArray(cart)) {
        return cart.reduce((sum, item) => sum + item.quantity, 0)
    }

    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
}

// تبدیل سبد خرید قدیمی به آرایه
export function cartRows(cart: StoredCart): CartLine[] {
    return Object.entries(cart).map(([id, quantity]) => ({
        productId: Number(id),
        quantity: Number(quantity ?? 0)
    }))
}

// محاسبه قیمت بعد از تخفیف
export function finalPrice(price: number, offer?: Offer): number {
    return offer
        ? Math.round(price * (1 - offer.percent / 100))
        : price
}

// بررسی موجودی محصول
export function inStock(stockCount: number): boolean {
    return stockCount > 0
}

// نمایش قیمت
export function formatPrice(price: number): string {
    return price.toLocaleString('fa-IR') + ' تومان'
}

// محاسبه مبلغ کل سبد خرید
export function cartTotal(
    cart: CartLine[],
    products: Product[],
    offers: Offer[]
): number
export function cartTotal(
    cart: StoredCart,
    products: Product[],
    offers: Offer[]
): number
export function cartTotal(
    cart: CartLine[] | StoredCart,
    products: Product[],
    offers: Offer[]
): number {
    const productMap = new Map(products.map(product => [product.id, product]))
    const offerMap = new Map(offers.map(offer => [offer.productId, offer]))

    const rows = Array.isArray(cart) ? cart : cartRows(cart)

    return rows.reduce((sum, item) => {
        const product = productMap.get(item.productId)

        if (!product) return sum

        const offer = offerMap.get(product.id)
        return sum + finalPrice(product.price, offer) * item.quantity
    }, 0)
}

// فیلتر محصولات بر اساس جستجو
export function visibleProducts(products: Product[], query: string): Product[] {
    const q = query.trim().toLocaleLowerCase('fa-IR')

    return q
        ? products.filter(product =>
            product.name.toLocaleLowerCase('fa-IR').includes(q)
        )
        : products
}

// آماده‌سازی اطلاعات کارت محصول
export function toCard(
    product: Product,
    offer?: Offer,
    stock = 0
): { product: Product; finalPrice: number; inStock: boolean } {
    return {
        product,
        finalPrice: finalPrice(product.price, offer),
        inStock: inStock(stock)
    }
}
