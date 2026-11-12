import type { EnrichedProduct } from '../types';

interface ProductCardProps {
  product: EnrichedProduct;
  onAdd: (id: number) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const inStock = product.stock > 0;

  return (
    <article className={`product-card ${!inStock ? 'out-of-stock' : ''}`}>
      {product.offer && <span className="discount">{product.offer.percent}٪</span>}
      <div className="product-img">
        <span aria-hidden="true">{product.emoji}</span>
      </div>
      <h3>{product.name}</h3>
      <p className="product-meta">{product.unit}</p>
      <div className="product-foot">
        <span className="price">{new Intl.NumberFormat('fa-IR').format(product.price)} تومان</span>
        <button 
          className="add-btn" 
          disabled={!inStock} 
          onClick={() => onAdd(product.id)}
        >
          {inStock ? '+' : '✕'}
        </button>
      </div>
      {!inStock && <span className="out-badge">ناموجود</span>}
    </article>
  );
}
