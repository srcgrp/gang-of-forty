import type { Catalog } from '../shared/types'
import { carouselProducts, productsInCategory } from '../features/products/products'
import ProductCard from './ProductCard'

type ProductGridProps = {
    data: Catalog
    categoryId: number | null
}

export default function ProductGrid({ data, categoryId }: ProductGridProps) {
    const { products, stock, offers, categories, home: { carousels } } = data
    const offerConfig = carousels.find(config => config.source === 'offers')
    const defaultCategoryId = carousels.find(config => config.categoryId !== undefined)?.categoryId
    const selectedCategory = categories.find(category => category.id === (categoryId ?? defaultCategoryId))
    const sections = [
        ...(selectedCategory ? [{
            id: 'category-products',
            title: selectedCategory.name,
            emoji: selectedCategory.emoji,
            products: productsInCategory(products, selectedCategory.id)
        }] : []),
        ...(offerConfig ? [{
            id: 'offers',
            title: offerConfig.title,
            emoji: offerConfig.emoji,
            products: carouselProducts(data, offerConfig.id) ?? []
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
