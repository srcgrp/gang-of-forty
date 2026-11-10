import type {Product} from '../types';
import ProductCard from './ProductCard';

type ProductGridProps = {
    products: Product[];
};

export default function ProductGrid({products}: ProductGridProps) {
    return (
        <div className='carousel-items'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
