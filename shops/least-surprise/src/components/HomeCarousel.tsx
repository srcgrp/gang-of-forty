import { Link } from '@tanstack/react-router'
import type { ProductWithDetails } from '../types'
import { carouselProducts } from '../catalog/carouselProducts'
import type { Carousel } from '../hooks/useHomeConfig'
import ProductGrid from './ProductGrid'

type Props = {
  carousel: Carousel
  products: ProductWithDetails[]
  query: string
  onAdd: (id: string) => void
}

export default function HomeCarousel({
  carousel,
  products,
  query,
  onAdd,
}: Props) {
  const allProducts = carouselProducts(products, carousel)

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <section className="home-carousel">
      <div className="carousel-header">
        <h2>{carousel.title}</h2>
        <Link
       to="/plp/$carouselId"
       params={{ carouselId: carousel.id }}
       search={{ sort: 'default' }}
>
          مشاهده همه ({allProducts.length})
        </Link>
      </div>

      <ProductGrid
        products={filteredProducts.slice(0, 4)}
        onAdd={onAdd}
      />
    </section>
  )
}