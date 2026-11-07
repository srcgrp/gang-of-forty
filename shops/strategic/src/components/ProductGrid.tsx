import type { Product, Offer } from '../types';
import { toCard } from '../features/products/to-card';
import ProductCard from './ProductCard';

const offers: Offer[] = [
  {
    "productId": 102,
    "percent": 15,
    "label": "حراج فصل"
  },
  {
    "productId": 201,
    "percent": 15,
    "label": "پیشنهاد ویژه"
  },
  {
    "productId": 402,
    "percent": 20,
    "label": "تخفیف مهر"
  },
  {
    "productId": 501,
    "percent": 12,
    "label": "پیشنهاد ویژه"
  }
];
const stock: Record<string, number> = {
  "201": 15,
  "402": 2,
  "501": 11,
  "102": 0
};

export default function ProductGrid({ products, onAdd }: { products: Product[]; onAdd: (id: number) => void }) {
  return (
    <>
      {products.map(product => {
        const offer = offers.find(entry => entry.productId === product.id);
        return <ProductCard key={product.id} onAdd={onAdd} item={toCard(product, offer, stock[product.id] ?? 0)} />;
      })}
    </>
  );
}