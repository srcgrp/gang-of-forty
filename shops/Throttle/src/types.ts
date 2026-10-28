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

export type Offer = { productId: number; percent: number; label: string }
export type Stock = { items: Record<string, number> }
export type Shop = Readonly<{ name: string; slogan: string; notice: string }>

export type Catalog = Readonly<{
  products: Product[]
  categories: Category[]
  stock: Stock
  offers: Offer[]
  shop: Shop | null
}>

export type CartLine = Pick<Product, 'id'> & { qty: number }
export type CartSummary = Readonly<{ count: number; total: number }>

export const SORTS = ['default', 'price-asc', 'price-desc'] as const
export type Sort = (typeof SORTS)[number]
export const isSort = (x: unknown): x is Sort => SORTS.some((s) => s === x)

export type Filters = { category: string | null; query: string; sort: Sort }

export type LoadState =
  | { status: 'loading' }
  | { status: 'success'; products: Product[] }
  | { status: 'empty' }
  | { status: 'error'; message: string }

export type CardData = Readonly<{
  product: Product
  offer: Offer | undefined
  price: number
  stock: number
}>

export type ViewModel = Readonly<{
  state: LoadState
  cards: CardData[]
  categories: Category[]
  filters: Filters
  summary: CartSummary
  shop: Shop | null
}>
