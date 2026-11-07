import type { CartLine, Offer, Product, StockData } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  cart?: CartLine[];
  offers?: Offer[];
  stock?: StockData;
  onAdd: (p: Product) => void;
}

export function ProductGrid({
  products,
  cart = [],
  offers = [],
  stock,
  onAdd,
}: ProductGridProps) {
  if (products.length === 0)
    return <div className="state-empty">محصولی یافت نشد</div>;

  const cartMap = new Map(cart.map((i) => [i.id, i.quantity]));
  const offerMap = new Map(offers.map((o) => [o.productId, o.percent]));

  return (
    <ul className="products-grid">
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard
            product={p}
            stock={stock?.items[p.id]}
            discountPercent={offerMap.get(p.id)}
            cartQuantity={cartMap.get(p.id) ?? 0}
            onAdd={() => onAdd(p)}
          />
        </li>
      ))}
    </ul>
  );
}
