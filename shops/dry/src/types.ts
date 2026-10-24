export type Product = {
    id: number
    categoryId: number
    name: string
    emoji: string
    unit: string
    price: number
    tags: string[]
}

export type Category = {
    id: number
    slug: string
    name: string
    emoji: string
}

export type Offer = {
    productId: number
    percent: number
    label: string
}

export type Stock = {
    updatedAt: string
    items: Record<string, number>
}

export type Shop = {
    name: string
    slogan: string
    owner: string
    city: string
    phone: string
    hours: { open: string; close: string }
    deliveryFee: number
    freeDeliveryOver: number
    currency: string
}

export type CartLine = Pick<Product, 'id'> & { qty: number }

export type SearchItem = {
    product: Product
    name: string
    tags: string
}

export const SORTS = ['default', 'price-asc', 'price-desc'] as const
export type Sort = (typeof SORTS)[number]