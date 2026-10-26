export type MakeElement = <T extends keyof HTMLElementTagNameMap>(
    tag: T,
    className?: string,
    text?: string
) => HTMLElementTagNameMap[T];

export type AppendLinks = (
    container: Element,
    label: string,
    href?: string,
    className?: string
) => HTMLAnchorElement;

export type Cart = Record<string, number>

export interface Product {
    id: number
    name: string
    image: string
    price: number
    unit: string
    categoryName: string
    categoryId: number
    tags?: string[]
}

export interface Offer {
    productId: number
    percent: number
    label: string
}

export interface Stock {
    updatedAt: string
    items: Record<string, number>
}

export interface ProductCardOptions {
    offer?: Offer
    stock: Stock
    categoryName: string
}

export type OptionsForProduct = (product: Product) => ProductCardOptions;

export interface CarouselElements {
    products: HTMLUListElement
    viewport: HTMLDivElement
    previous: HTMLButtonElement
    next: HTMLButtonElement
}

export interface CarouselState {
    offset: number
    step: number
    maxOffset: number
}

export interface ShopMenuItem {
    label: string
    href: string
}

export interface ShopScheduleItem {
    days: string
    time: string
}

export interface Shop {
    name: string
    notice?: string | null
    slogan?: string | null
    about: string
    address: string
    phone: string
    copyright: string
    menu: ShopMenuItem[]
    schedule: ShopScheduleItem[]
    currency: string
}

export interface Category {
    id: number
    name: string
    slug: string
    image: string
    emoji: string | null
    color: string
}

export interface CallToAction {
    label: string
    href: string
}

export interface BannerData {
    title: string
    text: string
    name?: string
    emoji: string
    cta?: CallToAction
}

export interface Promo {
    text: string
    href: string
    name?: string
    emoji: string
}

export interface CarouselConfig {
    id: string
    title: string
    emoji?: string | null
    source?: string
    categoryId?: number | null
    category?: { id: number }
}

export interface Home {
    hero?: BannerData | null
    side?: BannerData | null
    promos?: Promo[]
    carousels?: CarouselConfig[]
}

export type ApiFile =
    | "products.json"
    | "stock.json"
    | "offers.json"
    | "categories.json"
    | "shop.json"
    | "home.json"

