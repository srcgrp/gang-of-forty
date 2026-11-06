import type { Offer, Product, Stock } from './shared/types.ts'

export const SAMPLE_PRODUCTS: Product[] = [
  { id: 102, categoryId: 1, name: 'پرتقال', emoji: '🍊', unit: 'هر کیلو', price: 50000, tags: [] },
  { id: 103, categoryId: 1, name: 'موز', emoji: '🍌', unit: 'هر کیلو', price: 60000, tags: [] },
  { id: 201, categoryId: 2, name: 'شیر', emoji: '🥛', unit: 'یک لیتر', price: 35000, tags: [] },
  { id: 202, categoryId: 2, name: 'پنیر سفید', emoji: '🧀', unit: '۴۰۰ گرم', price: 80000, tags: [] },
  { id: 203, categoryId: 2, name: 'ماست', emoji: '🥣', unit: '۹۰۰ گرم', price: 40000, tags: [] },
  { id: 402, categoryId: 4, name: 'عسل', emoji: '🍯', unit: '۵۰۰ گرم', price: 120000, tags: [] },
]

export const SAMPLE_STOCK: Stock = {
  updatedAt: '2026-11-06',
  items: { '102': 10, '103': 5, '201': 0, '202': 8, '203': 6, '402': 3 },
}

export const SAMPLE_OFFERS: Offer[] = [
  { productId: 102, percent: 10, label: 'تخفیف ویژه' },
]