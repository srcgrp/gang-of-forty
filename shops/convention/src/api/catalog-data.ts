import type { Carousel, Category, Offer, Catalog } from '../types'
import { getJSON } from './get-json'
import { getProducts } from './products'

function isCategory(value: unknown): value is Category {
  return typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'number' &&
    'slug' in value && typeof value.slug === 'string' &&
    'name' in value && typeof value.name === 'string' &&
    'emoji' in value && typeof value.emoji === 'string' &&
    'color' in value && typeof value.color === 'string'
}

function isOffer(value: unknown): value is Offer {
  return typeof value === 'object' && value !== null &&
    'productId' in value && typeof value.productId === 'number' &&
    'percent' in value && typeof value.percent === 'number' &&
    'label' in value && typeof value.label === 'string'
}

function isCarousel(value: unknown): value is Carousel {
  return typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'string' &&
    'title' in value && typeof value.title === 'string' &&
    'emoji' in value && typeof value.emoji === 'string' &&
    (('source' in value && value.source === 'offers') ||
     ('categoryId' in value && typeof value.categoryId === 'number'))
}

export async function getCatalog(): Promise<Catalog> {
  const [products, categories, offers, home] = await Promise.all([
    getProducts(), getJSON('categories.json'), getJSON('offers.json'), getJSON('home.json'),
  ])
  if (!Array.isArray(categories) || !categories.every(isCategory)) throw new Error('Invalid categories data')
  if (!Array.isArray(offers) || !offers.every(isOffer)) throw new Error('Invalid offers data')
  if (typeof home !== 'object' || home === null || !('carousels' in home) ||
      !Array.isArray(home.carousels) || !home.carousels.every(isCarousel)) throw new Error('Invalid home data')
  return { products, categories, offers, carousels: home.carousels }
}
