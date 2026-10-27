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
    color: string
}
export type Offer = { productId: number, percent: number, label: string }
export type Stock = { updatedAt: string, items: Record<number, number> }
export type Link = { label: string, href: string }

export type Shop = {
    name: string
    slogan: string
    owner: string
    city: string
    phone: string
    hours: { open: string, close: string }
    deliveryFee: number
    freeDeliveryOver: number
    currency: string
    notice: string
    about: string
    address: string
    schedule: { days: string, time: string }[]
    menu: Link[]
    help: Link[]
    copyright: string
}

export type Banner = {
    title: string
    text: string
    emoji: string
    cta: Link
}

export const productFilters = ["all", "offers", "category"] as const
export type ProductFilter = (typeof productFilters)[number]
export type Carousel = {
    id: string
    title: string
    emoji: string
    source?: ProductFilter
    categoryId?: number
}
export type Home = {
    hero: Banner
    side: Banner
    promos: { text: string, emoji: string, color: string, href: string }[]
    carousels: Carousel[]
}
export type CartItem = Pick<Product, "id"> & { quantity: number }