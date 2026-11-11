import type { CardProduct } from "../types.ts";
import ProductCard from "./ProductCard.tsx";

type ProductGridProps = {
  products: CardProduct[];
  onAdd: (id: number) => void;
};

export default function ProductGrid({ products, onAdd }: ProductGridProps) {
  return (
    <ul>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </ul>
  );
}
