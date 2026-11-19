import test from 'node:test'
import assert from 'node:assert/strict'
import { addToCart, removeFromCart, getCartCount } from '../src/cart/cart.ts'
import { carouselProducts, sortProducts } from '../src/catalog/products.ts'
import { checkoutErrors } from '../src/checkout/validation.ts'

const products = [
  { id: 1, categoryId: 2, name: 'milk', emoji: '🥛', price: 50, unit: 'L' },
  { id: 2, categoryId: 2, name: 'cheese', emoji: '🧀', price: 20, unit: 'kg' },
  { id: 3, categoryId: 3, name: 'bread', emoji: '🍞', price: 10, unit: 'piece' },
]
const catalog = {
  products,
  categories: [{ id: 2, slug: 'dairy' }, { id: 9, slug: 'empty' }],
  offers: [{ productId: 2 }],
  carousels: [{ id: 'offers', source: 'offers' }, { id: 'dairy', categoryId: 2 }],
}

test('cart operations preserve their inputs and count quantities', () => {
  const initial = Object.freeze([{ productId: 1, quantity: 2 }])
  const added = addToCart(initial, 1)
  assert.deepEqual(initial, [{ productId: 1, quantity: 2 }])
  assert.equal(getCartCount(added), 3)
  const second = addToCart(added, 2)
  assert.equal(getCartCount(second), 4)
  assert.deepEqual(removeFromCart(second, 1), [{ productId: 2, quantity: 1 }])
})

test('carousel selection distinguishes offers, categories, empty and unknown lists', () => {
  assert.deepEqual(carouselProducts(catalog, 'offers').map((p) => p.id), [2])
  assert.deepEqual(carouselProducts(catalog, 'dairy').map((p) => p.id), [1, 2])
  assert.deepEqual(carouselProducts(catalog, 'empty'), [])
  assert.equal(carouselProducts(catalog, 'nothing'), null)
})

test('price sorting is ascending without mutating the catalog order', () => {
  const frozen = Object.freeze([...products])
  assert.deepEqual(sortProducts(frozen, 'price').map((p) => p.id), [3, 2, 1])
  assert.deepEqual(frozen.map((p) => p.id), [1, 2, 3])
  assert.deepEqual(sortProducts(products, 'default'), products)
})

test('checkout validates blank fields and accepts Persian and Arabic mobile digits', () => {
  assert.equal(Object.values(checkoutErrors({ name: ' ', phone: '', address: '' })).filter(Boolean).length, 3)
  for (const phone of ['09123456789', '۰۹۱۲۳۴۵۶۷۸۹', '٠٩١٢٣٤٥٦٧٨٩']) {
    assert.deepEqual(checkoutErrors({ name: 'علی رضایی', phone, address: 'تهران خیابان آزادی پلاک دوازده' }), { name: '', phone: '', address: '' })
  }
  assert.ok(checkoutErrors({ name: 'Ali', phone: '0912abc6789', address: 'too short' }).phone)
})
