import type {Offer, Product} from '../types';
import ProductCard from './ProductCard';

type ProductGridProps = {
    products: Product[];
    onAdd: (id: number) => void;
    stockById?: Record<number, number>;
    offerByProductId?: Map<number, Offer>;
};

export default function ProductGrid({
    products,
    onAdd,
    stockById,
    offerByProductId = new Map(),
}: ProductGridProps) {
    return (
        <div className='carousel-items'>
            {products.map((product) => {
                const inStock =
                    stockById === undefined
                        ? true
                        : (stockById[product.id] ?? 0) > 0;

                const offer = offerByProductId.get(product.id);

                return (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={onAdd}
                        inStock={inStock}
                        offer={offer}
                    />
                );
            })}
        </div>
    );
}
