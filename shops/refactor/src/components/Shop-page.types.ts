import type { AppData, CartLine } from '../types'

export type ShopPageProps = {
  products: AppData['products']
  categories: AppData['categories']
  home: AppData['home']
  shop: AppData['shop']
  lines: CartLine[]
  total: number
  count: number
  categoryId: number | null
  onPick: (id: number | null) => void
  query: string
  onQuery: (value: string) => void
  showAll: boolean
  onToggleAll: () => void
  onAdd: (id: number) => void
  onRemove: (id: number) => void
  onQuantity: (id: number, delta: number) => void
  isCartOpen: boolean
  onOpenCart: () => void
  onCloseCart: () => void
  showCountdown: boolean
  onCloseCountdown: () => void
  onShowCountdown: () => void
}
