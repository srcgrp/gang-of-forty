import { Link } from "@tanstack/react-router";
import type { Offer, Product } from "../types/product.ts";
import ProductGrid from "./ProductGrid.tsx";

const PREVIEW = 4;

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

  const preview = products.slice(0, PREVIEW);
  const total = products.length;

  return (
    <section id={id}>
      <h2>
        {title}{" "}
        <Link
          to="/plp/$carouselId"
          params={{ carouselId: id }}
          className="see-all"
        >
          مشاهده همه ({total.toLocaleString("fa-IR")})
        </Link>
      </h2>
      <div className="row-nav">
        <a href={"#" + id + "-start"}>اولین محصول</a>
        <a href={"#" + id + "-end"}>آخرین محصول</a>
      </div>
      <ProductGrid
        products={preview}
        stock={stock}
        offers={offers}
        onAdd={onAdd}
        rowId={id}
      />
    </section>
  );
}
