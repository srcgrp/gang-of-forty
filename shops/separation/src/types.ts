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
  color?: string
}

export type Offer = {
  productId: number
  percent: number
  label: string
}

export type Shop = {
  name: string
  slogan: string
  owner: string
  city: string
  phone: string
  hours: {
    open: string
    close: string
  }
  deliveryFee: number
  freeDeliveryOver: number
  currency: string
}

export type StockMap = Record<string, number>

export type Stock = {
  updatedAt: string
  items: StockMap
}

export type CartLine = {
  productId: number
  qty: number
}

export type CartItem = CartLine & {
  product: Pick<Product, 'id' | 'name' | 'price' | 'emoji' | 'unit'>
}

export const SORTS = ['پیش‌فرض', 'ارزان‌ترین', 'گران‌ترین'] as const

export type Sort = (typeof SORTS)[number]

export type LoadState =
  | { status: 'loading' }
  | { status: 'success'; products: Product[] }
  | { status: 'empty' }
  | { status: 'error'; message: string }
