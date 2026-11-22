import type { AppData, Offer, Product, ProductView, Stock } from '../types'
import { API_FILES } from '../types'
import { getJSON } from './client'
import { isCategory, isOffer, isProduct, isStock, readList } from './guards'
import { isHome, isShop } from './page-guards'

const toView = (product: Product, offers: Offer[], stock: Stock): ProductView => {
  const offer = offers.find((item) => item.productId === product.id)
  const percent = offer ? offer.percent : 0
  return {
    ...product,
    originalPrice: product.price,
    percent,
    price: Math.round(product.price * (1 - percent / 100)),
    stock: stock.items[String(product.id)] ?? 0,
  }
}

export const loadShop = async (): Promise<AppData> => {
  const files = await Promise.all(API_FILES.map(getJSON))
  const [rawProducts, rawStock, rawOffers, rawCategories, home, shop] = files
  if (!isStock(rawStock)) {
    throw new Error('ساختار موجودی کالا معتبر نیست.')
  }
  if (!isHome(home)) {
    throw new Error('ساختار تنظیمات صفحهٔ اصلی معتبر نیست.')
  }
  if (!isShop(shop)) {
    throw new Error('ساختار اطلاعات فروشگاه معتبر نیست.')
  }
  const products = readList(rawProducts, isProduct, 'products.json')
  const offers = readList(rawOffers, isOffer, 'offers.json')
  return {
    products: products.map((product) => toView(product, offers, rawStock)),
    categories: readList(rawCategories, isCategory, 'categories.json'),
    home,
    shop,
  }
}
