import type { CarouselConfig, Category, Offer, Product, Stock } from '../shared/types'
import ProductCard from './ProductCard'

type ProductGridProps = {
    products: Product[]
    stock: Stock
    offers: Offer[]
    carousels: CarouselConfig[]
    categories: Category[]
    categoryId: number | null
    onAdd: (id: number) => void
}

export default function ProductGrid({ products, stock, offers, carousels, categories, categoryId, onAdd }: ProductGridProps) {
    const offerConfig = carousels.find(config => config.source === 'offers')
    const defaultCategoryId = carousels.find(config => config.categoryId !== undefined)?.categoryId
    const selectedCategory = categories.find(category => category.id === (categoryId ?? defaultCategoryId))
    const sections = [
        ...(selectedCategory ? [{
            id: 'category-products',
            title: selectedCategory.name,
            emoji: selectedCategory.emoji,
            products: products.filter(product => product.categoryId === selectedCategory.id)
        }] : []),
        ...(offerConfig ? [{
            id: 'offers',
            title: offerConfig.title,
            emoji: offerConfig.emoji,
            products: products.filter(product => offers.some(offer => offer.productId === product.id))
        }] : [])
    ]

    return (
        <div id="home-carousels">
            {sections.map(section => (
                <section className="product-carousel" id={section.id} key={section.id}>
                    <header className="section-heading"><h2>{section.emoji} {section.title}</h2></header>
                    {section.products.length > 0 && (
                        <nav className="carousel-controls" aria-label={`کنترل‌های ${section.title}`}>
                            <a href={`#${section.id}-first`}>اولین محصول →</a>
                            <a href={`#${section.id}-${section.products.length === 1 ? 'first' : 'last'}`}>آخرین محصول ←</a>
                        </nav>
                    )}
                    <div className="product-track" aria-label={`محصولات ${section.title}`}>
                        {section.products.map((product, index) => {
                            const offer = offers.find(item => item.productId === product.id)
                            const stockCount = stock.items[product.id] ?? 0
                            const cardId = index === 0
                                ? `${section.id}-first`
                                : index === section.products.length - 1
                                    ? `${section.id}-last`
                                    : `product-${section.id}-${product.id}`

                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    cardId={cardId}
                                    onAdd={onAdd}
                                    {...(offer && { offerPercent: offer.percent })}
                                    stock={stockCount}
                                />
                            )
                        })}
                    </div>
                </section>
            ))}
        </div>
    )
}
