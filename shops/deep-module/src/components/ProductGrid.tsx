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
  // اصلاح حالت خالی (Empty State) مطابق با کلاس‌های CSS
  if (products.length === 0) {
    return (
      <div className="products-empty">
        <span className="products-empty__icon" aria-hidden="true">
          🔍
        </span>
        <p className="products-empty__text">محصولی یافت نشد</p>
        <p className="products-empty__hint">
          لطفاً فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید.
        </p>
      </div>
    );
  }

  const cartMap = new Map(cart.map((i) => [i.id, i.quantity]));
  const offerMap = new Map(offers.map((o) => [o.productId, o.percent]));

  // تغییر ul/li به div تا CSS Grid و افکت Bento به درستی کار کند
  return (
    <div className="products-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          stock={stock?.items[p.id]}
          discountPercent={offerMap.get(p.id)}
          cartQuantity={cartMap.get(p.id) ?? 0}
          onAdd={() => onAdd(p)}
        />
      ))}
    </div>
  );
}
