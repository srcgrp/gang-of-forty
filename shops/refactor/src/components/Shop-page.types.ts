import type { AppData } from '../types'

export type ShopPageProps = {
  products: AppData['products']
  categories: AppData['categories']
  home: AppData['home']
  shop: AppData['shop']
  categoryId: number | null
  onPick: (id: number | null) => void
  query: string
  onQuery: (value: string) => void
  showAll: boolean
  onToggleAll: () => void
  isCartOpen: boolean
  onOpenCart: () => void
  onCloseCart: () => void
  showCountdown: boolean
  onCloseCountdown: () => void
  onShowCountdown: () => void
}
