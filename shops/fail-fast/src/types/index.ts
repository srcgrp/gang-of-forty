/**
 * Core domain types.
 */

export interface Product {
  id: number
  name: string
  categoryId: number
  price: number
  unit: string
  emoji: string
  tags?: string[]
}

export interface Offer {
  productId: number
  percent: number
  label?: string
}

export interface Stock {
  updatedAt?: string
  items: Record<string, number>
}

export interface Category {
  id: number
  slug: string
  name: string
  emoji: string
  color: string
}

export interface CartLine {
  productId: number
  quantity: number
}

export type ProductPrice = Pick<Product, "id" | "price">
