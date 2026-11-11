import type { Product, Category, Offer, Stock } from '../../scripts/types'
import { calculatePrice } from '../../scripts/logic/catalog/calculate-price.ts'
import ProductCard from './ProductCard.tsx'

export type SharedCardProps = {
  offers: Offer[]
  stock: Stock
  categories: Category[]
  onAdd: (id: number, button: HTMLButtonElement) => void
}

type ProductListProps = SharedCardProps & { products: Product[] }

export default function ProductList({ products, offers, stock, categories, onAdd }: ProductListProps) {
  return (
    <>
      {products.map((product) => {
        const offer = offers.find((o) => o.productId === product.id)
        return (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
            offer={offer}
            finalPrice={calculatePrice(product.price, offer)}
            quantity={stock.items[String(product.id)] ?? 0}
            categoryName={categories.find((c) => c.id === product.categoryId)?.name}
          />
        )
      })}
    </>
  )
}