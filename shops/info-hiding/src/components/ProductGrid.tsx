import type { Product, Offer, Stock } from '../types';
import { toCard } from '../catalog/pricing';
import ProductCard from './ProductCard';
type ProductGridProps = {
    id: string; title: string; products: Product[]; offers: Offer[];
    stock: Stock; onAdd: (id: number) => void;
};
export default function ProductGrid({ id, title, products, offers, stock, onAdd }: ProductGridProps) {
    return <section id={id} className="shop-section" aria-labelledby={id + '-title'}>
        <h2 id={id + '-title'}>{title}</h2>
        {products.length > 0 ? <>
            <div className="carousel-controls">
                <a href={'#' + id + '-1'}>رفتن به ابتدا</a>
                <a href={'#' + id + '-end'}>رفتن به انتها</a>
            </div>
            <section className="carousel" tabIndex={0} aria-label={title}>
                {products.map((product, index) => <ProductCard key={product.id}
                    product={toCard(product, offers, stock)} anchor={id + '-' + (index + 1)} onAdd={onAdd} />)}
                <span className="carousel-end" id={id + '-end'} aria-hidden="true" />
            </section>
        </> : <p className="load-status">کالایی برای نمایش وجود ندارد.</p>}
    </section>;
}
