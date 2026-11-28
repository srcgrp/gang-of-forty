import type { ProductWithDetails } from '../types'
import { isProduct, isStockRecord, isOfferItem } from './validators'

export async function getJSON(url: string): Promise<unknown> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`)
  }

  return response.json()
}

export async function loadShopData(): Promise<ProductWithDetails[]> {
  const [rawProducts, rawStock, rawOffers] = await Promise.all([
    getJSON('/products.json'),
    getJSON('/stock.json'),
    getJSON('/offers.json').catch(() => []),
  ])

  if (!Array.isArray(rawProducts)) {
    throw new Error('Invalid product data')
  }

  const products = rawProducts.filter(isProduct)
  const stock = Array.isArray(rawStock) ? rawStock : []
  const offers = Array.isArray(rawOffers) ? rawOffers : []

  const stockMap = new Map<string, number>()
  stock.filter(isStockRecord).forEach((item) => {
    stockMap.set(String(item.id), item.stock)
  })

  const offerMap = new Map<string, number>()
  offers.filter(isOfferItem).forEach((item) => {
    offerMap.set(String(item.id), item.discount)
  })

  return products.map((product) => {
    const id = String(product.id)
    const discountPercent = offerMap.get(id) ?? 0

    return {
      ...product,
      id,
      stock: stockMap.get(id) ?? 0,
      discountPercent,
      finalPrice: Math.round(
        product.price * (1 - discountPercent / 100),
      ),
    }
  })
}