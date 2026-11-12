import type { Offer, Product } from "../types/product.ts";
import ProductCard from "./ProductCard.tsx";

type ProductGridProps = {
  products: Product[];
  stock: Record<string, number>;
  offers: Offer[];
  onAdd: (id: number) => void;
  rowId?: string;
};

export default function ProductGrid({
  products,
  stock,
  offers,
  onAdd,
  rowId,
}: ProductGridProps) {
  return (
    <ul className="row">
      {products.map(function (product, index) {
        const offer = offers.find(function (item) {
          return item.productId === product.id;
        });
        let itemId: string | undefined;
        if (rowId && index === 0) itemId = rowId + "-start";
        if (rowId && index === products.length - 1) itemId = rowId + "-end";
        return (
          <li key={product.id} id={itemId}>
            <ProductCard
              product={product}
              qty={stock[product.id] ?? 0}
              percent={offer ? offer.percent : 0}
              onAdd={onAdd}
            />
          </li>
        );
      })}
    </ul>
  );
}
