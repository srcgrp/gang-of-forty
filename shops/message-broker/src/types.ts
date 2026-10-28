//قرارداد های API
export type Category = {
    id: number
    slug: string
    name: string
    emoji:string
    color: string
}
export type Link = {
    label: string
    href: string
}
export type Schedule = {
    days: string
    time: string
}

export type Shop = {
    notice: string
    about: string
    address: string
    phone: string
    menu: Link[]
    help: Link[]
    Schedule: Schedule[]
}

export type Banner = {
    emoji: string
    title: string
    text: string
    cta: Link
}
export type Promo = {
    href: string
    color: string
    emoji: string
    text: string
}
export type Home = {
    hero: Banner
    side: Banner
    promos: Promo[]
}
export type Product = {
    id: number
    categoryId: number
    name: string
    emoji: string
    unit: string
    price: number
}
export type Offer = {
    productId: number
    percent: number
}
export type Stock = {
    items: Record<number, number>
}
export type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>
export type CartItem = ProductSummary & {
    quantity: number
}
export type ReadonlyShop = Readonly<Shop>

export const SORTS = ['cheapest', 'expensive', 'popular'] as const
export type SortOption = typeof SORTS[number]

export type LoadState =
    | { status: 'loading' }
    | { status: 'success'; products: Product[] }
    | { status: 'empty' }
    | { status: 'error'; message: string }
    
export type CartLine = {
    productId: number
    quantity: number
}
export function assertNever(x: never): never {
    throw new Error(`حالت مدیریت‌نشده: ${JSON.stringify(x)}`)
}

 