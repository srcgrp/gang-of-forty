import type { Offer, Product } from "../types/product.ts";
import ProductGrid from "./ProductGrid.tsx";

type CarouselSectionProps = {
  id: string;
  title: string;
  products: Product[];
  stock: Record<string, number>;
  offers: Offer[];
  onAdd: (id: number) => void;
};

export default function CarouselSection({
  id,
  title,
  products,
  stock,
  offers,
  onAdd,
}: CarouselSectionProps) {
  if (products.length === 0) return null;
  return (
    <section id={id}>
      <h2>{title}</h2>
      <div className="row-nav">
        <a href={"#" + id + "-start"}>اولین محصول</a>
        <a href={"#" + id + "-end"}>آخرین محصول</a>
      </div>
      <ProductGrid
        products={products}
        stock={stock}
        offers={offers}
        onAdd={onAdd}
        rowId={id}
      />
    </section>
  );
}
