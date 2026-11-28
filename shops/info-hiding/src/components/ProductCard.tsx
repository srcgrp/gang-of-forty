import { useCartStore } from '../hooks/useCartStore';
import type { ProductCardData } from '../types';
type ProductCardProps = { product: ProductCardData; anchor: string };
export default function ProductCard({ product, anchor }: ProductCardProps) {
    const add = useCartStore(state => state.add);
    return <article className="product" id={anchor}>
        {product.discountText && <span className="discount">{product.discountText}</span>}
        <span className="product-icon" role="img" aria-label={product.name}>{product.emoji}</span>
        <h3>{product.name}</h3><p>{product.unit}</p>
        <div className="price">
            {product.oldPriceText && <del>{product.oldPriceText}</del>}
            <strong>{product.priceText}</strong>
        </div>
        <button type="button" disabled={!product.available} onClick={() => add(product.id)}
            aria-label={'افزودن ' + product.name + ' به سبد خرید'}>
            {product.available ? 'افزودن +' : 'ناموجود'}
        </button>
    </article>;
}
