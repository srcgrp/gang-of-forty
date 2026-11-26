import type { CardProduct } from "../types.ts";
import ProductCard from "./ProductCard.tsx";

type ProductGridProps = {
  products: CardProduct[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="carousel">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </ul>
  );
}