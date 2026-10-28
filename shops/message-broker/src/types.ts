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

// من اینجا از 3 تا Utility Type استفاده کردم 
//که به ترتیب :

// Utility Type 1 : Record<K, T>
//مقادیری از جنس K , T می سازد 
// و هر دوتاشون از نوع عدد هستند number 
// برای مدل سازی انبار هست
export type Stock = {
    items: Record<number, number>
}

// Utility Type 2: Pick<T, Keys>
// در اینجا زیرمجموعه ای از فیلدهای تایپ دیگه جدا میشه تا از تکرار جلوگیری بشه
// کارش استخراج فیلد های ضروری کالا برای سبد خرید هست
export type ProductSummary = pick<Product, 'id' | 'name' | 'price'>
export type CartItem = ProductSummary & {
    quantity: number
}

// Utility Type 3:Readonly<T>
//همه خصوصیات یک شیء رو فقط خواندنی می کند تا مانع تغییر ناخواسته داده شود.
//کاربردش برای قفل کردن اطلاعات پایه و پیکر بندی فروشگاه استفاده می شود
export type ReadonlyShop = Readonly<Shop>

//یک جایگزین برای enum با استفاده از  as const 
export const SORTS = ['cheapest', 'expensive', 'popular'] as const
export type SortOption = typeof SORTS[number]

//وضعیت بارگذاری
export type LoadState<T> =
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'empty' }
    | { status: 'error'; message: string }