export type Product = {
    id: number, categoryId: number, name: string
    emoji: string, unit: string, price: number, tags: string[]
}

export type Stock = {
    updatedAt: string, items: Record<number, number>
}

export type Offer = {
    productId: number, percent: number, label: string
}

export type Category = {
    id: number, slug: string, name: string
    emoji: string, color: string
}

export type ShopLink = {
    label: string, href: string
}

export type Shop = {
    name: string, slogan: string, owner: string
    city: string, phone: string
    hours: { open: string, close: string }
    deliveryFee: number, freeDeliveryOver: number
    currency: string, notice: string, about: string, address: string
    schedule: { days: string, time: string }[]
    menu: ShopLink[], help: ShopLink[], copyright: string
}

export type ShopDetails = Readonly<Shop>

export type HomeBanner = {
    title: string, text: string, emoji: string, cta: ShopLink
}

export type HomePromo = {
    text: string, emoji: string, color: string, href: string
}

export const CAROUSEL_SOURCES = ["offers"] as const
export type CarouselSource = (typeof CAROUSEL_SOURCES)[number]

export type CarouselConfig = {
    id: string, title: string, emoji: string
    source?: CarouselSource
    categoryId?: number
}

export type Home = {
    hero: HomeBanner, side: HomeBanner
    promos: HomePromo[], carousels: CarouselConfig[]
}

export type LoadState =
    | { status: 'loading' }
    | { status: 'success', products: Product[] }
    | { status: 'empty' }
    | { status: 'error', message: string }
