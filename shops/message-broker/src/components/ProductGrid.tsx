import ProductCard from './ProductCard'

export type Product = {
  id: string
  name: string
  emoji: string
  oldPrice: number
  price: number
  discount: number
}

type ProductGridProps = {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="carousel" aria-label="کاروسل محصولات">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          emoji={product.emoji}
          oldPrice={product.oldPrice}
          price={product.price}
          discount={product.discount}
        />
      ))}
    </ul>
  )
}
